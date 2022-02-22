import React, { useEffect } from "react";
import { Auth } from "aws-amplify";
import { useNavigate } from "react-router-dom";
import {
  authCheckStaff,
  getSessionStorage,
} from "../../Components/UserInfoAndAuth";

function App() {
  // Set default value for navigate
  let navigate = useNavigate();

  useEffect(() => {
    // checking if staff is the user trying to access this page
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

  // checking for proper user
  if (
    getSessionStorage("authenticated") === "true" &&
    getSessionStorage("classification").toLowerCase() === "staff"
  ) {
    return (
      <div>
        <h1>
          Hello {getSessionStorage("username").toLowerCase()} welcome to your
          Staff Page
        </h1>
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
