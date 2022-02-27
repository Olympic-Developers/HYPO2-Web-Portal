import React, { useState, useEffect } from "react";
import { Auth } from "aws-amplify";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  authCheckClient,
  getSessionStorage,
  setSessionStorage,
} from "../../Components/UserInfoAndAuth";

function App() {
  // Set default value for navigate
  let navigate = useNavigate();
  const [didLoad, setDidLoad] = useState(false);

  // array for holding user camp information
  const [userCampsList, setGetUserCamps] = useState([]);

  useEffect(() => {
    // checking if admin is the user trying to access this page
    if (!didLoad) {
      if (authCheckClient(navigate)) {
        // get all user's camp information
        getCamps();
        setDidLoad(true);
      }
    }
  }, [didLoad, navigate]);

  // to get information of all user's camps
  const getCamps = () => {
    Axios.get("http://localhost:3001/UserCamps", {
      params: { username: getSessionStorage("username").toLowerCase() },
    }).then((response) => {
      // put information into getUserCampsList array
      setGetUserCamps(response.data);
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
    getSessionStorage("classification").toLowerCase() === "client"
  ) {
    return (
      <div>
        <h1>
          Hello {getSessionStorage("username").toLowerCase()} welcome to your
          Team Page
        </h1>

        <div>
          {userCampsList.map((val) => {
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

        <div>
          <button
            style={{ marginBottom: "10px " }}
            onClick={() => {
              signOut();
            }}
          >
            Sign out
          </button>
        </div>

        <button
          onClick={() => {
            navigate("/ClientProfile/Intake");
          }}
        >
          Create a Camp!
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
