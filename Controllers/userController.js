const { readData, writeData } = require('../dataStor/store.js');

function getUsers() {
  const data = readData('users.json');
  return Array.isArray(data) ? data : [];
}

function getAllUsers(req, res) {
  const users = getUsers();
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(users));
}

function createUser(req, res) {
  let body = '';
  req.on('data', chunk => body += chunk.toString());
  req.on('end', () => {
    let parsed;
    try {
      parsed = JSON.parse(body);
    } catch {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify({ error: 'Invalid JSON' }));
    }

    const { name } = parsed;
    if (!name) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify({ error: 'Name is required' }));
    }

    const users = getUsers();
    const newUser = { id: Date.now(), name };
    users.push(newUser);
    writeData('users.json', users);

    res.writeHead(201, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(newUser));
  });
}

function updateUser(req, res, id) {
  let body = '';
  req.on('data', chunk => body += chunk.toString());
  req.on('end', () => {
    let parsed;
    try {
      parsed = JSON.parse(body);
    } catch {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify({ error: 'Invalid JSON' }));
    }

    const { name } = parsed;
    if (!name) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify({ error: 'Name is required' }));
    }

    const users = getUsers();
    const user = users.find(u => u.id === Number(id));
    if (!user) {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify({ error: 'User not found' }));
    }

    user.name = name;
    writeData('users.json', users);

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(user));
  });
}

function deleteUser(req, res, id) {
  let users = getUsers();
  const userId = Number(id);
  const exists = users.some(u => u.id === userId);

  if (!exists) {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    return res.end(JSON.stringify({ error: 'User not found' }));
  }

  users = users.filter(u => u.id !== userId);
  writeData('users.json', users);

  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(users));
}

module.exports = { getUsers, getAllUsers, createUser, updateUser, deleteUser };