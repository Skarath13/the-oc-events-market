import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { readFile, stat } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const root = process.cwd();
const maxStaticAssetBytes = 25 * 1024 * 1024;
const mediaDirectory = path.join(root, 'public/videos');

const videos = [
  {
    filename: 'hero/oc-events-hero-desktop-v1.mp4',
    codec: 'h264',
    width: 1440,
    height: 810,
  },
  {
    filename: 'hero/oc-events-hero-desktop-v1.webm',
    codec: 'vp9',
    width: 1440,
    height: 810,
  },
  {
    filename: 'hero/oc-events-hero-mobile-v1.mp4',
    codec: 'h264',
    width: 720,
    height: 1280,
  },
  {
    filename: 'hero/oc-events-hero-mobile-v1.webm',
    codec: 'vp9',
    width: 720,
    height: 1280,
  },
  {
    filename: 'actual/actual-dessert-finishing-v1.mp4',
    codec: 'h264',
    width: 576,
    height: 480,
    minDuration: 2.9,
    maxBytes: 300 * 1024,
  },
  {
    filename: 'actual/actual-ivone-event-details-v1.mp4',
    codec: 'h264',
    width: 576,
    height: 768,
    minDuration: 7.5,
    maxBytes: 1100 * 1024,
  },
];

const posters = [
  { filename: 'hero/oc-events-hero-desktop-v1-poster.webp', width: 1440, height: 810 },
  { filename: 'hero/oc-events-hero-mobile-v1-poster.webp', width: 720, height: 1280 },
  {
    filename: 'actual/actual-dessert-finishing-v1-poster.webp',
    width: 576,
    height: 480,
  },
  {
    filename: 'actual/actual-ivone-event-details-v1-poster.webp',
    width: 576,
    height: 768,
  },
];

for (const expected of videos) {
  const filename = path.join(mediaDirectory, expected.filename);
  const file = await stat(filename);
  assert(file.size > 0, `${expected.filename} is empty`);
  assert(
    file.size < maxStaticAssetBytes,
    `${expected.filename} exceeds the Cloudflare 25 MiB static-asset limit`,
  );
  if (expected.maxBytes) {
    assert(file.size <= expected.maxBytes, `${expected.filename} exceeds its web delivery budget`);
  }

  const probe = JSON.parse(
    execFileSync(
      'ffprobe',
      [
        '-v',
        'error',
        '-show_entries',
        'format=duration:stream=codec_type,codec_name,width,height,pix_fmt,avg_frame_rate',
        '-of',
        'json',
        filename,
      ],
      { encoding: 'utf8' },
    ),
  );
  const videoStreams = probe.streams.filter((stream) => stream.codec_type === 'video');
  const audioStreams = probe.streams.filter((stream) => stream.codec_type === 'audio');
  assert.equal(videoStreams.length, 1, `${expected.filename} must have exactly one video stream`);
  assert.equal(audioStreams.length, 0, `${expected.filename} must not contain an audio track`);

  const [stream] = videoStreams;
  assert.equal(stream.codec_name, expected.codec, `${expected.filename} codec`);
  assert.equal(stream.width, expected.width, `${expected.filename} width`);
  assert.equal(stream.height, expected.height, `${expected.filename} height`);
  assert.equal(stream.pix_fmt, 'yuv420p', `${expected.filename} pixel format`);
  assert.equal(stream.avg_frame_rate, '24/1', `${expected.filename} frame rate`);
  assert(
    Number(probe.format.duration) >= (expected.minDuration ?? 6),
    `${expected.filename} is shorter than its approved loop`,
  );

  if (expected.filename.endsWith('.mp4')) {
    const bytes = await readFile(filename);
    const moovIndex = bytes.indexOf(Buffer.from('moov'));
    const mdatIndex = bytes.indexOf(Buffer.from('mdat'));
    assert(moovIndex > 0, `${expected.filename} is missing its moov atom`);
    assert(mdatIndex > 0, `${expected.filename} is missing its mdat atom`);
    assert(moovIndex < mdatIndex, `${expected.filename} is not optimized for fast start`);
  }
}

for (const expected of posters) {
  const filename = path.join(mediaDirectory, expected.filename);
  const metadata = await sharp(filename).metadata();
  assert.equal(metadata.format, 'webp', `${expected.filename} format`);
  assert.equal(metadata.width, expected.width, `${expected.filename} width`);
  assert.equal(metadata.height, expected.height, `${expected.filename} height`);
}

console.log('Site video media contracts verified.');
