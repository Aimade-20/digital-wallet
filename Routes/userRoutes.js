const {
  getAllUsers,
  createUser,
  updateUser,
  deleteUser
} = require("../Controllers/userController");
function userRoutes(req, res) {
  if (req.method === "GET" && req.url === "/users") return getAllUsers(req, res);
  if (req.method === "POST" && req.url === "/users") return createUser(req, res);
  if (req.method === "PUT" && req.url.startsWith("/users/")) {
    const id = req.url.split("/")[2];
    return updateUser(req, res, id);
  }
  if (req.method === "DELETE" && req.url.startsWith("/users/")) {
    const id = req.url.split("/")[2];
    return deleteUser(req, res, id);
  }

  res.writeHead(404, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ error: "Route not found" }));
}
module.exports = userRoutes;
