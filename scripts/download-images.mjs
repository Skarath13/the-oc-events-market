import { mkdir } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const root = process.cwd();
const imageDir = path.join(root, 'src/assets/images');
const faviconDir = path.join(root, 'public/favicon');
const socialDir = path.join(root, 'public/social');

const photos = [
  {
    filename: 'hero-desktop.jpg',
    base: 'https://images.unsplash.com/photo-1758810742974-b92459867642',
    width: 1920,
    height: 1280,
    position: 'centre',
  },
  {
    filename: 'hero-mobile.jpg',
    base: 'https://images.unsplash.com/photo-1758810742974-b92459867642',
    width: 1080,
    height: 1350,
    position: 'centre',
  },
  {
    filename: 'weddings.jpg',
    base: 'https://images.unsplash.com/photo-1763553113332-800519753e40',
    width: 1440,
    height: 1080,
    position: 'centre',
  },
  {
    filename: 'showers.jpg',
    base: 'https://images.unsplash.com/photo-1743437935763-3624f213d02f',
    width: 1200,
    height: 1500,
    position: 'centre',
  },
  {
    filename: 'birthdays.jpg',
    base: 'https://images.unsplash.com/photo-1767547909570-c96777094294',
    width: 1440,
    height: 1080,
    position: 'centre',
  },
  {
    filename: 'kids-parties.jpg',
    base: 'https://images.unsplash.com/photo-1512412646187-ea209a3cd3a6',
    width: 1200,
    height: 1500,
    position: 'centre',
  },
  {
    filename: 'corporate.jpg',
    base: 'https://images.unsplash.com/photo-1768508948508-507b3ff10cd3',
    width: 1440,
    height: 1080,
    position: 'centre',
  },
  {
    filename: 'planning-detail.jpg',
    base: 'https://images.unsplash.com/photo-1753189198553-8a5d219a47d3',
    width: 1200,
    height: 1500,
    position: 'centre',
  },
  {
    filename: 'network.jpg',
    base: 'https://images.unsplash.com/photo-1758648207539-b40dd1f6b50e',
    width: 1440,
    height: 1080,
    position: 'centre',
  },
  {
    filename: 'venue.jpg',
    base: 'https://images.unsplash.com/photo-1745740373720-d50883e8a38c',
    width: 1440,
    height: 1080,
    position: 'centre',
  },
];

await Promise.all([
  mkdir(imageDir, { recursive: true }),
  mkdir(faviconDir, { recursive: true }),
  mkdir(socialDir, { recursive: true }),
]);

for (const photo of photos) {
  const sourceUrl = `${photo.base}?auto=format&fit=crop&w=${photo.width}&h=${photo.height}&q=88`;
  const response = await fetch(sourceUrl, {
    headers: { 'User-Agent': 'The-OC-Events-Market-website-build/1.0' },
  });
  if (!response.ok) throw new Error(`Could not download ${photo.filename}: ${response.status}`);
  const source = Buffer.from(await response.arrayBuffer());
  await sharp(source)
    .rotate()
    .resize(photo.width, photo.height, { fit: 'cover', position: photo.position })
    .jpeg({ quality: 82, progressive: true, mozjpeg: true })
    .toFile(path.join(imageDir, photo.filename));
}

const monogramSvg = Buffer.from(`
  <svg width="512" height="512" xmlns="http://www.w3.org/2000/svg">
    <rect width="512" height="512" fill="#465148"/>
    <text x="256" y="300" text-anchor="middle" fill="#F6F2EA"
      font-family="Georgia, serif" font-size="180" font-weight="600">OC</text>
  </svg>
`);
await sharp(monogramSvg)
  .png({ compressionLevel: 9 })
  .resize(512, 512)
  .toFile(path.join(faviconDir, 'icon-512.png'));
await sharp(monogramSvg)
  .png({ compressionLevel: 9 })
  .resize(192, 192)
  .toFile(path.join(faviconDir, 'icon-192.png'));
await sharp(monogramSvg)
  .png({ compressionLevel: 9 })
  .resize(32, 32)
  .toFile(path.join(faviconDir, 'favicon-32.png'));
await sharp(path.join(imageDir, 'hero-desktop.jpg'))
  .resize(1200, 630, { fit: 'cover', position: 'centre' })
  .jpeg({ quality: 82, progressive: true, mozjpeg: true })
  .toFile(path.join(socialDir, 'og-default.jpg'));

console.log(`Downloaded and optimized ${photos.length} editorial images.`);
