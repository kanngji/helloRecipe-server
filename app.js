const express = require("express");
const app = express();
const port = 4000; // server port number

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(port, () => {
  console.log("server is running");
});
