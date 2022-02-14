import React, { useState, useEffect } from "react";
import "../Style pages/IntakeStyle.css";
import Axios from "axios";
import { authCheckClient } from "../Components/UserInfoAndAuth";
import { useNavigate } from "react-router-dom";
import { getSessionStorage } from "../Components/UserInfoAndAuth";

function Summary() {
  let navigate = useNavigate();

  useEffect(() => {
    authCheckClient(navigate);
  });

  const [sumList, setSumList] = useState([]);

  const getSummary = () => {
    Axios.get("http://localhost:3001/summary", {}).then((response) => {
      console.log(response);
    });
  };

  if (
    getSessionStorage("authenticated") === "true" &&
    getSessionStorage("classification").toLowerCase() === "client"
  ) {
    return <h1>we made it</h1>;
  } else {
    return null;
  }
}

export default Summary;
