import React, { useState, useEffect } from "react";
import { Auth } from "aws-amplify";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  authCheckAdmin,
  getSessionStorage,
  setSessionStorage,
} from "../../Components/UserInfoAndAuth";

function App() {
  // Set default value for navigate
  let navigate = useNavigate();

  // array for holding all camps information
  const [allCampList, setAllCampList] = useState([]);

  useEffect(() => {
    // checking if admin is the user trying to access this page
    if (authCheckAdmin(navigate)) {
      // get all camp information
      getAllCamps();
    }
  });

  // to get information of all camps
  const getAllCamps = () => {
    Axios.get("http://localhost:3001/AllCamps").then((response) => {
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

        <div>
          {allCampList.map((val) => {
            return (
              <button
                key={val.Camp_ID}
                disabled={val.clicked}
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
                <p>Start Date: {val.Camp_Date_Start}</p>
                <p>End Date: {val.Camp_Date_End}</p>
              </button>
            );
          })}
        </div>

        <button
          onClick={() => {
            signOut();
          }}
        >
          Sign out
        </button>
      </div>
    );
  }
  // not a proper user display nothing
  else {
    return null;
  }
}

export default App;
