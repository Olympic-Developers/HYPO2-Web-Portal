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
              {getSessionStorage("classification").toLowerCase() === "admin" ? (
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

            <h1>Admin Permissions</h1>
          </div>
        );
      })}
    </div>
  );
}

export default App;
