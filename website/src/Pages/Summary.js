import React, { useState, useEffect } from "react";
import "../Style pages/IntakeStyle.css";
import Axios from "axios";
import { authCheckClient } from "../Components/UserInfoAndAuth";
import { useNavigate } from "react-router-dom";
import { getSessionStorage } from "../Components/UserInfoAndAuth";

function Summary() {
  let navigate = useNavigate();

  useEffect(() => {
    authCheckClient(navigate);
    getSummary();
  });

  const [sumList, setSumList] = useState([]);

  const getSummary = () => {
    Axios.get("http://localhost:3001/Summary").then((response) => {
      setSumList(response.data);
    });
  };

  if (
    getSessionStorage("authenticated") === "true" &&
    getSessionStorage("classification").toLowerCase() === "client"
  ) {
    return (
      <div>
        {sumList.map((val, key) => {
          return (
            <div>
              <h1>Camp Summary</h1>
              <h3>General Information</h3>
              <div>Team Name: {val.Team_Name}</div>
              <div>Camp Start: {val.Camp_Date_Start}</div>
              <div>Camp End: {val.Camp_Date_End}</div>
              <div>Number of Personnel: {val.Num_Personnel}</div>
              <div>Country: {val.Country}</div>
              <div>Contact: {val.Contact_Name}</div>
              <div>Email: {val.Contact_Email}</div>
              <div>Phone: {val.Contact_Phone}</div>
              <div>On Site Contact: {val.OnSite_Name}</div>
              <div>On Site Email: {val.OnSite_Email}</div>
              <div>On Site Phone: {val.OnSite_Phone}</div>
              <h3>Core Camp Needs</h3>
              {(() => {
                if (val.Hotel_Accom === 1) {
                  return <div>Hotel Accommodations: True</div>;
                } else {
                  return <div>Hotel Accommodations: False</div>;
                }
              })()}
              {(() => {
                if (val.Condo_Accom === 1) {
                  return <div>Condo Accommodations: True</div>;
                } else {
                  return <div>Condo Accommodations: False</div>;
                }
              })()}
              {(() => {
                if (val.Univ_Cafeteria === 1) {
                  return <div>University Cafeteria: True</div>;
                } else {
                  return <div>University Cafeteria: False</div>;
                }
              })()}
              {(() => {
                if (val.Catering === 1) {
                  return <div>Catering: True</div>;
                } else {
                  return <div>Catering: False</div>;
                }
              })()}
              {(() => {
                if (val.Catering === 1) {
                  return <div>Catering: True</div>;
                } else {
                  return <div>Catering: False</div>;
                }
              })()}
              {(() => {
                if (val.charter_transport === 1) {
                  return <div>Charter Transport: True</div>;
                } else {
                  return <div>Charter Transport: False</div>;
                }
              })()}
              {(() => {
                if (val.Indiv_Shuttle === 1) {
                  return <div>Individual Shuttle: True</div>;
                } else {
                  return <div>Individual Shuttle: False</div>;
                }
              })()}
              {(() => {
                if (val.Rental === 1) {
                  return <div>Rental: True</div>;
                } else {
                  return <div>Rental: False</div>;
                }
              })()}
              {(() => {
                if (val.permit === 1) {
                  return <div>University Parking Permit: True</div>;
                } else {
                  return <div>University Paring Permit: False</div>;
                }
              })()}
              <h4> Facilities</h4>
              <div>50M Aquatic Center Lanes: {val.Pool50M}</div>
              {(() => {
                if (val.Track400M === 1) {
                  return <div>Track 400M: True</div>;
                } else {
                  return <div>Track 400M: False</div>;
                }
              })()}
              {(() => {
                if (val.Track300M === 1) {
                  return <div>Track 300M: True</div>;
                } else {
                  return <div>Track 300M: False</div>;
                }
              })()}
              {(() => {
                if (val.Gym === 1) {
                  return <div>Gym: True</div>;
                } else {
                  return <div>Gym: False</div>;
                }
              })()}
              {(() => {
                if (val.OutdoorFieldGrass === 1) {
                  return <div>Outdoor Grass Field: True</div>;
                } else {
                  return <div>Outdoor Grass Field: False</div>;
                }
              })()}
              {(() => {
                if (val.OutdoorFieldTurf === 1) {
                  return <div>Outdoor Turf Field: True</div>;
                } else {
                  return <div>Outdoor Turf Field: False</div>;
                }
              })()}
              {(() => {
                if (val.IndoorFieldTurf === 1) {
                  return <div>Indoor Turf Field: True</div>;
                } else {
                  return <div>Indoor Turf Field: False</div>;
                }
              })()}
              {(() => {
                if (val.CourtSpace === 1) {
                  return <div>Court Space: True</div>;
                } else {
                  return <div>Court Space: False</div>;
                }
              })()}
              <div>Court Usage: {val.CourtUsage}</div>
              {(() => {
                if (val.AntiGravTread === 1) {
                  return <div>Anti-Gravity Treadmill: True</div>;
                } else {
                  return <div>Anti-gravity Treadmill: False</div>;
                }
              })()}
              <h3> Additional Services </h3>
              {(() => {
                if (val.Massage_Therapy === 1) {
                  return <div>Massage Therapy: True</div>;
                } else {
                  return <div>Massage Therapy: False</div>;
                }
              })()}
              {(() => {
                if (val.Physio_Therapy === 1) {
                  return <div>Physio Therapy: True</div>;
                } else {
                  return <div>Physio Therapy: False</div>;
                }
              })()}
              {(() => {
                if (val.Strength_Cond === 1) {
                  return <div>Strength and Conditioning: True</div>;
                } else {
                  return <div>Strength and Conditioning: False</div>;
                }
              })()}
              {(() => {
                if (val.Ortho_Care === 1) {
                  return <div>Orthopedic Care: True</div>;
                } else {
                  return <div>Orthopedic Care: False</div>;
                }
              })()}
              {(() => {
                if (val.Prim_Med_Care === 1) {
                  return <div>Primary Medical Care: True</div>;
                } else {
                  return <div>Primary Medical Care: False</div>;
                }
              })()}
              <h4>Blood Testing / Biomarkers</h4>
              {(() => {
                if (val.Hemo_Test === 1) {
                  return <div>Hemoglobin Test: True</div>;
                } else {
                  return <div>Hemoglobin Test: False</div>;
                }
              })()}
              {(() => {
                if (val.Comp_Blood_Prof === 1) {
                  return <div>Complete Blood Profile: True</div>;
                } else {
                  return <div>Complete Blood Profile: False</div>;
                }
              })()}
              {(() => {
                if (val.Meta_Panel === 1) {
                  return <div>Metabolism Panel: True</div>;
                } else {
                  return <div>Metabolism Panel: False</div>;
                }
              })()}
              {(() => {
                if (val.TIBC === 1) {
                  return <div>TIBC: True</div>;
                } else {
                  return <div>TIBC: False</div>;
                }
              })()}
              {(() => {
                if (val.Creatine_Kinase === 1) {
                  return <div>Creatine Kinase Test: True</div>;
                } else {
                  return <div>Creatine Kinase Test: False</div>;
                }
              })()}
              <div>{val.other}</div>
              <h4>Physiological Testing</h4>
              {(() => {
                if (val.VO2_Lactate === 1) {
                  return <div>VO2 Lactate Test: True</div>;
                } else {
                  return <div>VO2 Lactate Test: False</div>;
                }
              })()}
              {(() => {
                if (val.VO2_Thresh === 1) {
                  return <div>VO2 Threshold Test: True</div>;
                } else {
                  return <div>VO2 Threshold Test: False</div>;
                }
              })()}
              {(() => {
                if (val.Lactate_Thresh === 1) {
                  return <div>Lactate Threshold Test: True</div>;
                } else {
                  return <div>Lactate Threshold Test: False</div>;
                }
              })()}
              {(() => {
                if (val.Supp_O2 === 1) {
                  return <div>Supplemental O2: True</div>;
                } else {
                  return <div>Supplemental O2: False</div>;
                }
              })()}
              <h4>Sports Nutrition</h4>
              {(() => {
                if (val.Int_train_diet_analysis === 1) {
                  return (
                    <div>Integrated training and dietary analysis: True</div>
                  );
                } else {
                  return (
                    <div>Integrated training and dietary analysis: False</div>
                  );
                }
              })()}
              {(() => {
                if (val.Nutrition_Group_Pres_WS === 1) {
                  return <div>Nutrition Group Presentation Workshop: True</div>;
                } else {
                  return (
                    <div>Nutrition Group Presentation Workshop: False</div>
                  );
                }
              })()}
              <h4>Sport Psychology / Mental Performance</h4>
              {(() => {
                if (val.Indiv_Pysch_consult === 1) {
                  return <div>Individual Psych Consultation: True</div>;
                } else {
                  return <div>Individual Psych Consultation: False</div>;
                }
              })()}
              {(() => {
                if (val.Pysch_Group_Pres_WS === 1) {
                  return <div>Psych Group Presentation Workshop: True</div>;
                } else {
                  return <div>Psych Group Presentation Workshop: False</div>;
                }
              })()}
              {(() => {
                if (val.Meeting_Space === 1) {
                  return <div>Meeting Space: True</div>;
                } else {
                  return <div>Meeting Space: False</div>;
                }
              })()}
              {(() => {
                if (val.Equip_Stored === 1) {
                  return <div>Equipment Storage: True</div>;
                } else {
                  return <div>Equipment Storage: False</div>;
                }
              })()}
              {(() => {
                if (val.Day_Trip_Excur === 1) {
                  return <div>Day Trip Excursion: True</div>;
                } else {
                  return <div>Day Trip Excursion: False</div>;
                }
              })()}
              {(() => {
                if (val.Team_Build_Excer === 1) {
                  return <div>Team Building Exercise: True</div>;
                } else {
                  return <div>Team Building Exercise: False</div>;
                }
              })()}
              {(() => {
                if (val.otherInfo === 1) {
                  return <div>Other Information: True</div>;
                } else {
                  return <div>Other Information: False</div>;
                }
              })()}
            </div>
          );
        })}
      </div>
    );
  } else {
    return null;
  }
}

export default Summary;
