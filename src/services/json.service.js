const fs = require('fs');
const path = require('path');

const dataDir = path.join(__dirname, '..', '..', 'data');

function fileFor(name) {
  return path.join(dataDir, name + '.json');
}

function read(name) {
  const file = fileFor(name);
  try {
    if (!fs.existsSync(file)) return [];
    const raw = fs.readFileSync(file, 'utf8');
    return JSON.parse(raw || '[]');
  } catch (err) {
    console.error('read error', err);
    return [];
  }
}

function write(name, data) {
  const file = fileFor(name);
  try {
    fs.writeFileSync(file, JSON.stringify(data, null, 2), 'utf8');
  } catch (err) {
    console.error('write error', err);
  }
}

module.exports = { read, write };
