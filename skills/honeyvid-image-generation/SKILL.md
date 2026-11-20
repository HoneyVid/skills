---
name: honeyvid-image-generation
description: "Generate or edit HoneyVid Playground images with prompts and saved reference photos. Use for 'make an image', 'edit this photo', 'create a product shot', 'design a logo', or 'make image variants' through HoneyVid."
---

# HoneyVid image generation

Use connected HoneyVid MCP tools; otherwise use `npx honeyvid`. Connect at `https://honeyvid.ai/mcp` or run `npx honeyvid login`.

## Choose a model

Read [the image model tables](references/models.md) for every registry model, input limits, output counts, and settings. Refresh access and fields with `honeyvid_list_models {kind:"image"}` then `{model:"<id>"}`. CLI:

```sh
npx honeyvid models --kind image
npx honeyvid models --model nano-banana-2.1
```

Choose from the returned models. Start with Nano Banana 2.1 as the all-rounder; use GPT Image 2.6 for long instructions, crisp text or transparent backgrounds, FLUX 3 for photoreal detail, Seedream 5.0 Pro to blend many photos, Ideogram 4.5 for text, logos and posters, Qwen Image 3 for precise edits, Krea 3 for art-directed looks, and Recraft V4.1 for design and illustration. These are registry use cases, not benchmark rankings.

## Inputs: edit, generate, or guide style

- No input photos selects text generation. Qwen Image Edit 2511 and Bria FIBO Edit 1.5 require at least one photo; Ideogram 4 and the Recraft models accept none.
- Input photos select editing on every other model. State what must stay and what should change.
- Ideogram V3 photos guide **style**, not identity or photo replacement. Do not promise it will preserve a reference person's face.
- Save input photos as characters with `honeyvid_add_character {image_url:"<https-url>",name:"<name>"}` or `npx honeyvid characters add ./photo.jpg --name '<name>'`. Reuse IDs from `honeyvid_list_characters` / `npx honeyvid characters` when suitable.
- MCP photo URLs must be public HTTPS PNG/JPG/WebP up to 10 MB. Use the CLI for local private photos rather than making them public. Use only photos the user has the right to use.
- Send MCP `character_ids:["<id>","<id>"]` in intended input order, or repeat `--image '<id>'`. Images have no start/end/ref role suffix in this workflow.
- Respect the model's photo cap (up to 10; see the tables or `images.max` in the live schema). Do not pad a request with extra photos that add no useful detail.

## Write the image prompt

Describe subject, composition, setting, style, lighting, colors, and the intended use. Specify exact visible text in quotes and where it belongs. State the aspect ratio in settings rather than relying only on prompt text. Keep prompts within the live limit: 4000 characters on most models, less on a few.

For edits, name the source by input order and give a clear change: “Keep the person in the first photo, including face, pose, and jacket. Replace the background with a warm studio wall. Add soft light from the left.” Do not assume video `@Image1` tags work for image models; Kling Image O3 is the one that reads them.

For product shots, specify camera angle, background, shadows, materials, and label text. For logos or posters, specify text hierarchy and space around the subject. Use a supported `negative_prompt` only when needed. Inspect spelling, identity, and requested details before calling the result ready.

## Set, quote, create

1. Pick the listed aspect ratio for the destination; most models also offer `auto`. GPT Image 1.5 has no `aspect_ratio`; use its `image_size` enum.
2. Set output count with `num_images` only if offered (1–4). Models without it make one image per request. Start with one useful draft before spending on several variants unless the user asked for a batch.
3. Quote the exact prompt, settings, and inputs with `honeyvid_quote_generation {kind:"image",model,prompt,settings,images:[{character_id:"<id>"}]}`. The quote uses `images`; generation uses `character_ids`.
4. Compare credits and balance with the authorized budget. Submit `honeyvid_generate_image {model,prompt,settings,character_ids,max_credits,idempotency_key}` using the same quoted inputs, a ceiling within budget, and a saved unique key.

CLI example (replace cap/quote placeholders; omit `--image` for text-only generation):

```sh
npx honeyvid generate image --model nano-banana-2.1 \
  --prompt 'Keep the product from the photo. Warm studio wall, soft left light, centered composition.' \
  --image '<character-id>' --set aspect_ratio=4:5 --set resolution=2K \
  --set num_images=1 --max-credits <authorized-cap> --dry-run
# Submit the same inputs after checking the quote:
npx honeyvid generate image --model nano-banana-2.1 \
  --prompt 'Keep the product from the photo. Warm studio wall, soft left light, centered composition.' \
  --image '<character-id>' --set aspect_ratio=4:5 --set resolution=2K \
  --set num_images=1 --max-credits <quoted-credits> \
  --idempotency-key 'product-shot-001' --wait --output ./product-shot.png
```

Repeated `--set key=value` parses numeric and boolean values as those types. Output count, size/quality, reference count, and optional web search can affect price depending on model; use the quote, not a remembered per-image cost.

## Collect all outputs

- Use `honeyvid_get_video {job_id:"<id>",wait_seconds:45}` for image jobs too. Honor `retry_after_seconds`; read all `image_urls` when complete.
- CLI: `npx honeyvid videos --kind image`, then `npx honeyvid video '<id>' --wait --output ./product-shot.png`. Preserve the actual paths reported for multiple images. Match file extensions to returned formats; naming a JPEG `.png` does not convert it.
- Share `account_url` as the main result link (`job.accountUrl` in CLI output). It opens the saved image in the user’s HoneyVid account after sign-in and does not expire.
- Use `image_urls` for previews and downloads. Compare the returned count with the requested count; report any shortfall rather than inventing missing images. Requery status to refresh temporary media URLs; expiry does not delete the saved image.
- For an MCP download, fetch the returned media URL as bytes, for example `curl --fail --location "$IMAGE_URL" --output ./result.png` using an entry from `image_urls`. Use the returned format’s extension. `account_url` opens the app; it is not a file download. If the media URL expired, call `honeyvid_get_video` for a fresh URL without generating or paying again.
- Return the account link, paths if saved, model, job ID, and actual charged credits. Check balance for refunds before reporting net spend. Say whether you inspected text, identity, framing, or edits.

## Spend and recovery

Always quote and pass `max_credits` / `--max-credits`. Preserve the same key and inputs after uncertain submission. Waiting timeout means keep waiting on the same job. For a confirmed failed image job, `honeyvid_retry_video {job_id,max_credits,idempotency_key}` (CLI `npx honeyvid retry '<id>' --max-credits <n>`) reruns the saved inputs; add `model` to switch to another quoted image model.

Agents share 30 jobs per rolling hour, including retries/upscales. A multi-image request is one job, but its quote covers all requested outputs. Use the batch skill for a total budget across requests. Honor 429 retry timing, stop repeated failures, and never raise a spending ceiling silently. On low balance return the account's top-up link; on missing access or Playground 404 stop unsupported generation.
