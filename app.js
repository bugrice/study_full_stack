import express from "express";
import mysql from "mysql2/promise";

//db 접속 정보를 적는 코드..
const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "todo",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

const app = express();
app.use(express.json());
const port = 3000;

// 쿼리 실행문.. pool query 에는 await 을 붙이고 함수에 await을 붙임.
app.get("/todo", async (req, res) => {
  const [rows] = await pool.query("SELECT * FROM task ORDER BY id DESC");

  res.json(rows);
});
  
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

// task 데이터의 아이디 검색
app.get("/todo/:id", async (req, res) => {
    const { id }  = req.params;
    const [rows] = await pool.query("SELECT * FROM task WHERE id = ?",[
        id,
    ]);
  
    if( rows.length ==0){
        res.status(404).send('not found');
        return;
    }

    res.json(rows[0]);
  });

  // task 테이블에 데이터 추가
  app.post("/todo", async (req, res) => {
    const { title, description } = req.body;
  
    if( !title ){
        res.status(400).json({
          resultCode: "F-1",
            msg: "title required"
        });
        return;
    }

    if( !description ){
        res.status(400).json({
          resultCode: "F-1",
            msg: "description required"
        });
        return;
    }

    const [rs] = await pool.query(
        `
        INSERT INTO task
        SET user_id = 1,
        title = ?,
        description = ?,
        is_completed = FALSE,
        created_date = Now(),
        updated_date = Now()
        `,
        [title, description]
        );
    
    res.status(201).json({
        resultCode: "S-1",
        msg: `${rs.insertId}번 할일을 생성하였습니다.`,
        data: rs
    });
  });

  app.delete("/todo/:id", async (req, res) => {
    const { id } = req.params;
  
    const [rows] = await pool.query("SELECT * FROM task WHERE id = ?", [
      id,
    ]);
  
    if (rows.length == 0) {
      res.status(404).send("not found");
      return;
    }
  
    const [rs] = await pool.query(
      `
      DELETE FROM task
      WHERE id = ?
      `,
      [id]
    );
  
    res.status(200).json({
      resultCode: "S-1",
      msg: `${id}번 할일을 삭제하였습니다.`
    });
  });
  
  app.patch("/todo/:id", async (req, res) => {
    const { id } = req.params;
  
    const { description, is_completed } = req.body;
  
    const [rows] = await pool.query("SELECT * FROM task WHERE id = ?", [
      id,
    ]);
  
    if (rows.length == 0) {
      res.status(404).send("not found");
      return;
    }
  
    if (!description) {
      res.status(400).json({
        resultCode: "F-1",
        msg: "description required",
      });
      return;
    }
  
    if (!is_completed) {
      res.status(400).json({
        resultCode: "F-1",
        msg: "is_completed required",
      });
      return;
    }
  
    const [rs] = await pool.query(
      `
      UPDATE task
      SET description = ?,
      is_completed = ?,
      updated_date = NOW()
      WHERE id = ?
      `,
      [description, is_completed, id]
    );
  
    res.status(200).json({
      resultCode: "S-1",
      msg: "성공",
      data: rs,
    });
  });