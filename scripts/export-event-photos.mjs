import { createHash } from 'node:crypto';
import { readFile, mkdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath, URL } from 'node:url';
import sharp from 'sharp';

const root = fileURLToPath(new URL('../', import.meta.url));
const sourceDirectory = process.argv[2];
const selectedIndex = process.argv[3] ? Number(process.argv[3]) : undefined;
if (!sourceDirectory) {
  throw new Error(
    'Usage: node scripts/export-event-photos.mjs <originals-directory> [photo-index]',
  );
}

const manifest = JSON.parse(
  await readFile(path.join(root, 'scripts/media/whatsapp-september-29.json'), 'utf8'),
);

for (const photo of manifest.entries) {
  if (selectedIndex && photo.index !== selectedIndex) continue;
  const original = await readFile(path.join(sourceDirectory, photo.source));
  const hash = createHash('sha256').update(original).digest('hex');
  if (hash !== photo.sourceSha256) throw new Error(`Source changed: ${photo.source}`);

  const overlays = await Promise.all(
    photo.masks.map(async (mask) => {
      const size = Math.ceil(Math.max(mask.width, mask.height) * 1.7);
      const emoji = await readFile(
        path.join(root, 'scripts/assets/privacy-emoji', `${mask.emoji}.svg`),
      );
      return {
        input: await sharp(emoji).resize(size, size).png().toBuffer(),
        left: Math.max(0, Math.round(mask.x + mask.width / 2 - size / 2)),
        top: Math.max(0, Math.round(mask.y + mask.height * 0.54 - size / 2)),
      };
    }),
  );

  // Composite before responsive resizing so every public derivative contains the mask.
  const masked = await sharp(original).rotate().composite(overlays).png().toBuffer();
  let image = sharp(masked);
  if (photo.crop) image = image.extract(photo.crop);
  const destination = path.join(root, photo.output);
  await mkdir(path.dirname(destination), { recursive: true });
  await image
    .resize({ width: 1600, height: 1600, fit: 'inside', withoutEnlargement: true })
    .webp({ quality: 86 })
    .toFile(destination);
  console.log(`${photo.index}: ${photo.output} (${photo.masks.length} masks)`);
}
