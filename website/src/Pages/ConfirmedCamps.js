import React, { useState, useEffect } from "react";
import { Auth } from "aws-amplify";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  authCheckAdmin,
  getSessionStorage,
  setSessionStorage,
} from "../Components/UserInfoAndAuth";
import "../Style pages/dashBoard.css";
import SignInImage from "../Style pages/Images/SignInLogo.png";

function App() {
  // Set default value for navigate
  let navigate = useNavigate();
  const [didLoad, setDidLoad] = useState(false);

  // array for holding all camps information
  const [allCampList, setAllCampList] = useState([]);

  useEffect(() => {
    // checking if admin is the user trying to access this page
    if (!didLoad) {
      if (authCheckAdmin(navigate)) {
        // get all camp information
        getAllCamps();
        setDidLoad(true);
      }
    }
  }, [didLoad, navigate]);

  // to get information of all camps
  const getAllCamps = () => {
    Axios.get("http://localhost:3001/getCampsByStatus", {
      params: { status: "Camp Confirmed" },
    }).then((response) => {
      // put information into allCampList array
      setAllCampList(response.data);
    });
  };

  // For signing out users
  async function signOut() {
    try {
      // signOut users
      await Auth.signOut();
      // put user back on sign in page
      navigate("/");
    } catch {
      console.log("error signing out: ");
    }
  }

  // checking for proper user
  if (
    getSessionStorage("authenticated") === "true" &&
    getSessionStorage("classification").toLowerCase() === "admin"
  ) {
    return (
      <div>
        <div class="navbar">
          <img src={SignInImage} alt="HYPO2 Logo"></img>

          <button
            onClick={() => {
              navigate("/AdminProfile");
            }}
          >
            Home
          </button>
          <button
            onClick={() => {
              navigate("/AdminProfile/PendingCamps");
            }}
          >
            Pending
          </button>
          <button
            onClick={() => {
              navigate("/AdminProfile/NeedsAssistance");
            }}
          >
            Needs Assistance
          </button>
          <button
            onClick={() => {
              navigate("/AdminProfile/ConfirmedCamps");
            }}
          >
            Confirmed
          </button>
          <button
            onClick={() => {
              navigate("/AdminProfile/PastCamps");
            }}
          >
            Past
          </button>
          <button
            onClick={() => {
              navigate("/AdminProfile/UpdatePrices");
            }}
          >
            Update Prices
          </button>
          <button
            onClick={() => {
              signOut();
            }}
          >
            Sign Out
          </button>
        </div>
        <div class="rightContent">
          <h1>Confirmed Camps</h1>
          {allCampList.map((val) => {
            const StatusDateStart = val.Camp_Date_Start.split(/[- : T]/);

            const yearStart = StatusDateStart[0];
            const monthStart = StatusDateStart[1];
            const dayStart = StatusDateStart[2];

            const StatusDateEnd = val.Camp_Date_End.split(/[- : T]/);

            const yearEnd = StatusDateEnd[0];
            const monthEnd = StatusDateEnd[1];
            const dayEnd = StatusDateEnd[2];

            return (
              <div
                class="campList"
                key={val.Camp_ID}
                onClick={() => {
                  setSessionStorage("campNumber", val.Camp_ID);
                  setSessionStorage("campProgressType", val.Status);
                  navigate("/CampPage");
                }}
              >
                <div class="title">
                  <h3>
                    Camp: {val.Team_Name} - {val.Camp_ID} <br></br> Status:{" "}
                    {val.Status}
                  </h3>
                </div>
                <div class="dates">
                  <p>
                    Start Date: {monthStart}/{dayStart}/{yearStart}
                  </p>
                  <p>
                    End Date: {monthEnd}/{dayEnd}/{yearEnd}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
  // not a proper user display nothing
  else {
    return null;
  }
}

export default App;
