import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import {
  getSessionStorage,
  authCheckCamp,
  setSessionStorage,
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
                "admin" ? (
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
              <div class="permission">
                <h2>Archive This Camp</h2>
                <p>
                  When you archive the camp the camp will no longer be able to
                  be edited this process can not be undone.
                </p>
                <button
                  onClick={() => {
                    Axios.post("/api/setCampStatus", {
                      campID: getSessionStorage("campNumber"),
                      status: "Past Camp",
                    }).then(() => {
                      setSessionStorage("campProgressType", "Past Camp");
                      navigate(-1);
                    });
                  }}
                >
                  Archive Camp
                </button>
              </div>
              <div class="permission">
                <h2>Delete This Camp</h2>
                <p>
                  When you delete this camp all information will be lost and can
                  not be gotten back The camp page, schedule and intake
                  information and all other information about this camp will
                  gone this process can not be undone.
                </p>
                <button
                  onClick={() => {
                    Axios.delete(
                      `/api/deleteCamp/${getSessionStorage("campNumber")}`
                    ).then(() => {
                      navigate("/AdminProfile");
                    });
                  }}
                >
                  Delete Camp
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default App;
