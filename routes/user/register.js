const express = require("express");
const router = express.Router();
const db = require("../../lib/db");

router.post("/", (req, res) => {
  const { id, password, name, email } = req.body;
  const created_at = Date.now();

  // 회원가입 로직을 구현합니다
  // DB에 사용자 정보를 저장하고 응답을 클라이언트에게 보냅니다
  db.query(
    "INSERT INTO user (user_id,user_password,user_name,user_email,crated_at) VALUES (?,?,?,?,?)",
    [id, password, name, email, created_at],
    (err, results) => {
      if (err) {
        console.error("회원가입 오류: " + err.message);
        res.status(500).json({ error: "회원가입 중 오류가 발생했습니다." });
      } else {
        console.log("회원가입 성공");
        res.status(200).json({ message: "회원가입이 완료 되었습니다." });

        db.end((endErr) => {
          if (endErr) {
            console.error("MySQL 연결 종료 오류: " + endErr.message);
          } else {
            console.log("MySql 연결 종료");
          }
        });
      }
    }
  );
});

module.exports = router;
