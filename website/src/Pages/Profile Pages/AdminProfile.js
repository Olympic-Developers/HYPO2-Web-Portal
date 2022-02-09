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
          onClick={() => {
            signOut();
          }}
        >
          Sign out
        </button>
      </div>
    );
  } else {
    return null;
  }
}

export default App;
