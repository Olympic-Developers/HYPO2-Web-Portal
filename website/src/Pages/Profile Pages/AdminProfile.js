import React, { useEffect } from "react";
import { Auth } from "aws-amplify";
import { useNavigate } from "react-router-dom";
import {
  authCheckAdmin,
  getSessionStorage,
} from "../../Components/UserInfoAndAuth";

function App() {
  // Set default value for navigate
  let navigate = useNavigate();

  useEffect(() => {
    authCheckAdmin(navigate);
  });

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
        <button style={{ display: "inline", marginRight: "20px" }}>
          Camps That Need Assistance
        </button>
        <button style={{ display: "inline", marginRight: "20px" }}>
          Confirmed Camps
        </button>
        <button style={{ display: "inline", marginRight: "20px" }}>
          Past Camps
        </button>
        <button style={{ display: "inline", marginRight: "20px" }}>
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
      </div>
    );
  }
  // not a proper user display nothing
  else {
    return null;
  }
}

export default App;
