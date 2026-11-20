# Video model decisions and limits

Source: HoneyVid's Playground model registry, the same list `honeyvid_list_models` and https://honeyvid.ai/models/models.json return. Use the HoneyVid IDs below, never provider endpoint strings. Before choosing settings or quoting, read the live schema with `honeyvid_list_models {model:"<id>"}` / `npx honeyvid models --model '<id>'`, and choose only models returned for this account.

Lengths are seconds. Prompt caps are characters; "none" means the model takes no prompt, so omit it (MCP `prompt` or CLI `--prompt`). Every image-taking model needs at least one image; `start` and `end` each take one image. No video model takes more than 4 photos. Choice values are case-sensitive: copy them from the live schema.

Each table lists the current families first: Gemini Omni Flash 1.2, Kling 4.0 and Flash, Seedance 2.5, Grok Imagine 1.5, Runway Gen-4.5, HappyHorse 1.0 and Veo 3.1. The Playground shows Kling 3.0, Kling O3, Seedance 2.0 (with Fast and Mini), MiniMax H3, Wan 3.0 and Wan 2.2 under "Older models"; they all still work.

## Text to video: no images, no source video

| Model ID | Name | Choose for | Length | Resolution | Prompt max; required? |
| --- | --- | --- | --- | --- | --- |
| `gemini-omni-flash-1.2-t2v` | Gemini Omni Flash 1.2 | Google's newest, 360p up to 4K | 3–15, auto | 360p, 720p, 1080p, 4k | 4000; yes |
| `kling-4-t2v` | Kling 4.0 | Long, detailed prompts, up to 30 s | 3–30 | 720p, 1080p | 11000; yes |
| `kling-4-flash-t2v` | Kling 4.0 Flash | Faster, cheaper Kling 4.0 at 720p | 3–20 | 720p | 11000; yes |
| `seedance2.5-t2v` | Seedance 2.5 | Longest prompts, up to 30 s with sound | 4–30 | 480p, 720p, 1080p | 15000; yes |
| `seedance2-fast-t2v` | Seedance 2.0 Fast | Quick Seedance drafts with sound | 4–15 | 480p, 720p | 10000; yes |
| `seedance2-mini-t2v` | Seedance 2.0 Mini | Cheapest Seedance with sound | 4–15 | 480p, 720p | 10000; yes |
| `grok-imagine-1.5-t2v` | Grok Imagine 1.5 | Short clips from 1 s, most aspect ratios | 1–15 | 480p, 720p, 1080p | 2500; yes |
| `grok-imagine-1.5-lite-t2v` | Grok Imagine 1.5 Lite | Cheaper Grok; 1080p is upscaled from 720p | 1–15 | 480p, 720p, 1080p | 2500; yes |
| `gen4.5-t2v` | Runway Gen-4.5 | Short, polished Runway shots | 2–10 | 720p | 1000; yes |
| `happyhorse-1.0-t2v` | HappyHorse 1.0 | Alibaba's model at 720p or 1080p | 3–15 | 720p, 1080p | 2500; yes |
| `kling-v3-t2v-standard` | Kling 3.0 Standard | Prompt-led scenes with sound and voices | 3–15 | — | 2500; yes |
| `kling-v3-t2v-pro` | Kling 3.0 Pro | Same at the Pro tier | 3–15 | — | 2500; yes |
| `veo31-t2v` | Veo 3.1 | Cinematic scenes with dialogue and sound | 4s, 6s, 8s | 720p, 1080p, 4k | 4000; yes |
| `veo31-fast-t2v` | Veo 3.1 Fast | Veo at a third of the price | 4s, 6s, 8s | 720p, 1080p, 4k | 4000; yes |
| `seedance2-t2v` | Seedance 2.0 | Smooth motion, up to 4K | 4–15 | 480p, 720p, 1080p, 4k | 4000; yes |
| `minimax-h3-t2v` | MiniMax H3 | Real physics and natural faces | 5–15 | 480P, 768P, 2K, 4K | 2000; yes |
| `wan3-prime-t2v` | Wan 3.0 Prime | Up to 30 s in one take, with sound | 2–30 | 480p, 720p, 1080p | 3000; yes |

## Animate images: start frame, optional end frame

| Model ID | Name | Roles; max images | Length | Resolution | Prompt max; required? |
| --- | --- | --- | --- | --- | --- |
| `gemini-omni-flash-1.2-i2v` | Gemini Omni Flash 1.2 | start (required), end; 2 | 3–15, auto | 360p, 720p, 1080p, 4k | 4000; yes |
| `kling-4-i2v` | Kling 4.0 | start (required), end; 2 | 3–30 | 720p, 1080p | 11000; no |
| `kling-4-flash-i2v` | Kling 4.0 Flash | start (required); 1 | 3–20 | 720p | 11000; no |
| `seedance2.5-i2v` | Seedance 2.5 | start (required), end; 2 | 4–30 | 480p, 720p, 1080p | 15000; no |
| `seedance2-fast-i2v` | Seedance 2.0 Fast | start (required), end; 2 | 4–15 | 480p, 720p | 10000; no |
| `seedance2-mini-i2v` | Seedance 2.0 Mini | start (required), end; 2 | 4–15 | 480p, 720p | 10000; no |
| `grok-imagine-1.5-i2v` | Grok Imagine 1.5 | start (required); 1 | 1–15 | 480p, 720p, 1080p | 2500; yes |
| `grok-imagine-1.5-lite-i2v` | Grok Imagine 1.5 Lite | start (required); 1 | 1–15 | 480p, 720p, 1080p | 2500; no |
| `gen4.5-i2v` | Runway Gen-4.5 | start (required); 1 | 2–10 | 720p | 1000; yes |
| `happyhorse-1.0-i2v` | HappyHorse 1.0 | start (required); 1 | 3–15 | 720p, 1080p | 2500; no |
| `kling-v3-i2v-standard` | Kling 3.0 Standard | start (required), end; 2 | 3–15 | — | 2500; no |
| `kling-v3-i2v-pro` | Kling 3.0 Pro | start (required), end; 2 | 3–15 | — | 2500; no |
| `veo31-i2v` | Veo 3.1 | start (required); 1 | 4s, 6s, 8s | 720p, 1080p, 4k | 4000; yes |
| `veo31-fast-i2v` | Veo 3.1 Fast | start (required); 1 | 4s, 6s, 8s | 720p, 1080p, 4k | 4000; yes |
| `seedance2-i2v` | Seedance 2.0 | start (required), end; 2 | 4–15 | 480p, 720p, 1080p, 4k | 4000; yes |
| `minimax-h3-i2v` | MiniMax H3 | start, end; 2; at least one | 5–15 | 480P, 768P, 2K, 4K | 2000; yes |
| `wan3-prime-i2v` | Wan 3.0 Prime | start (required), end; 2 | 2–30 | 480p, 720p, 1080p | 3000; no |

## Reference photos: cast subjects into a new scene

| Model ID | Name | Choose for | Roles; max images | Length | Resolution | Prompt max |
| --- | --- | --- | --- | --- | --- | --- |
| `gemini-omni-flash-1.2-ref` | Gemini Omni Flash 1.2 | Cast people, pets and places from 1–4 photos, with native audio | ref; 4 | 3–15 | 360p, 720p, 1080p, 4K | 15000 |
| `kling-o3-ref-standard` | Kling O3 Reference Standard | Characters, objects and places in one shot | ref, start, end; 4 | 3–15 | — | 2500 |
| `kling-o3-ref-pro` | Kling O3 Reference Pro | Same at the Pro tier | ref, start, end; 4 | 3–15 | — | 2500 |
| `seedance2-ref` | Seedance 2.0 Reference | Blend images into one scene | ref; 4 | 4–15 | 480p, 720p, 1080p, 4k | 4000 |
| `veo31-ref` | Veo 3.1 Reference | Keep subjects consistent through the clip | ref; 3 | 8s only | 720p, 1080p, 4k | 4000 |

All reference models require a prompt. Gemini Omni, Kling O3 and Seedance read `@Image1` to `@Image4` tags in the order the photos are sent. Gemini Omni's 4K value is `4K` here but `4k` in its t2v/i2v variants. Veo Reference has no end frame or seed.

## Source video: swap a character or copy motion

All need a source video (`{source:"upload"|"template",id}`) and reference photos with role `ref`. Output length follows the source. Uploads accept 3–30 seconds; a model's own cap below may be shorter. Never send a raw video URL in a generation request.

| Model ID | Name | Choose for | Ref photos | Source length | Prompt max; required? | Settings |
| --- | --- | --- | --- | --- | --- | --- |
| `kling-4` | Kling 4.0 | The default swap: your character in, scene kept | 1–4 | 3–30 | 2500; no | resolution 720p/1080p; source audio restored |
| `kling-4-flash` | Kling 4.0 Flash | Faster, cheaper swaps at 720p | 1–4 | 3–20 | 2500; no | resolution 720p; source audio restored |
| `seedance2.5` | Seedance 2.5 | Prompt-led edits of a clip; resolution follows the source | 1–4 | 4–30 | 15000; yes | none; source audio restored |
| `kling-o3-edit-standard` | Kling O3 Edit Standard | Swap a character with a written instruction | 1 | 3–15 | 2500; yes | keep_audio, default on |
| `kling-o3-edit-pro` | Kling O3 Edit Pro | Same at the Pro tier | 1 | 3–15 | 2500; yes | keep_audio, default on |
| `kling-motion-standard` | Kling Motion Control Standard | Your image, moving like the video | 1 | 3–30; 10 max with image framing | 2500; no | character_orientation video/image; keep_original_sound |
| `kling-motion-pro` | Kling Motion Control Pro | Same at the Pro tier | 1 | 3–30; 10 max with image framing | 2500; no | character_orientation video/image; keep_original_sound |
| `wan22-replace` | Wan 2.2 Animate | The lowest-price swap | 1 | 1–30 | none | resolution 480p/580p/720p; source audio restored |

Kling 4.0 and Flash take `@Image1` tags when you add a prompt. Kling Motion Control copies one continuous shot: a source with cuts gets cut short, so use Kling O3 Edit for multi-shot clips.

## Upscale a video

Upscalers take only a source video (no photos, no prompt) and one setting, `resolution`: `1080p` (default) or `4k`. They handle up to 30 seconds and keep the source audio.

| Model ID | Name | Choose for |
| --- | --- | --- |
| `upscale-topaz` | Topaz Starlight | Rebuilds faces, hair and fabric in fine detail |
| `upscale-magnific` | Magnific | Creative: adds fresh texture and crisp detail |
| `upscale-bytedance` | ByteDance Pro | Restoration tuned for AI video, true to the original |
| `upscale-seedvr` | SeedVR2 | Sharpens edges and keeps the look |
| `upscale-flashvsr` | FlashVSR | Fast and faithful |

## Settings that change a decision

- **Gemini Omni Flash 1.2:** 16:9 or 9:16. Duration `auto` lets the model choose and is quoted and charged as 15 seconds.
- **Kling 4.0 / Flash:** text variants offer 16:9 or 9:16; image variants take the frame's shape. No audio switch.
- **Seedance 2.5, 2.0 Fast, 2.0 Mini:** 16:9 or 9:16, and an `audio` switch (default on).
- **Grok Imagine 1.5:** text offers 16:9, 9:16, 1:1, 4:3, 3:4, 3:2, 2:3; Lite text offers 16:9 or 9:16; image variants take the frame's shape.
- **HappyHorse 1.0:** text offers 16:9, 9:16, 1:1, 4:3, 3:4; image variants take the frame's shape.
- **Kling 3.0 / O3 Reference:** `generate_audio`, `shot_type` customize/intelligent. Text and reference offer 16:9, 9:16, 1:1; i2v has no aspect field. Only Kling 3.0 exposes `negative_prompt` and `cfg_scale` 0–1. Reference audio defaults off; Kling 3.0 audio defaults on.
- **Veo 3.1:** duration `4s`/`6s`/`8s` (reference `8s` only), `generate_audio` on by default, `auto_fix`. Text and reference 16:9 or 9:16; i2v adds auto. Non-reference variants expose `negative_prompt` and `seed`.
- **Seedance 2.0:** `generate_audio`, `bitrate_mode` standard/high. Text ratios auto, 16:9, 4:3, 1:1, 3:4, 9:16; image and reference add 21:9. No seed.
- **MiniMax H3:** resolution values are upper case (`768P`, `2K`); `prompt_expansion_mode` disabled/fast/balanced/quality; `seed`. No audio.
- **Wan 3.0 Prime:** `audio`, `enable_prompt_expansion`, `enable_thinking`, `seed`; ratios adaptive, 16:9, 4:3, 1:1, 3:4, 9:16.
- Duration values differ: most models take strings such as `"5"` and Veo takes `"8s"`, while Grok Imagine 1.5 (not Lite), HappyHorse, MiniMax and Wan 3.0 take numbers. Where offered, seed is a whole number from 0 to 2147483647; a fixed seed gives a similar result, not an identical one.

## Cost rules

Quote with `honeyvid_quote_generation` / CLI `generate video ... --dry-run` and use that number. Never show provider dollar rates as the customer's price.

- Generation cost scales with duration and resolution.
- Audio raises the price on Kling 3.0, Kling O3 Reference and Veo. It does not change the price on Seedance or Wan 3.0.
- Some image-to-video models add a small fee per input frame.
- Source-video models and upscalers charge by source length; Kling 4.0, Wan 2.2 and the upscalers also by resolution.
- Aspect ratio, bitrate and seed do not change the price. Still quote the exact settings.
