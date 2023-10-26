const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const port = 3001; // server port number
const db = require("./lib/db.js");
const router = express.Router();

// routes 연결
const usersRoute = require("./routes/user/index.js");

app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/", router);
app.use("/user", usersRoute);

db.connect();
app.listen(port, () => {
  console.log("server is running");
});
