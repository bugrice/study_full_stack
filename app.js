import express from "express";
import mysql from "mysql2/promise";

//db 접속 정보를 적는 코드..
const pool = mysql.createPool({
  host: "localhost",
  user: "sbsst",
  password: "sbs123414",
  database: "wise_saying",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

const app = express();
const port = 3000;

const wiseSayings = [
  {
    content: "나는 의적이다.",
    author: "홍길동",
  },
  {
    content: "나는 산적이다.",
    author: "임꺽정",
  },
];

// 쿼리 실행문.. pool query 에는 await 을 붙이고 함수에 await을 붙임.
app.get("/wise-sayings", async (req, res) => {
  const [rows] = await pool.query("SELECT * FROM wise_saying ORDER BY id DESC");

  res.json(rows);
});

app.get("/wise-sayings/:id", async (req, res) => {
    const { id }  = req.params;
    const [rows] = await pool.query("SELECT * FROM wise_saying WHERE id = ?",[
        id,
    ]);
  
    if( rows.length ==0){
        res.status(404).send('not found');
        return;
    }

    res.json(rows[0]);
  });

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});