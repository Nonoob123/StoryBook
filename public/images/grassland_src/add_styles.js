const fs = require('fs');
let html = fs.readFileSync('C:/Users/USER/Documents/agnes_project/草原小英雄/index.html', 'utf8');

if (html.includes('.dialog-sheep')) {
  console.log('Styles already exist');
  process.exit(0);
}

const sheepCamelStyles = '\\n.dialog-sheep{background:linear-gradient(135deg,#e8f5e9,#c8e6c9);border-left:4px solid #4caf50;padding:15px 20px;margin:15px 0;border-radius:0 10px 10px 0;font-weight:700;color:#2e7d32}\\n.dialog-camel{background:linear-gradient(135deg,#fff3e0,#ffe0b2);border-left:4px solid #ff9800;padding:15px 20px;margin:15px 0;border-radius:0 10px 10px 0;font-weight:700;color:#e65100}\\nbody.dark-mode .dialog-sheep{background:linear-gradient(135deg,#1a3a2a,#0d2117);color:#88ffaa;border-left-color:#44cc88}\\nbody.dark-mode .dialog-camel{background:linear-gradient(135deg,#3d2a0a,#2a1a00);color:#ffcc88;border-left-color:#cc8844}\\n';

html = html.replace('</style>', sheepCamelStyles + '</style>');
fs.writeFileSync('C:/Users/USER/Documents/agnes_project/草原小英雄/index.html', html, 'utf8');
console.log('Added dialog-sheep and dialog-camel CSS styles');
