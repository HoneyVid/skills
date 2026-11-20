# Image model decisions and limits

Source: HoneyVid's image model registry, the same list `honeyvid_list_models {kind:"image"}` and https://honeyvid.ai/models/images.json return. Read the live schema with `honeyvid_list_models {model:"<id>"}` / `npx honeyvid models --model '<id>'` before setting anything, and choose only models returned for this account.

Image prompts are capped at 4000 characters, except Kling Image O3 (2500), Wan 2.7 Pro (2000) and Recraft V3 (1000). Input photos are saved characters, sent in order, with no start/end/ref role. A model with an edit mode uses it when photos are supplied.

## Newest flagships

The Playground lists these first.

| Model ID | Name | Choose for | Input photos max | Images per run |
| --- | --- | --- | --- | --- |
| `nano-banana-2.1` | Nano Banana 2.1 | The best all-rounder, up to 4K | 10 | 1–4 |
| `gpt-image-2.6` | GPT Image 2.6 | Long prompts, crisp text, transparent backgrounds | 10 | 1–4 |
| `flux-3` | FLUX 3 | Photoreal detail and sharp type, up to 4K | 10 | 1 |
| `seedream-5-pro` | Seedream 5.0 Pro | Blending up to 10 photos | 10 | 1–4 |
| `ideogram-4.5` | Ideogram 4.5 | Text, logos and posters | 5 | 1–4 |
| `qwen-image-3` | Qwen Image 3 | Precise edits and clean text | 3 | 1–4 |
| `krea-3` | Krea 3 | Art-directed, tasteful looks | 8 | 1 |
| `grok-imagine-2` | Grok Imagine 2.0 | Bold, fast images | 5 | 1–4 |

## Older models, newest first

| Model ID | Name | Choose for | Input photos max | Images per run |
| --- | --- | --- | --- | --- |
| `fibo-2` | Bria FIBO 2 | Licensed training data, brand work | 4 | 1 |
| `flux-3-klein` | FLUX.3 Klein | Fast and light, up to 4K | 10 | 1–4 |
| `seedream-5-flash` | Seedream 5.0 Flash | The quickest Seedream | 10 | 1–4 |
| `gpt-image-2.5` | GPT Image 2.5 | OpenAI's September model | 10 | 1–4 |
| `fibo-edit-1.5` | Bria FIBO Edit 1.5 | Editing 1–4 photos into one image | 4, at least 1 (edit only) | 1 |
| `muse-image` | Meta Muse Image | Fast, simple images | 10 | 1–4 |
| `seedream-5-lite` | Seedream 5.0 Lite | Light and quick, up to 4K | 10 | 1–4 |
| `luma-uni-1` | Luma Uni-1 | Reasoning image model; manga style | 9 | 1 |
| `ideogram-4` | Ideogram 4 | Typography, priced by size | 0 (text only) | 1–4 |
| `recraft-v4.1` | Recraft V4.1 | Design-ready images, Flash/Standard/Pro | 0 (text only) | 1 |
| `hidream-o1` | HiDream O1 | Open model with fine control | 4 | 1–4 |
| `gpt-image-2` | GPT Image 2 | OpenAI's April model | 10 | 1–4 |
| `grok-imagine` | Grok Imagine | xAI's first image model | 3 | 1–4 |
| `wan-2.7-pro` | Wan 2.7 Pro | Alibaba's photo model | 4 | 1–4 |
| `nano-banana-2` | Nano Banana 2 | Optional web search | 10 | 1–4 |
| `recraft-v4` | Recraft V4 | Earlier V4 design model | 0 (text only) | 1 |
| `kling-image-o3` | Kling Image O3 | Stills that call photos by `@Image1` | 10 | 1–4 |
| `qwen-image-edit` | Qwen Image Edit 2511 | Photo edits with step/guidance control | 4, at least 1 (edit only) | 1–4 |
| `gpt-image-1.5` | GPT Image 1.5 | OpenAI's 2025 model, clean text | 4 | 1–4 |
| `seedream-4.5` | Seedream 4.5 | 2K/4K generation and edits | 10 | 1–4 |
| `flux-2-flex` | FLUX.2 Flex | Tunable steps and guidance | 4 | 1 |
| `flux-2-pro` | FLUX.2 Pro | 2025 photoreal model | 4 | 1 |
| `nano-banana-pro` | Nano Banana Pro | Google's 2025 flagship, optional web search | 8 | 1–4 |
| `recraft-v3` | Recraft V3 | Illustration and vector-style art | 0 (text only) | 1 |
| `ideogram-v3` | Ideogram V3 | Text, with up to 3 **style** references | 3 (style only) | 1–4 |

“Choose for” lines come from the registry, not benchmarks. Ideogram V3's photos guide style, never identity. Recraft's vector style still returns a raster image; use the returned format. Qwen Image 3 refuses PNG inputs with transparent pixels.

## Settings

Send only keys the live schema lists for the selected model; choice values are case-sensitive (`2K` vs `2k`). Most models have `aspect_ratio` with `auto` as the default; Ideogram 4/V3 and the Recraft models default to 1:1 and have no `auto`. `num_images` (1–4) sets the output count where offered.

| Model | Settings that change the result or price |
| --- | --- |
| Nano Banana 2.1 | `resolution` 1K/2K/4K; `thinking_level` minimal/medium/high; `output_format`; `seed` |
| GPT Image 2.6 | `variant` flare/sunburst; `resolution` 1K/2K/4K; `quality` low/medium/high; `reasoning_effort` low/medium/high; `background` auto/transparent/opaque; `output_format` |
| FLUX 3 | `resolution` 1k/1.5k/2k/4k; `enable_prompt_expansion`; `output_format` jpeg/png |
| Seedream 5.0 Pro / Flash | `resolution` 1.5K/2K; Pro adds `enhance_prompt_mode` standard/fast |
| Ideogram 4.5 | `quality` low/medium/high; `enable_prompt_expansion`; `edit_precision` regular/high; `seed` |
| Qwen Image 3 | `resolution` 1K/2K; `negative_prompt`; `enable_prompt_expansion`; `seed` |
| Krea 3 | `resolution` 1K/2K; `reasoning_level` medium/high; `negative_prompt`; `seed` |
| Grok Imagine 2.0 / Grok Imagine | `resolution` 1k/2k; 2.0 adds `quality` low/medium |
| GPT Image 2.5 / 2 | `resolution` 1K/2K/4K; `quality`; `background`; 2.5 adds `variant` |
| GPT Image 1.5 | `image_size` auto/1024x1024/1536x1024/1024x1536 instead of an aspect ratio; `quality`; `background`; `input_fidelity` low/high |
| FLUX.3 Klein, Kling Image O3, Nano Banana Pro | `resolution` 1K/2K/4K; Nano Banana Pro adds `enable_web_search` |
| Nano Banana 2 | `resolution` 0.5K/1K/2K/4K; `thinking_level` minimal/high; `enable_web_search` |
| Seedream 5.0 Lite / 4.5 | `resolution` 2K/4K |
| HiDream O1 | `resolution` 1K/2K; `guidance_scale` 0–20; `num_inference_steps` 1–50 |
| FLUX.2 Flex / Pro | `resolution` 1MP/4MP; Flex adds `guidance_scale` 1.5–10 and `num_inference_steps` 2–50 |
| Qwen Image Edit 2511 | `num_inference_steps` 1–50; `guidance_scale` 1–20; `negative_prompt`; `acceleration` none/regular/high |
| Ideogram 4 | `resolution` 1K/2K; `rendering_speed` TURBO/BALANCED/QUALITY; `expansion_model` None/Medium/Large |
| Ideogram V3 | `rendering_speed` TURBO/BALANCED/QUALITY; `style` AUTO/GENERAL/REALISTIC/DESIGN; `negative_prompt`; `enable_prompt_expansion` |
| Recraft V4.1 / V4 | `variant` flash/standard/pro (V4: standard/pro) |
| Recraft V3 | `style` realistic_image/digital_illustration/vector_illustration |
| Luma Uni-1 | `style` auto/manga |
| Bria FIBO 2, FIBO Edit 1.5, Meta Muse, Wan 2.7 Pro | Aspect ratio and output count only (Wan adds `negative_prompt`) |

Where offered, `seed` is a whole number from 0 to 2147483647; a fixed seed gives a similar image, not an identical one. For a transparent background use a GPT Image model with `background: transparent` and PNG output.

## Cost

Quote with `honeyvid_quote_generation {kind:"image",model,prompt,settings,images:[{character_id:"<id>"}]}` (generation uses `character_ids` instead) or CLI `generate image ... --dry-run`. Use the quote, never local arithmetic.

- Output count multiplies the price.
- Resolution, quality, reasoning and rendering tiers raise the price on most models that offer them; the quote shows which.
- Some models charge for each input photo, and web search adds a fixed cost.
- A multi-image job can return fewer images than requested; the missing ones are refunded. Report the delivered count and the actual charge, not the request.
