import React, { useEffect } from "react";
import { Auth } from "aws-amplify";
import { useNavigate } from "react-router-dom";
import {
  authCheckClient,
  getSessionStorage,
} from "../../Components/UserInfoAndAuth";

function App() {
  // Set default value for navigate
  let navigate = useNavigate();

  // useEffect used for checking for authenticated and proper classification
  useEffect(() => {
    authCheckClient(navigate);
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
  } else {
    return null;
  }
}

export default App;
