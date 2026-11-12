# Editor ops

`honeyvid_editor_apply` takes 1–50 ops. They run in order, each on the result of the ones before. The whole batch is atomic: one invalid op rejects the call with `{error:"<message> (ops[N])", index:N}` and writes nothing. All times are seconds. Clip and track ids are numbers from `honeyvid_editor_get`.

| Op | Fields | Effect |
| --- | --- | --- |
| `add_clip` | `key`, `track?`, `at?`, `start?`, `end?` | Add a source to the timeline. |
| `split` | `clip`, `at` | Cut a clip in two at timeline second `at`. |
| `delete` | `clips: [ids]` | Remove clips. Leaves a gap; nothing ripples. |
| `move` | `clip`, `at`, `track?` | Place a clip at timeline second `at`, optionally on another track. |
| `trim` | `clip`, `start?`, `end?` | Set the clip's in and out points inside its source. |
| `level` | `track`, `volume?`, `muted?` | Set a track's volume or mute it. |

There are no undo or redo ops. Revert with the inverse ops, or let the user press Undo in the editor.

## add_clip

- `track`: a track id, `"new"` for a new track, or `"fit"` (default) to use the first track with room.
- `at`: timeline start. Defaults to the end of the timeline, so repeated adds append in order.
- `start` / `end`: in and out points in the source. `start` defaults to 0; `end` defaults to the source's length.
- A video with sound also places its audio clip on an audio track, the same way the browser does.
- Stills (images, characters) have no fixed length and default to 5 s; set `end` for another length.

### Source keys

| Key | Source |
| --- | --- |
| `job:<id>` | A finished video job the user made. Its length comes from the job. |
| `image:<jobId>:<i>` | Image `i` (from 0) of an image job. |
| `character:<id>` | A saved character photo. |
| `file:<id>` | A file already stored in this project. |

The server adds a new source only if it is the user's own item; anything else is a 404-style error. A `file:` video or audio that is not on the timeline yet needs `end`, which also becomes its length.

## Limits

- 50 ops per call; 120 ops per minute per project for an agent (429 with `retryAfter`).
- 2000 clips and 256 KB of timeline per project; 64 KB per request.
- `note` up to 140 characters. Editing never spends credits.
- Send `base_version` from your last read. A mismatch, or a lost race with another writer, returns 409 `code:"stale"` with the current `version`: read again, re-plan, apply again.
- A batch that changes nothing returns the same `version` and the user sees no change.
