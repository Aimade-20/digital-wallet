
const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname,"..","Data","users.json");

 function readData() {
  try{
    const raw = fs.readFileSync(filePath, "utf-8");
    if(!raw || raw.trim()===''){
      return []
    }
    return JSON.parse(raw);
  }catch(err){
    throw err;
  }
}

async function writeData(data) {
 await fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

module.exports = { readData, writeData };