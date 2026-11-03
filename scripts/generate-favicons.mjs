import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const sourceImgPath = 'C:\\Users\\Marathe Vaibhav\\.gemini\\antigravity-ide\\brain\\b05cf2ef-02c1-48be-a1bd-1a843096688c\\.user_uploaded\\media_1792299931912.jpg';
const fallbackPath = path.resolve('public', 'avatar.jpg');

const inputPath = fs.existsSync(sourceImgPath) ? sourceImgPath : fallbackPath;
console.log('Using source image:', inputPath);

// SVG circular alpha mask (radius 506 at 512,512)
const maskSvg = `<svg width="1024" height="1024"><circle cx="512" cy="512" r="506" fill="#ffffff" /></svg>`;
const maskBuffer = Buffer.from(maskSvg);

/**
 * Packs multiple PNG buffers into a valid ICO container
 */
function createIco(images) {
  // Header: 6 bytes
  // Count: 2 bytes
  const count = images.length;
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // icon type 1
  header.writeUInt16LE(count, 4); // count

  const directoryEntries = [];
  let currentOffset = 6 + count * 16;

  for (const img of images) {
    const entry = Buffer.alloc(16);
    entry.writeUInt8(img.width >= 256 ? 0 : img.width, 0);
    entry.writeUInt8(img.height >= 256 ? 0 : img.height, 1);
    entry.writeUInt8(0, 2); // color palette
    entry.writeUInt8(0, 3); // reserved
    entry.writeUInt16LE(1, 4); // color planes
    entry.writeUInt16LE(32, 6); // bits per pixel
    entry.writeUInt32LE(img.buffer.length, 8); // image size
    entry.writeUInt32LE(currentOffset, 12); // image offset

    directoryEntries.push(entry);
    currentOffset += img.buffer.length;
  }

  return Buffer.concat([
    header,
    ...directoryEntries,
    ...images.map(img => img.buffer)
  ]);
}

async function run() {
  // Step 1: Create master circular PNG with transparent exterior
  const masterCircularBuffer = await sharp(inputPath)
    .resize(1024, 1024)
    .composite([{ input: maskBuffer, blend: 'dest-in' }])
    .png()
    .toBuffer();

  console.log('Created master circular PNG');

  // Step 2: Generate specific resolution PNGs
  const resolutions = [
    { size: 16, sharpen: { sigma: 0.8, m1: 1.5, m2: 2.5 } },
    { size: 32, sharpen: { sigma: 0.8, m1: 1.2, m2: 2.0 } },
    { size: 48, sharpen: { sigma: 0.7, m1: 1.0, m2: 1.5 } },
    { size: 64, sharpen: { sigma: 0.6, m1: 0.8, m2: 1.2 } },
    { size: 180, sharpen: null }, // apple touch icon
    { size: 192, sharpen: null }, // android chrome 192
    { size: 512, sharpen: null }, // android chrome 512
  ];

  const buffersBySize = {};

  for (const { size, sharpen } of resolutions) {
    let pipeline = sharp(masterCircularBuffer).resize(size, size, { kernel: 'lanczos3' });
    if (sharpen) {
      pipeline = pipeline.sharpen(sharpen);
    }
    const buf = await pipeline.png().toBuffer();
    buffersBySize[size] = buf;
    console.log(`Generated ${size}x${size} PNG (${buf.length} bytes)`);
  }

  // Step 3: Write PNG files into public/ and app/
  fs.writeFileSync(path.resolve('public', 'favicon-16x16.png'), buffersBySize[16]);
  fs.writeFileSync(path.resolve('public', 'favicon-32x32.png'), buffersBySize[32]);
  fs.writeFileSync(path.resolve('public', 'apple-touch-icon.png'), buffersBySize[180]);
  fs.writeFileSync(path.resolve('public', 'android-chrome-192x192.png'), buffersBySize[192]);
  fs.writeFileSync(path.resolve('public', 'android-chrome-512x512.png'), buffersBySize[512]);

  // App router convention files
  fs.writeFileSync(path.resolve('app', 'icon.png'), buffersBySize[32]);
  fs.writeFileSync(path.resolve('app', 'apple-icon.png'), buffersBySize[180]);

  // Step 4: Build multi-resolution ICO file (16, 32, 48)
  const icoBuffer = createIco([
    { width: 16, height: 16, buffer: buffersBySize[16] },
    { width: 32, height: 32, buffer: buffersBySize[32] },
    { width: 48, height: 48, buffer: buffersBySize[48] },
  ]);

  fs.writeFileSync(path.resolve('public', 'favicon.ico'), icoBuffer);
  fs.writeFileSync(path.resolve('app', 'favicon.ico'), icoBuffer);
  console.log(`Created multi-size favicon.ico (${icoBuffer.length} bytes) in public/ and app/`);

  // Step 5: Remove outdated/conflicting app/icon.svg if present
  const oldSvgPath = path.resolve('app', 'icon.svg');
  if (fs.existsSync(oldSvgPath)) {
    fs.unlinkSync(oldSvgPath);
    console.log('Removed outdated app/icon.svg');
  }

  console.log('All favicon assets successfully generated!');
}

run().catch((err) => {
  console.error('Error generating favicons:', err);
  process.exit(1);
});
