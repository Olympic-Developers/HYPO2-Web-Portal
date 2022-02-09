import React, { useEffect } from "react";
import { Auth } from "aws-amplify";
import { useNavigate } from "react-router-dom";
import { authCheckClient } from "../../Components/UserInfoAndAuth";

function App() {
  // Try to set this all off to a component used in all Profile pages

  // Set default value for navigate
  let navigate = useNavigate();

  // Set constants
  const lowerCasedUserName = window.sessionStorage
    .getItem("username")
    .toLowerCase();

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

  return (
    <div>
      <h1>Hello {lowerCasedUserName} welcome to your Team Page</h1>
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

export default App;
