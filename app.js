const express = require("express");
const app = express();
const port = 4000; // server port number
const db = require("./lib/db.js");

app.get("/", (req, res) => {
  res.send("Hello World");
  connection.connect((err) => {
    if (err) {
      console.error("MySQL 연결 오류: " + err.stack);
      return;
    }
    console.log("MySQL 연결 성공, ID " + connection.threadId);
  });
  connection.end((err) => {
    if (err) {
      console.error("MySQL 연결 종료 오류: " + err.stack);
      return;
    }
    console.log("MySQL 연결 종료");
  });
});

app.listen(port, () => {
  console.log("server is running");
});
