const express = require("express");
const router = express.Router();
const db = require("../../lib/db");
// 게시판 글목록 보여주기 route
router.get("/", (req, res) => {
  db.query("SELECT * FROM BOARD", (err, results) => {
    if (err) {
      console.error("게시글 목록 불러오기 오류" + err.message);
      res
        .status(500)
        .json({ error: "게시글 목록 불러오는 중 오류가 발생했습니다." });
    } else {
      console.log("게시글 목록 불러오기 성공");
      res.status(200).json({
        message: "게시글 목록 불러오기 완료 되었습니다.",
        posts: results,
      });
    }
  });
});
// 게시글 하나에 대한 정보
router.get("/:id", (req, res) => {
  const postId = req.params.id; // URL에서 동적 매개변수로부터 게시글 ID 추출

  db.query("SELECT * FROM BOARD WHERE id = ?", [postId], (err, results) => {
    if (err) {
      console.error("게시글 불러오기 오류: " + err.message);
      res
        .status(500)
        .json({ error: "게시글 불러오는 중 오류가 발생했습니다." });
    } else {
      if (results.length > 0) {
        console.log("게시글 불러오기 성공");
        res.status(200).json({
          message: "게시글 불러오기 완료 되었습니다.",
          post: results[0], // 결과는 배열로 반환되므로 첫 번째 요소를 반환
        });
      } else {
        console.log("게시글을 찾을 수 없음");
        res.status(404).json({ error: "게시글을 찾을 수 없습니다." });
      }
    }
  });
});

// 게시판 글작성 route
router.post("/create", (req, res) => {
  const { title, content } = req.body;
  const created_at = new Date();
  const author = "no_name";

  db.query(
    "INSERT INTO board (title,content,author,created_at) VALUES (?,?,?,?)",
    [title, content, author, created_at],
    (err, results) => {
      if (err) {
        console.error("게시글 작성 오류: " + err.message);
        res.status(500).json({ error: "게시글작성 중 오류가 발생했습니다." });
      } else {
        console.log("게시글 작성 성공");
        res.status(200).json({ message: "게시글작성이 완료 되었습니다." });

        // db.end((endErr) => {
        //   if (endErr) {
        //     console.error("MySQL 연결 종료 오류: " + endErr.message);
        //   } else {
        //     console.log("MySql 연결 종료");
        //   }
        // });
      }
    }
  );
});
module.exports = router;
