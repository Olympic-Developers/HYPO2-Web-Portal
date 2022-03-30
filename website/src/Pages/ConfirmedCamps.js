import React, { useState, useEffect } from "react";
import { Auth } from "aws-amplify";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  authCheckAdmin,
  getSessionStorage,
  setSessionStorage,
} from "../Components/UserInfoAndAuth";

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
        <h1>
          Hello {getSessionStorage("username").toLowerCase()} welcome to your
          Admin Page
        </h1>
        <button
          style={{ display: "inline", marginRight: "20px" }}
          onClick={() => {
            navigate("/AdminProfile");
          }}
        >
          Home
        </button>
        <button
          style={{ display: "inline", marginRight: "20px" }}
          onClick={() => {
            navigate("/AdminProfile/PendingCamps");
          }}
        >
          Pending Camps
        </button>
        <button
          style={{ display: "inline", marginRight: "20px" }}
          onClick={() => {
            navigate("/AdminProfile/NeedsAssistance");
          }}
        >
          Camps That Need Assistance
        </button>
        <button
          style={{ display: "inline", marginRight: "20px" }}
          onClick={() => {
            navigate("/AdminProfile/ConfirmedCamps");
          }}
        >
          Confirmed Camps
        </button>
        <button
          style={{ display: "inline", marginRight: "20px" }}
          onClick={() => {
            navigate("/AdminProfile/PastCamps");
          }}
        >
          Past Camps
        </button>
        <button
          style={{ display: "inline", marginRight: "20px" }}
          onClick={() => {
            navigate("/AdminProfile/UpdatePrices");
          }}
        >
          Update Prices Of Services
        </button>
        <button
          style={{ display: "inline", marginRight: "20px" }}
          onClick={() => {
            signOut();
          }}
        >
          Sign out
        </button>
        <div>
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
              <button
                key={val.Camp_ID}
                onClick={() => {
                  setSessionStorage("campNumber", val.Camp_ID);
                  setSessionStorage("campProgressType", val.Status);
                  navigate("/CampPage");
                }}
                style={{ border: "5px solid Black", display: "block" }}
              >
                <h3>
                  Camp: {val.Team_Name} - {val.Camp_ID} Status: {val.Status}
                </h3>
                <p>
                  Start Date: {monthStart}/{dayStart}/{yearStart}
                </p>
                <p>
                  End Date: {monthEnd}/{dayEnd}/{yearEnd}
                </p>
              </button>
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
