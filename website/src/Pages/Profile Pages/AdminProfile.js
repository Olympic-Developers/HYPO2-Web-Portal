import React, { useEffect } from "react";
import { Auth } from "aws-amplify";
import { useNavigate } from "react-router-dom";

function App() {
  // try to set this all off to a component used in all Profile pages

  // Set default value for navigate
  let navigate = useNavigate();

  // Set constants
  const authenticated = window.sessionStorage.getItem("authenticated");
  const lowerCasedUserName = window.sessionStorage
    .getItem("username")
    .toLowerCase();
  const lowerCasedClassification = window.sessionStorage
    .getItem("classification")
    .toLowerCase();

  // useEffect used for checking for authenticated and proper classification
  useEffect(() => {
    // user not authenticated or not proper classification
    if (authenticated !== "true" || lowerCasedClassification !== "admin") {
      // user try to access this through a route in HYPO2 web Portal
      if (authenticated !== "false") {
        navigate(-1);
      }
      // Tried to access this page from a outside website
      else {
        navigate("/");
      }
    }
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
      <h1>Hello {lowerCasedUserName} welcome to your Admin Page</h1>
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
