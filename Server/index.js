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
  const massageTherapy = req.body.massageTherapy;
  const physioTherapy = req.body.physioTherapy;
  const strengthCond = req.body.strengthCond;
  const orthoCare = req.body.orthoCare;
  const primMedCare = req.body.primMedCare;
  const hemoTest = req.body.hemoTest;
  const compBloodProf = req.body.compBloodProf;
  const metaPanel = req.body.metaPanel;
  const TBIC = req.body.TBIC;
  const creatineKinase = req.body.creatineKinase;
  const VO2Lactate = req.body.VO2Lactate;
  const VO2Thresh = req.body.VO2Thresh;
  const LactateThresh = req.body.LactateThresh;
  const suppO2 = req.body.suppO2;
  const intTrainDietAnalysis = req.body.intTrainDietAnalysis;
  const nutritionGroupPresWS = req.body.nutritionGroupPresWS;
  const individualPyschConsult = req.body.individualPyschConsult;
  const pyschGroupPresWS = req.body.pyschGroupPresWS;
  const focusSession = req.body.focusSession;
  const meetingSpace = req.body.meetingSpace;
  const equipStored = req.body.equipStored;
  const dayTripExcur = req.body.dayTripExcur;
  const teamBuildExcer = req.body.teamBuildExcer;
  const otherInfo = req.body.otherInfo;
  const other = req.body.other;
  const Status = req.body.status;

  const hotelAccomInfo = req.body.hotelAccomInfo;
  const condoAccomInfo = req.body.condoAccomInfo;
  const univCafeteriaInfo = req.body.univCafeteriaInfo;
  const cateringInfo = req.body.cateringInfo;
  const charterTransportInfo = req.body.charterTransportInfo;
  const indivShuttleInfo = req.body.indivShuttleInfo;
  const rentalInfo = req.body.rentalInfo;
  const permitInfo = req.body.permitInfo;
  const track400Info = req.body.track400Info;
  const track300Info = req.body.track300Info;
  const gymInfo = req.body.gymInfo;
  const OFGInfo = req.body.OFGInfo;
  const OFTInfo = req.body.OFTInfo;
  const IFTInfo = req.body.IFTInfo;
  const AGTInfo = req.body.AGTInfo;
  const massageInfo = req.body.massageInfo;
  const physioInfo = req.body.physioInfo;
  const strengthInfo = req.body.strengthInfo;
  const orthoInfo = req.body.orthoInfo;
  const primMedInfo = req.body.primMedInfo;
  const hemoInfo = req.body.hemoInfo;
  const compBloodInfo = req.body.compBloodInfo;
  const metaInfo = req.body.metaInfo;
  const TBICInfo = req.body.TBICInfo;
  const creatineKinaseInfo = req.body.creatineKinaseInfo;
  const VO2LactateInfo = req.body.VO2LactateInfo;
  const VO2ThreshInfo = req.body.VO2ThreshInfo;
  const LactateThreshInfo = req.body.LactateThreshInfo;
  const suppO2Info = req.body.suppO2Info;
  const dietAnalysisInfo = req.body.dietAnalysisInfo;
  const nutritionWSInfo = req.body.nutritionWSInfo;
  const psychConsultInfo = req.body.psychConsultInfo;
  const psychWSInfo = req.body.psychWSInfo;
  const focusInfo = req.body.focusInfo;
  const meetingInfo = req.body.meetingInfo;
  const equipInfo = req.body.equipInfo;
  const dayTripInfo = req.body.dayTripInfo;
  const teamBuildInfo = req.body.teamBuildInfo;
  const otherInfoText = req.body.otherInfoText;
  const otherText = req.body.otherInfoText;

  db.query(
    "INSERT INTO GeneralIntake(Team_Name, Camp_Date_Start, Camp_Date_End, Num_Personnel, Country, Contact_Name, Contact_Email, Contact_Phone, OnSite_Name, OnSite_Email, OnSite_Phone, Status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);",
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
      Status,
    ],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        console.log("Values Inserted");
      }
    }
  );

  db.query(
    "INSERT INTO CoreCampNeeds (Team_Name, Hotel_Accom, Condo_Accom, Univ_Cafeteria, Catering, charter_transport, Indiv_shuttle, Rental, permit, Pool50M, Track400M, Track300M, Gym, OutdoorFieldGrass, OutdoorFieldTurf, IndoorFieldTurf, CourtSpace, CourtUsage, AntiGravTread)VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
    [
      teamName,
      hotelAccom,
      condoAccom,
      univCafeteria,
      catering,
      charterTransport,
      indivShuttle,
      rental,
      permit,
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
        console.log("Values Inserted");
      }
    }
  );

  db.query(
    "INSERT INTO AdditionalServices (Team_Name, Massage_Therapy, Physio_Therapy, Strength_Cond, Ortho_Care, Prim_Med_Care, Hemo_Test, Comp_Blood_Prof, Meta_Panel, TIBC, Creatine_Kinase, other, VO2_Lactate, VO2_Thresh, Lactate_Thresh, Supp_O2, Int_train_diet_analysis, Nutrition_Group_Pres_WS, Indiv_Pysch_consult, Pysch_Group_Pres_WS, Meeting_Space, Equip_Stored, Day_trip_Excur, Team_Build_Excer, otherInfo)VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
    [
      teamName,
      massageTherapy,
      physioTherapy,
      strengthCond,
      orthoCare,
      primMedCare,
      hemoTest,
      compBloodProf,
      metaPanel,
      TBIC,
      creatineKinase,
      other,
      VO2Lactate,
      VO2Thresh,
      LactateThresh,
      suppO2,
      intTrainDietAnalysis,
      nutritionGroupPresWS,
      individualPyschConsult,
      pyschGroupPresWS,
      meetingSpace,
      equipStored,
      dayTripExcur,
      teamBuildExcer,
      otherInfo,
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
    "INSERT INTO IntakeInfo(Team_Name, hotelAccomInfo, condoAccomInfo, cafeteriaInfo, cateringInfo, charterInfo, shuttleInfo, rentalInfo, permitInfo, track400Info, track300Info, gymInfo, OFGInfo, OFTInfo, IFTInfo, AGTInfo, massageInfo, physioInfo, strengthInfo, orthoInfo, primMedInfo, hemoInfo, compBloodInfo, metaInfo, TIBCInfo, creatineKinaseInfo, otherText, VO2LactateInfo, VO2ThreshInfo, LactateThreshInfo, suppO2Info, dietAnalysisInfo, nutritionWSInfo, psychConsultInfo, psychWSInfo, focusInfo, meetingInfo, equipInfo, dayTripInfo, teamBuildInfo, otherInfoText) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);",
    [
      teamName,
      hotelAccomInfo,
      condoAccomInfo,
      univCafeteriaInfo,
      cateringInfo,
      charterTransportInfo,
      indivShuttleInfo,
      rentalInfo,
      permitInfo,
      track400Info,
      track300Info,
      gymInfo,
      OFGInfo,
      OFTInfo,
      IFTInfo,
      AGTInfo,
      massageInfo,
      physioInfo,
      strengthInfo,
      orthoInfo,
      primMedInfo,
      hemoInfo,
      compBloodInfo,
      metaInfo,
      TBICInfo,
      creatineKinaseInfo,
      otherText,
      VO2LactateInfo,
      VO2ThreshInfo,
      LactateThreshInfo,
      suppO2Info,
      dietAnalysisInfo,
      nutritionWSInfo,
      psychConsultInfo,
      psychWSInfo,
      focusInfo,
      meetingInfo,
      equipInfo,
      dayTripInfo,
      teamBuildInfo,
      otherInfoText,
    ],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        console.log("Values Inserted");
      }
    }
  );
});

app.get("/Summary", (req, res) => {
  let username = req.query.username;
  db.query(
    `SELECT * FROM GeneralIntake Join CoreCampNeeds ON GeneralIntake.Camp_ID = CoreCampNeeds.Camp_ID Join AdditionalServices ON GeneralIntake.Camp_ID = AdditionalServices.Camp_ID JOIN IntakeInfo ON GeneralIntake.Camp_ID = IntakeInfo.Camp_ID where GeneralIntake.Team_Name = "${username}" ORDER BY GeneralIntake.Camp_ID DESC LIMIT 1`,
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.get("/AllCamps", (req, res) => {
  db.query("SELECT * FROM GeneralIntake", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.get("/UserCamps", (req, res) => {
  let username = req.query.username;

  db.query(
    `SELECT * FROM GeneralIntake WHERE Team_Name = "${username}"`,
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        console.log(result.userName);
        res.send(result);
      }
    }
  );
});

app.get("/CampInfo", (req, res) => {
  let id = req.query.id;

  db.query(
    `SELECT * FROM GeneralIntake Join CoreCampNeeds ON GeneralIntake.Camp_ID = CoreCampNeeds.Camp_ID Join AdditionalServices ON GeneralIntake.Camp_ID = AdditionalServices.Camp_ID JOIN IntakeInfo ON GeneralIntake.Camp_ID = IntakeInfo.Camp_ID WHERE GeneralIntake.Camp_ID = "${id}"`,
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.get("/Prices", (req, res) => {
  db.query("SELECT * FROM BillingIntake", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.post("/addEvent", (req, res) => {
  const Camp_ID = req.body.Camp_ID;
  const actClass = req.body.actClass;
  const actStartTime = req.body.actStartTime;
  const actEndTime = req.body.actEndTime;
  const price = req.body.price;
  const attendees = req.body.attendees;
  const title = req.body.title;
  const comment = req.body.comment;

  db.query(
    "INSERT INTO ScheduleTable VALUES (?,?,?,?,?,?,?,?);",
    [
      Camp_ID,
      actClass,
      actStartTime,
      actEndTime,
      price,
      attendees,
      title,
      comment,
    ],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.get("/getAllEvent", (req, res) => {
  db.query("SELECT * FROM ScheduleTable", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.get("/getUserEvent", (req, res) => {
  let id = req.query.id;
  db.query(
    `SELECT * FROM ScheduleTable WHERE CAMP_ID = "${id}"`,
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.post("/sendPrice", (req, res) => {
  const newPrice = req.body.newPrice;
  const colName = req.body.colName;

  db.query(
    `UPDATE BillingIntake SET ${colName} = ${newPrice} WHERE CAMP_ID = 0;`,
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.listen(3001, () => {
  console.log("yay, your server is running on port 3001");
});
