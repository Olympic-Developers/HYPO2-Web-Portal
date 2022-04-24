import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import {
  getSessionStorage,
  authCheckCamp,
} from "../Components/UserInfoAndAuth";

import "../Style pages/dashBoard.css";
import SignInImage from "../Style pages/Images/SignInLogo.png";

function App() {
  const [didLoad, setDidLoad] = useState(false);
  const [userInfo, setGetInfo] = useState([]);
  let navigate = useNavigate();

  useEffect(() => {
    if (!didLoad) {
      if (authCheckCamp(navigate)) {
        getInfo();
        setDidLoad(true);
      }
    }
  }, [didLoad, navigate]);

  function getInfo() {
    Axios.get("/api/CampInfo", {
      params: { id: getSessionStorage("campNumber") },
    }).then((response) => {
      // put information into getUserCampsList array
      setGetInfo(response.data);
    });
  }

  function backToCorrectHomePage() {
    if (getSessionStorage("classification").toLowerCase() === "admin") {
      navigate("/AdminProfile");
    } else {
      navigate("/ClientProfile");
    }
  }

  return (
    <div>
      {userInfo.map((val) => {
        return (
          <div>
            <div class="navbar">
              <img src={SignInImage} alt="HYPO2 Logo"></img>
              <button
                onClick={() => {
                  navigate("/CampPage");
                }}
              >
                Home Camp Page
              </button>
              <button
                onClick={() => {
                  navigate("/CampPage/Roster");
                }}
              >
                Roster
              </button>
              <button
                onClick={() => {
                  navigate("/CampPage/Summary");
                }}
              >
                Summary
              </button>
              <button
                onClick={() => {
                  navigate("/CampPage/Billing");
                }}
              >
                Billing
              </button>
              <span>
                {getSessionStorage("classification").toLowerCase() ===
                  "admin" &&
                getSessionStorage("campProgressType") !== "Past Camp" ? (
                  <button
                    onClick={() => {
                      navigate("/CampPage/AdminPermissions");
                    }}
                  >
                    Admin Permissions
                  </button>
                ) : null}
              </span>

              <button onClick={backToCorrectHomePage}>
                Return To Home Page
              </button>
            </div>
            <div class="rightContent">
              <h1>
                Camp Page {val.Team_Name} - {val.Camp_ID}
              </h1>
              <div class="initial">
                <h1>Initial Price</h1>

                <h3>Accommodations: ${val.accomPricing.toFixed(2)}</h3>
                <h3>Services: ${val.initServices.toFixed(2)}</h3>
                <h3>Transportation: ${val.transportPrice.toFixed(2)}</h3>
                <h3>
                  Total: $
                  {(
                    val.accomPricing +
                    val.initServices +
                    val.transportPrice
                  ).toFixed(2)}
                </h3>
              </div>

              <div class="current">
                <h1>Current Price</h1>

                <h3>Accommodations: ${val.accomPricing.toFixed(2)}</h3>
                <h3>Services: ${val.currentServices.toFixed(2)}</h3>
                <h3>Transportation: ${val.transportPrice.toFixed(2)}</h3>
                <h3>
                  Total: $
                  {(
                    val.accomPricing +
                    val.currentServices +
                    val.transportPrice
                  ).toFixed(2)}
                </h3>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default App;
