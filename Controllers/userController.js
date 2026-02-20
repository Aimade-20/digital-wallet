const { readData, writeData } = require("../data/store");

// get all users
function getAllUsers(req, res) {
  const data = readData();

  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify(data.users));
}

// create user
function createUser(req, res) {
  let body = "";

  req.on("data", (chunk) => {
    body += chunk;
  });

  req.on("end", () => {
    const { name } = JSON.parse(body);
    
    const newUser = {
      id: Date.now(),
      name,
    };
    const data = readData();

    data.push(newUser);
    writeData(data);
    res.writeHead(201);
    res.end(JSON.stringify(data))
  });
}

// update user
function updateUser(req, res, id) {
  let body = "";

  req.on("data", (chunk) => {
    body += chunk;
  });

  req.on("end", () => {
    const { name } = JSON.parse(body);
    const data = readData();

    if (!name) {
      res.writeHead(400, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: "Enter Name" }));
    }

    const updatedUser = data.users.find((user) => user.id === id);
    if (!updatedUser) {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: "User not found" }));
      return;
    }

    updatedUser.name = name;
    writeData(data);

    res.writeHead(201, { "Content-Type": "application/json" });
    res.end(JSON.stringify(updatedUser));
  });
}

// delete user
function deleteUser(req, res, id) {
  let data = readData();

  data.users = data.users.filter((user) => user.id !== id);
  writeData(data);

  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify(data.users));
}

module.exports = { getAllUsers, createUser, updateUser, deleteUser };
