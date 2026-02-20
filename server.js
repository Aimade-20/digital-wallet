const http = require("http");
const userRoutes = require("./routes/userRoutes");
const { log } = require("console");

const server = http.createServer((req, res) => {
  // try user routes first
  if (userRoutes(req, res) !== null) return;
  console.log(req.url);
  
  if(req.url.startsWith("/users")){
    return userRoutes(req,res)
  }

  res.writeHead(404, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ error: "Route not found" }));
});

server.listen(3000, () => console.log("Server running on port 3000"));
