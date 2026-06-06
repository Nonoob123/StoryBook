const fs = require('fs');
const zlib = require('zlib');
const path = require('path');

const BASE = __dirname;

function makeChunk(type, data) {
  const buf = Buffer.alloc(4 + 4 + data.length + 4);
  buf.write(type, 4);
  data.copy(buf, 8);
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(0xDEADBEEF, 0);
  buf.writeUInt32BE(crc.readUInt32BE(0), 8 + data.length);
  return buf;
}

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
  const compressed = zlib.deflateSync(raw);
  buffers.push(makeChunk('IDAT', compressed));
  buffers.push(makeChunk('IEND', Buffer.alloc(0)));
  return Buffer.concat(buffers);
}

const scenes = [
  { fn: 'scene01_grassland_friends.png', c: '#90EE90' },
  { fn: 'scene02_eagle_flying.png', c: '#87CEEB' },
  { fn: 'scene03_wish_to_fly.png', c: '#FFD700' },
  { fn: 'scene04_first_failure.png', c: '#FFA07A' },
  { fn: 'scene05_second_failure.png', c: '#FFA07A' },
  { fn: 'scene06_third_failure.png', c: '#FFA07A' },
  { fn: 'scene07_leaves_wings.png', c: '#98FB98' },
  { fn: 'scene08_balloons_mud.png', c: '#DDA0DD' },
  { fn: 'scene09_others_laugh.png', c: '#B0C4DE' },
  { fn: 'scene10_continue_research.png', c: '#87CEEB' },
  { fn: 'scene11_camel_helps.png', c: '#98FB98' },
  { fn: 'scene12_record_failures.png', c: '#F0E68C' },
  { fn: 'scene13_hundredth_experiment.png', c: '#FFD700' },
  { fn: 'scene14_glider_flight.png', c: '#FFA07A' },
  { fn: 'scene15_success_celebration.png', c: '#FF69B4' },
  { fn: 'scene16_worth_it_question.png', c: '#87CEEB' },
  { fn: 'scene17_wisdom_answer.png', c: '#FFD700' },
  { fn: 'scene18_sunset_friends.png', c: '#FF8C00' },
];

scenes.forEach(s => {
  const png = createSimplePNG(100, 100, s.c);
  const filePath = path.join(BASE, s.fn);
  fs.writeFileSync(filePath, png);
  console.log('Created: ' + s.fn);
});
console.log('Done!');
