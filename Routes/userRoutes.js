const {
  getAllUsers,
  createUser,
  updateUser,
  deleteUser
} = require("../Controllers/userController");

const {
  getWallets,
  createWallet,
  deposit,
  withdraw
} = require("../Controllers/walletController");

function userRoutes(req, res) {
  // ========== Users ==========
  if (req.method === "GET" && req.url === "/users")
    return getAllUsers(req, res);

  if (req.method === "POST" && req.url === "/users")
    return createUser(req, res);

  if (req.method === "PUT" && req.url.startsWith("/users/")) {
    const id = req.url.split("/")[2];
    return updateUser(req, res, id);
  }

  if (req.method === "DELETE" && req.url.startsWith("/users/")) {
    const id = req.url.split("/")[2];
    return deleteUser(req, res, id);
  }

  // ========== Wallets ==========
  if (req.method === "GET" && req.url === "/wallets") {
    const wallets = getWallets();
    res.writeHead(200, { "Content-Type": "application/json" });
    return res.end(JSON.stringify(wallets));
  }

  if (req.method === "POST" && req.url === "/wallets")
    return createWallet(req, res);

  // /wallets/:id/deposit
  if (req.method === "POST" && req.url.match(/^\/wallets\/[^/]+\/deposit$/)) {
    const wallet_id = req.url.split("/")[2];
    return deposit(req, res, wallet_id);
  }

  // /wallets/:id/withdraw
  if (req.method === "POST" && req.url.match(/^\/wallets\/[^/]+\/withdraw$/)) {
    const wallet_id = req.url.split("/")[2];
    return withdraw(req, res, wallet_id);
  }

  // ========== 404 ==========
  res.writeHead(404, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ error: "Route not found" }));
}

module.exports = userRoutes;