const fs = require("fs");
const path = require("path");

const dataPath = path.join(__dirname, "../data/data.json");

// Read JSON data
function readData() {
  const jsonData = fs.readFileSync(dataPath);
  return JSON.parse(jsonData);
}

// Write JSON data
function writeData(data) {
  fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
}

module.exports = { readData, writeData };
