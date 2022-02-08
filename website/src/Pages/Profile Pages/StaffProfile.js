import React, { useEffect } from "react";
import { Auth } from "aws-amplify";
import { useNavigate } from "react-router-dom";
import { authCheckStaff } from "../../Components/UserInfoAndAuth";

function App() {
  // try to set this all off to a component used in all Profile pages

  // Set default value for navigate
  let navigate = useNavigate();

  // Set constants
  const lowerCasedUserName = window.sessionStorage
    .getItem("username")
    .toLowerCase();

  // useEffect used for checking for authenticated and proper classification
  useEffect(() => {
    authCheckStaff(navigate);
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
      <h1>Hello {lowerCasedUserName} welcome to your Staff Page</h1>
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

export default App;
