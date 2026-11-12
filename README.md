# HoneyVid agent skills

Teach Claude Code, Codex and other agents to make HoneyVid videos and images: put anyone in a trending video from one photo, or generate with Kling, Veo, Seedance, Nano Banana and more. The skills work through the HoneyVid MCP tools (`https://honeyvid.ai/mcp`) or the [`honeyvid` CLI](https://github.com/HoneyVid/cli).

## Install

**Claude Code plugin** (skills plus the HoneyVid MCP server):

```text
/plugin marketplace add HoneyVid/skills
/plugin install honeyvid@honeyvid
```

**Any agent**, with the [skills](https://skills.sh) CLI:

```sh
npx skills add HoneyVid/skills
```

**With the HoneyVid CLI** (copies them into `~/.claude/skills` and/or `~/.codex/skills`):

```sh
npx honeyvid skills install
npx honeyvid skills install --agent codex
npx honeyvid skills list
```

Then connect your account: add `https://honeyvid.ai/mcp` to your agent, or run `npx honeyvid login`. Setup for every app: https://honeyvid.ai/mcp

## Skills

- **honeyvid**: connect, check credits, quote, create, wait, download, and handle errors.
- **honeyvid-viral-template**: put a person, pet or character into a trending template.
- **honeyvid-video-generation**: pick a Playground video model, write the prompt, and use frames, references or source video.
- **honeyvid-image-generation**: generate or edit images within each model's reference limits and settings.
- **honeyvid-batch**: make several variants within a total credit budget and report the spend.
- **honeyvid-video-editing**: cut, combine, trim, reorder and mute your HoneyVid videos in the editor while you watch live, then export the MP4.

Model access and prices come from the live account. Each skill links its references only where needed.

## Contributing

This repository is the source of the HoneyVid skills; pull requests are welcome. `node scripts/check.mjs` validates every skill (CI runs it too). The `honeyvid` npm package bundles these skills at a pinned commit, so a merged change reaches `npx honeyvid skills install` with the next CLI release.
