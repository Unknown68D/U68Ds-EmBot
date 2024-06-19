const express = require("express");
const server = express();
const port = 3000;

server.all("/", (req, res) => {
  res.send("<h1>U68D's EmBot is running!</h1>");
});

function keepAlive() {
  server.listen(process.env.PORT || port, () => {
    console.log("Server is ready.");
  });
}

module.exports = keepAlive;
