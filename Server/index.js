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
  const contactName = req.body.contactName;
  const contactEmail = req.body.contactEmail;
  const contactPhone = req.body.contactPhone;
  const onSiteName = req.body.onSiteName;
  const onSiteEmail = req.body.onSiteEmail;
  const onSitePhone = req.body.onSitePhone;

  const hotelAccom = req.body.hotelAccom;
  const condoAccom = req.body.condoAccom;
  const univCafeteria = req.body.univCafeteria;
  const catering = req.body.catering;
  const charterTransport = req.body.charterTransport;
  const indivShuttle = req.body.indivShuttle;
  const rental = req.body.rental;
  const permit = req.body.permit;
  const pool50M = req.body.pool50M;
  const track400M = req.body.track400M;
  const track300M = req.body.track300M;
  const gym = req.body.gym;
  const outdoorFieldGrass = req.body.outdoorFieldGrass;
  const outdoorFieldTurf = req.body.outdoorFieldTurf;
  const indoorFieldTurf = req.body.indoorFieldTurf;
  const courtSpace = req.body.courtSpace;
  const courtUsage = req.body.courtUsage;
  const antiGravTread = req.body.antiGravTread;

  db.query(
    "INSERT INTO GeneralIntake(Team_Name, Camp_Date_Start, Camp_Date_End, Num_Personnel, Country, Contact_Name, Contact_Email, Contact_Phone, OnSite_Name, OnSite_Email, OnSite_Phone) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
    [
      teamName,
      startDate,
      endDate,
      numPerson,
      country,
      contactName,
      contactEmail,
      contactPhone,
      onSiteName,
      onSiteEmail,
      onSitePhone,
    ],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Values Inserted");
      }
    }
  );

  db.query(
    "INSERT INTO CoreCampNeeds (Team_Name, Hotel_Accom, Condo_Accom, Univ_Cafeteria, Catering, charter_transport, Indiv_shuttle, Rental, Pool50M, Track400M, Track300M, Gym, OutdoorFieldGrass, OutdoorFieldTurf, IndoorFieldTurf, CourtSpace, CourtUsage, AntiGravTread)VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
    [
      teamName,
      hotelAccom,
      condoAccom,
      univCafeteria,
      catering,
      charterTransport,
      indivShuttle,
      rental,
      pool50M,
      track400M,
      track300M,
      gym,
      outdoorFieldGrass,
      outdoorFieldTurf,
      indoorFieldTurf,
      courtSpace,
      courtUsage,
      antiGravTread,
    ],
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
