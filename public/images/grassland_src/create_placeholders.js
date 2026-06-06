const fs = require('fs');
const path = require('path');

const BASE = 'C:/Users/USER/Documents/agnes_project/草原小英雄';

function createSimplePNG(width, height, hexColor) {
  const r = parseInt(hexColor.slice(1, 3), 16);
  const g = parseInt(hexColor.slice(3, 5), 16);
  const b = parseInt(hexColor.slice(5, 7), 16);
  const rawSize = (width * 3 + 1) * height;
  const buffers = [];
  buffers.push(Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]));
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr[8] = 8;
  ihdr[9] = 2;
  ihdr[10] = 0;
  ihdr[11] = 0;
  ihdr[12] = 0;
  buffers.push(makeChunk('IHDR', ihdr));
  const raw = Buffer.alloc(rawSize);
  for (let y = 0; y < height; y++) {
    raw[y * (width * 3 + 1)] = 0;
    for (let x = 0; x < width; x++) {
      const idx = y * (width * 3 + 1) + 1 + x * 3;
      raw[idx] = r;
      raw[idx + 1] = g;
      raw[idx + 2] = b;
    }
  }
  const zlib = require('zlib');
  const compressed = zlib.deflateSync(raw);
  buffers.push(makeChunk('IDAT', compressed));
  buffers.push(makeChunk('IEND', Buffer.alloc(0)));
  return Buffer.concat(buffers);
}

function makeChunk(type, data) {
  const buf = Buffer.alloc(4 + 4 + data.length + 4);
  buf.write(type, 4);
  data.copy(buf, 8);
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(0xDEADBEEF, 0);
  buf.writeUInt32BE(crc.readUInt32BE(0), 8 + data.length);
  return buf;
}

const scenes = [
  { n: 1, c: '#90EE90' },
  { n: 2, c: '#87CEEB' },
  { n: 3, c: '#FFD700' },
  { n: 4, c: '#FFA07A' },
  { n: 5, c: '#FFA07A' },
  { n: 6, c: '#FFA07A' },
  { n: 7, c: '#98FB98' },
  { n: 8, c: '#DDA0DD' },
  { n: 9, c: '#B0C4DE' },
  { n: 10, c: '#87CEEB' },
  { n: 11, c: '#98FB98' },
  { n: 12, c: '#F0E68C' },
  { n: 13, c: '#FFD700' },
  { n: 14, c: '#FFA07A' },
  { n: 15, c: '#FF69B4' },
  { n: 16, c: '#87CEEB' },
  { n: 17, c: '#FFD700' },
  { n: 18, c: '#FF8C00' },
];

scenes.forEach(s => {
  const filename = 'scene' + String(s.n).padStart(2, '0') + '.png';
  const png = createSimplePNG(100, 100, s.c);
  fs.writeFileSync(path.join(BASE, filename), png);
  console.log('Created: ' + filename);
});

console.log('Total: ' + scenes.length + ' placeholder images created');
