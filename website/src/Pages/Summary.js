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
        <button onClick={getSummary}>Testing</button>
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
                if (val.Hotel_Accom == 1) {
                  return <div>Hotel Accommodations: True</div>;
                } else {
                  return <div>Hotel Accommodations: False</div>;
                }
              })()}
              {(() => {
                if (val.Condo_Accom == 1) {
                  return <div>Condo Accommodations: True</div>;
                } else {
                  return <div>Condo Accommodations: False</div>;
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
