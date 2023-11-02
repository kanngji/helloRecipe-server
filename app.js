require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const port = 3001; // server port number
const db = require("./lib/db.js");
const router = express.Router();

// routes 연결
const usersRoute = require("./routes/user/index.js");
const boardsRoute = require("./routes/board/index.js");

app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/api", router);
app.use("/api/user", usersRoute);
app.use("/api/board", boardsRoute);

db.connect();
app.listen(port, () => {
  console.log("server is running");
});
