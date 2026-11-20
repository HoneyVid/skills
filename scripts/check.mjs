// Validates every skill: frontmatter present, name matches its folder, description within 300 characters,
// SKILL.md under 150 lines, and every relative Markdown link points to a file that exists.
// Also checks the model references against HoneyVid's live exports: every live model is listed and every listed model is live.
import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';

const errors = [];
const root = 'skills';
for (const name of readdirSync(root, { withFileTypes: true }).filter((d) => d.isDirectory()).map((d) => d.name)) {
  const file = join(root, name, 'SKILL.md');
  if (!existsSync(file)) { errors.push(`${name}: missing SKILL.md`); continue; }
  const text = readFileSync(file, 'utf8');
  const front = text.match(/^---\n([\s\S]*?)\n---\n/);
  if (!front) { errors.push(`${file}: missing frontmatter`); continue; }
  const field = (key) => front[1].match(new RegExp(`^${key}:\\s*"?(.*?)"?\\s*$`, 'm'))?.[1];
  if (field('name') !== name) errors.push(`${file}: name must be "${name}"`);
  const description = field('description') ?? '';
  if (!description) errors.push(`${file}: missing description`);
  if (description.length > 300) errors.push(`${file}: description is ${description.length} characters (max 300)`);
  if (text.split('\n').length > 150) errors.push(`${file}: over 150 lines; move detail into references/`);
  for (const [, link] of text.matchAll(/\]\(((?!https?:|#)[^)]+)\)/g)) {
    if (!existsSync(join(dirname(file), link.split('#')[0]))) errors.push(`${file}: broken link ${link}`);
  }
}

/** Model IDs in the first column of a reference's tables. @param {string} file */
const listed = (file) => new Set([...readFileSync(file, 'utf8').matchAll(/^\| `([a-z0-9][\w.-]*)` \|/gm)].map((m) => m[1]));
/** @param {string} url */
async function live(url) {
  const response = await fetch(url, { signal: AbortSignal.timeout(15_000) });
  if (!response.ok) throw new Error(`${url} returned ${response.status}`);
  return response.json();
}
const references = [
  ['skills/honeyvid-video-generation/references/models.md', 'https://honeyvid.ai/models/models.json', (data) => data.models.map((m) => m.id)],
  ['skills/honeyvid-image-generation/references/models.md', 'https://honeyvid.ai/models/images.json', (data) => data.map((m) => m.key)],
];
for (const [file, url, ids] of references) {
  const want = new Set(ids(await live(url)));
  const have = listed(file);
  for (const id of want) if (!have.has(id)) errors.push(`${file}: live model ${id} is missing`);
  for (const id of have) if (!want.has(id)) errors.push(`${file}: ${id} is not a live model`);
}
if (errors.length) { console.error(errors.join('\n')); process.exit(1); }
console.log('All skills valid.');
