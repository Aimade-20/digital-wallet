
const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname,"..","Data","users.json");

 function readData() {

    try {
    return JSON.parse(fs.readFileSync("data.json", "utf8"));
  } catch {
    return { users: [] };
  }
}

async function writeData(data) {
 await fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

module.exports = { readData, writeData };