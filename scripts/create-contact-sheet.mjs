import { mkdir } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const root = process.cwd();
const files = [
  'hero-desktop.jpg',
  'hero-mobile.jpg',
  'weddings.jpg',
  'showers.jpg',
  'birthdays.jpg',
  'kids-parties.jpg',
  'corporate.jpg',
  'planning-detail.jpg',
  'network.jpg',
  'venue.jpg',
];
const tileWidth = 420;
const tileHeight = 300;
const gap = 20;
const composites = [];

for (const [index, file] of files.entries()) {
  const tile = await sharp(path.join(root, 'src/assets/images', file))
    .resize(tileWidth, tileHeight, { fit: 'cover' })
    .jpeg({ quality: 78 })
    .toBuffer();
  composites.push({
    input: tile,
    left: (index % 2) * (tileWidth + gap),
    top: Math.floor(index / 2) * (tileHeight + gap),
  });
}

await mkdir(path.join(root, 'reports'), { recursive: true });
await sharp({
  create: {
    width: tileWidth * 2 + gap,
    height: Math.ceil(files.length / 2) * (tileHeight + gap) - gap,
    channels: 3,
    background: '#f6f2ea',
  },
})
  .composite(composites)
  .jpeg({ quality: 82 })
  .toFile(path.join(root, 'reports/contact-sheet.jpg'));

console.log('Created reports/contact-sheet.jpg');
