const express = require("express")
const cors = require("cors")
const mysql = require("mysql2")


const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "minieye",
  database: "books"
})


const app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extends: true }))



app.get("/", (req, res) => {
  res.send("Hi There")
})

app.get("/get", (req, res) => {
  const selectQuery = "select * from books_reviews"
  db.query(selectQuery, (err, result) => {
    res.send(result)
  })
})

app.post("/insert", (req, res) => {
  const bookName = req.body.setBookName;
  const bookReview = req.body.setReview;
  const InsertQuery = "INSERT INTO books_reviews (book_name, book_review) VALUES (?, ?)";
  db.query(InsertQuery, [bookName, bookReview], (err, result) => {
    console.log(result)
  })
})

app.delete("/delete/:bookId", (req, res) => {
  const bookId = req.params.bookId;
  const DeleteQuery = "DELETE FROM books_reviews WHERE id = ?";
  db.query(DeleteQuery, bookId, (err, result) => {
    if (err) console.log(err);
  })
})

app.put("/update/:bookId", (req, res) => {
  const bookReview = req.body.reviewUpdate;
  const bookId = req.params.bookId;
  const UpdateQuery = "UPDATE books_reviews SET book_review = ? WHERE id = ?";
  db.query(UpdateQuery, [bookReview, bookId], (err, result) => {
    if (err) console.log(err)
  })
})


app.listen('3001', () => { })