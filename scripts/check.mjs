// Validates every skill: frontmatter present, name matches its folder, description within 300 characters,
// SKILL.md under 150 lines, and every relative Markdown link points to a file that exists.
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
if (errors.length) { console.error(errors.join('\n')); process.exit(1); }
console.log('All skills valid.');
