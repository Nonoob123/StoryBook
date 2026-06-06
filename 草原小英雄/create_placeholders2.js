const fs = require('fs');
const zlib = require('zlib');

const BASE = 'C:\\\\Users\\\\USER\\\\Documents\\\\agnes_project\\\\²ÝÔ­Ð¡Ó¢ÐÛ';

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
  'scene01_grassland_friends.png',
  'scene02_eagle_flying.png',
  'scene03_wish_to_fly.png',
  'scene04_first_failure.png',
  'scene05_second_failure.png',
  'scene06_third_failure.png',
  'scene07_leaves_wings.png',
  'scene08_balloons_mud.png',
  'scene09_others_laugh.png',
  'scene10_continue_research.png',
  'scene11_camel_helps.png',
  'scene12_record_failures.png',
  'scene13_hundredth_experiment.png',
  'scene14_glider_flight.png',
  'scene15_success_celebration.png',
  'scene16_worth_it_question.png',
  'scene17_wisdom_answer.png',
  'scene18_sunset_friends.png',
];

const colors = ['#90EE90', '#87CEEB', '#FFD700', '#FFA07A', '#FFA07A', '#FFA07A', '#98FB98', '#DDA0DD', '#B0C4DE', '#87CEEB', '#98FB98', '#F0E68C', '#FFD700', '#FFA07A', '#FF69B4', '#87CEEB', '#FFD700', '#FF8C00'];

scenes.forEach((fn, i) => {
  const png = createSimplePNG(100, 100, colors[i]);
  const filePath = BASE + '\\\\' + fn;
  fs.writeFileSync(filePath, png);
  console.log('Created: ' + fn);
});
