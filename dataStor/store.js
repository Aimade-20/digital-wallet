const fs = require("fs");
const path = require("path");

function readData(filename) {
  const filePath = path.join(__dirname, "..", "Data", filename);
  try {
    return JSON.parse(fs.readFileSync(filePath, "utf8"));
  } catch {
    return [];
  }
}

function writeData(filename, data) {
  const filePath = path.join(__dirname, "..", "Data", filename);
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  } catch (err) {
    console.error("Failed to write data:", err);
  }
}

module.exports = { readData, writeData };