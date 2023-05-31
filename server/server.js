const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router("./db.json");

const path = require("path");
const express = require("express");

const middlewares = jsonServer.defaults();
const port = process.env.PORT || 3000;


server.use(middlewares);
server.use(router);

server.listen(port, () => {
  console.log(`JSON Server is running on port ${port}`);
});

const app = express();
const clientStatic = path.join(path.dirname(__dirname), "client");
const clientPort = process.env.PORT || 5000
app.use(express.static(clientStatic));
app.get("/", (req, res) => {
  res.sendFile(path.join(clientStatic, "index.html"));
});
app.listen(clientPort, ()=> { 
  console.log(`Client listenting to port: ${clientPort}`)
})

