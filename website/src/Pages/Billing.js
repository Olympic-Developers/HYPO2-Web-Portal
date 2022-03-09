import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import {
  getSessionStorage,
  authCheckCamp,
} from "../Components/UserInfoAndAuth";

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
    Axios.get("http://localhost:3001/CampInfo", {
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
            <h1>
              Camp Page {val.Team_Name} - {val.Camp_ID}
            </h1>

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
              {getSessionStorage("classification").toLowerCase() === "admin" &&
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

            <button onClick={backToCorrectHomePage}>Return To Home Page</button>

            <h1>Initial Price</h1>

            <h3>Accommodations: {val.accomPricing}</h3>
            <h3>Services: {val.initServices}</h3>
            <h3>Transportation: {val.transportPrice}</h3>
            <h3>
              Total: {val.accomPricing + val.initServices + val.transportPrice}
            </h3>

            <h1>Current Price</h1>

            <h3>Accommodations: {val.accomPricing}</h3>
            <h3>Services: {val.currentServices}</h3>
            <h3>Transportation: {val.transportPrice}</h3>
            <h3>
              Total:{" "}
              {val.accomPricing + val.currentServices + val.transportPrice}
            </h3>
          </div>
        );
      })}
    </div>
  );
}

export default App;
