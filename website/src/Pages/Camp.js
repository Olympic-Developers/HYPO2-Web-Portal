import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  getSessionStorage,
  authCheckCamp,
} from "../Components/UserInfoAndAuth";

function App() {
  let navigate = useNavigate();

  useEffect(() => {
    authCheckCamp(navigate);
  });

  function backToCorrectHomePage() {
    if (getSessionStorage("classification").toLowerCase() === "admin") {
      navigate("/AdminProfile");
    } else {
      navigate("/ClientProfile");
    }
  }

  if (
    getSessionStorage("campProgressType") ===
      "Pending Camp Confirmation Needed" &&
    getSessionStorage("classification").toLowerCase() === "client"
  ) {
    return (
      <div>
        <h1>
          The team is currently working on setting up your camp please check
          back soon!
        </h1>
        <button onClick={backToCorrectHomePage}>return to home page</button>
      </div>
    );
  } else {
    return (
      <div>
        <h1>Camp Page</h1>
      </div>
    );
  }
}

export default App;
