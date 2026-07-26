import { readdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

const outputDirectory = path.resolve('dist/client');
const rawBasePath = process.env.PAGES_BASE_PATH ?? '';
const basePath = `/${rawBasePath.split('/').filter(Boolean).join('/')}`;
const textExtensions = new Set(['.css', '.html', '.js', '.json', '.txt', '.webmanifest', '.xml']);

if (basePath === '/') {
  throw new Error('PAGES_BASE_PATH must name the GitHub Pages repository path.');
}

for (const filename of await walk(outputDirectory)) {
  if (!textExtensions.has(path.extname(filename))) continue;

  const source = await readFile(filename, 'utf8');
  const withAssetBase = source.replace(/(?<![A-Za-z0-9/_-])\/_assets\//g, `${basePath}/_assets/`);
  const rewritten = withAssetBase.replace(
    /\b(href|src|action)="(\/(?!\/)[^"]*)"/g,
    (match, attribute, target) =>
      target === basePath || target.startsWith(`${basePath}/`)
        ? match
        : `${attribute}="${basePath}${target}"`,
  );

  if (rewritten !== source) await writeFile(filename, rewritten);
}

await writeFile(path.join(outputDirectory, '.nojekyll'), '');
console.log(`Prepared static GitHub Pages preview at base path ${basePath}.`);

async function walk(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const target = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...(await walk(target)));
    else if (entry.isFile()) files.push(target);
  }
  return files;
}
