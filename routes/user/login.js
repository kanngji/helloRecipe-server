const express = require("express");
const router = express.Router();
const db = require("../../lib/db");

router.post("/", (req, res) => {
  const { id, password } = req.body;
  const query = "SELECT * FROM user WHERE user_id = ? AND user_password = ?";
  db.query(query, [id, password], (err, results) => {
    if (err) throw err;
    if (results.length > 0) {
      res.status(200).json({ message: "Login successful" });
    } else {
      res.status(401).json({ message: "Invalid credentials" });
    }
  });
});

module.exports = router;
