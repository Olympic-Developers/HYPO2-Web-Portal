const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  user: "admin_hypo",
  host: "database-1.caabureps5is.us-west-1.rds.amazonaws.com",
  password: "sCuxOyRJEr06qTWs8x5w",
  database: "Intake",
});

app.post("/intake", (req, res) => {
  const teamName = req.body.teamName;
  const startDate = req.body.startDate;
  const endDate = req.body.endDate;
  const numPerson = req.body.numPerson;
  const country = req.body.country;

  db.query(
    "INSERT INTO GeneralIntake(Team_Name, Camp_Date_Start, Camp_Date_End, Num_Personnel, Country) VALUES (?, ?, ?, ?, ?)",
    [teamName, startDate, endDate, numPerson, country],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Values Inserted");
      }
    }
  );
});

app.get("/summary", (req, res) => {
  db.query("SELECT * FROM GeneralIntake", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});
app.listen(3001, () => {
  console.log("yay, your server is running on port 3001");
});
