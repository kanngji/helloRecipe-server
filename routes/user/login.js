const express = require("express");
const router = express.Router();
const db = require("../../lib/db");

// jwt 토큰 생성
const jwt = require("jsonwebtoken");

router.post("/", (req, res) => {
  const { id, password } = req.body;
  const query = "SELECT * FROM user WHERE user_id = ? AND user_password = ?";
  db.query(query, [id, password], (err, results) => {
    if (err) {
      res.status(500).json({ message: "Internal Server Error" });
      return;
    }
    if (results.length > 0) {
      const user = {
        id: results[0].user_id,
      };
      // JWT 토큰 생성 및 서명
      const token = jwt.sign(user, process.env.JWT_SECRET_KEY, {
        expiresIn: "1h",
      });

      res.status(200).json({
        message: "Login successful",
        user_id: id,

        token: token,
      });
    } else {
      res.status(401).json({ message: "Invalid credentials" });
    }
  });
});

module.exports = router;
