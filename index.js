const express = require("express");
const app = express();
const mysql = require("mysql2");
const PORT = process.env.PORT || 3001;
const cors = require("cors");

let query_file = "SELECT * FROM file";
let query_mail = "INSERT INTO form (name, email, phone) VALUES (?,?,?)";

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: "sql8.freesqldatabase.com",
  user: "sql8581891",
  database: "sql8581891",
  password: "bbHiSeZJzk",
});

app.get("/file", (req, res) => {
  db.query(query_file, (err, result) => {
    if (err) {
      console.error("Warning: " + err.message);
    } else {
      res.send(result);
    }
  });
});

app.post("/mail", (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const phone = req.body.phone;

  db.query(query_mail, [name, email, phone], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send("Values Inserted");
    }
  });
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
