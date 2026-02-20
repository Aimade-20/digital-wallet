const http = require("http");
const userRoutes = require("./routes/userRoutes");

const server = http.createServer((req, res) => {
  userRoutes(req, res);
});

server.listen(3000, () => {
  console.log("Server running on port 3000");
});