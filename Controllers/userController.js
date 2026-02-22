

const { readData, writeData } = require("../dataStor/store");

// get all users
function getAllUsers(req, res) {
  const data = readData();
  if (!data.users) data.users = []; 
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify(data.users));
}

// create user
function createUser(req, res) {
    const data = readData();
  if (!data.users) data.users = []; 
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
    data.users.push(newUser);
    writeData(data);
    res.writeHead(201);
    res.end(JSON.stringify(data));
  });
}

// update user
function updateUser(req, res, id) {
    const data = readData();
  if (!data.users) data.users = []; 
  let body = "";

  req.on("data", (chunk) => {
    body += chunk;
  });

  req.on("end", () => {
    const { name } = JSON.parse(body);

    if (!name) {
      res.writeHead(400, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: "Enter Name" }));
      return;
    }

    const userId = Number(id);
    const updatedUser = data.users.find((user) => user.id === userId);
    if (!updatedUser) {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: "User not found" }));
      return;
    }

    updatedUser.name = name;
    writeData(data);

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(updatedUser));
  });
}

// delete user
function deleteUser(req, res, id) {
  let data = readData();
  if (!data.users) data.users = [];

  const userId = Number(id);
  const userExists = data.users.some((user) => user.id === userId);

  if (!userExists) {
    res.writeHead(404);
    return res.end("User not found");
  }

  data.users = data.users.filter((user) => user.id !== userId);
  writeData(data);

  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify(data.users));
}

module.exports = { getAllUsers, createUser, updateUser, deleteUser };
