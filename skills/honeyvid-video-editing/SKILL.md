---
name: honeyvid-video-editing
description: "Edit HoneyVid videos in the HoneyVid editor while the user watches live: cut, combine, trim, reorder, stack, or mute clips the user made. Use for 'cut this video', 'combine my clips', 'trim to the best part', 'reorder', or 'mute the sound'."
---

# HoneyVid video editing

Use connected MCP tools first. The editor works on finished HoneyVid results the user owns: videos, images, characters, and files already stored in a project. Editing never spends credits. To make new footage, use **honeyvid-video-generation** or **honeyvid-viral-template** first, then edit the finished jobs.

## Flow

1. **Create or pick a project.** `honeyvid_editor_create {name, video_ids:["<job-id>", ...]}` creates the project and appends each finished video in order. Use `source_keys` for other sources (see [ops](references/ops.md#source-keys)). CLI: `npx honeyvid edit create`. To continue an earlier edit, find it with `honeyvid_editor_list`.
2. **Give the user `watch_url` first**, before any edits. Every editor tool returns it (`https://honeyvid.ai/editor/<id>`). The user opens it, signs in, and watches each change land live. They can also edit there at the same time.
3. **Read before every batch.** Call `honeyvid_editor_get {project_id}`. It returns the compact timeline, the current `version`, and a text summary of clip ids, tracks, and total seconds. Never guess a clip or track id.
4. **Apply one batch.** Call `honeyvid_editor_apply {project_id, ops, base_version, note}` with the `version` you just read and a short `note` (up to 140 characters, such as "Trim intro to the best 5 s"). The user sees the note next to the change.
5. **Report progress.** For longer work, send `honeyvid_editor_notify {project_id, message, tone}` (message up to 140 characters; tone `info`, `success`, or `error`), for example "Cutting the dead air, then adding music".
6. **Repeat** steps 3–4 for each next batch. The response carries the new `version`, `summaries` of what changed, and `changed.clipIds` / `changed.trackIds`. Ids of clips created by a split or add appear only after the call, so read again before you refer to them.
7. **Hand off the export.** The user exports the MP4 from the editor page. There is no export tool; do not claim a rendered file. Give the user the `watch_url` again with a one-line summary of the edit.

### Tool and command pairs

| MCP tool | Purpose |
| --- | --- |
| `honeyvid_editor_list` | List the user's edit projects. |
| `honeyvid_editor_create` | New project from `name`, optional `video_ids` / `source_keys`. CLI: `npx honeyvid edit create`. |
| `honeyvid_editor_get` | Timeline, `version`, and clip/track summary. Read before every batch. |
| `honeyvid_editor_apply` | Apply 1–50 ops atomically with `base_version` and `note`. |
| `honeyvid_editor_notify` | Show a short progress message in the open editor. |

Reading needs the `videos:read` scope; creating, applying, and notifying need `videos:create`. If the CLI lacks an `edit` subcommand you need, check `npx honeyvid edit --help`; otherwise use the MCP tools.

## Plan the edit

- **Time is timeline seconds.** `at` places a clip on the timeline; `start` and `end` are in/out points inside the clip's source. The project's total length follows the last clip.
- **Tracks stack.** The first video track is on top: where clips overlap in time, the top track covers the ones below. Audio tracks mix together.
- **Clips do not ripple.** Deleting or trimming leaves a gap; `move` later clips to close it.
- **A video with sound places two clips:** the picture on a video track and its audio on an audio track, as in the browser. Edit both when cutting, or the sound keeps playing.
- **Plan the whole batch from one read.** Ops in a call run in order against the result of the ops before them. Put dependent changes (such as deleting a clip a split creates) in the next batch after a fresh read.
- Ask the user which part is "best" when it depends on taste. If you choose, say what you chose and why. Claim only what you inspected.

## Recipes

Replace the placeholders with ids and versions from `honeyvid_editor_get`. Op fields are in [ops](references/ops.md).

**Trim to the best 5 s** (source seconds 3–8 of clip 12, then start it at 0):

```json
[{"type":"trim","clip":12,"start":3,"end":8},{"type":"move","clip":12,"at":0}]
```

Trim the matching audio clip the same way.

**Split and delete a section** (remove timeline 4–6 s from clip 12). Split the later point first, so clip 12 still covers the earlier one:

```json
[{"type":"split","clip":12,"at":6},{"type":"split","clip":12,"at":4}]
```

If this returns 400 at `ops[1]`, nothing was written: split at 6, read, then split whichever clip covers 4 s. Read again, then delete the middle piece and close the gap by moving the later piece back 2 s. Do the same for the matching audio clips:

```json
[{"type":"delete","clips":[31]},{"type":"move","clip":32,"at":4}]
```

**Stack a second clip on a new track** (picture-in-picture or overlay from 2 s):

```json
[{"type":"add_clip","key":"job:<job-id>","track":"new","at":2}]
```

Read again to see which track it landed on. Since the first video track is on top, `move` it with a `track` listed after the main video's track to put it underneath instead.

**Mute the original audio** (audio track 3):

```json
[{"type":"level","track":3,"muted":true}]
```

Use `volume` instead to duck it under music rather than silence it.

## Limits and recovery

| Situation | Action |
| --- | --- |
| Over 50 ops | Split into several calls of 1–50 ops, reading between them. |
| 429 | An agent gets 120 ops per minute per project. Wait for `retryAfter` / `Retry-After`, then continue. |
| Stale (409, `code:"stale"`) | Someone, often the user, changed the project. Call `honeyvid_editor_get`, re-plan against the new timeline, then apply again. Never resend the old batch blindly. |
| Invalid op (400, `index`) | Nothing was written. Fix `ops[index]` (bad id, time, or missing `end`) and resend the whole batch. |
| Source not found (404-style) | The key is not the user's own item or is mistyped. Check the job id with `honeyvid_list_videos`. |
| Too large | A project holds up to 2000 clips and 256 KB of timeline; a request body is capped at 64 KB. |

There is **no undo op**. To revert your change, apply the inverse ops (move back, re-trim, delete what you added) after a fresh read. The user can also press Undo in the editor, which covers your changes too. A batch that changes nothing returns the same `version`.
