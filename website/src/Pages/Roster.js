import React, { useState, useEffect } from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  authCheckCamp,
  getSessionStorage,
} from "../Components/UserInfoAndAuth";

function App() {
  // Set default value for navigate
  let navigate = useNavigate();
  const [userInfo, setGetInfo] = useState([]);
  const [didLoad, setDidLoad] = useState(false);
  const [rosterList, setRosterList] = useState([]);
  const [name, setName] = useState("");
  const [birthDate, setBirthDate] = useState({
    varOne: new Date(),
  });
  const [role, setRole] = useState("");
  const [gender, setGender] = useState("");
  const id = getSessionStorage("campNumber");

  function backToCorrectHomePage() {
    if (getSessionStorage("classification").toLowerCase() === "admin") {
      navigate("/AdminProfile");
    } else {
      navigate("/ClientProfile");
    }
  }
  function sendRoster() {
    Axios.post("http://localhost:3001/sendRoster", {
      id: id,
      name: name,
      birth: birthDate,
      role: role,
      gender: gender,
    });
  }

  useEffect(() => {
    if (!didLoad) {
      if (authCheckCamp(navigate)) {
        getInfo();
        getRoster();
        setDidLoad(true);
      }
    }
  }, [navigate, didLoad]);

  function getInfo() {
    Axios.get("http://localhost:3001/CampInfo", {
      params: { id: getSessionStorage("campNumber") },
    }).then((response) => {
      // put information into getUserCampsList array
      setGetInfo(response.data);
    });
  }

  function getRoster() {
    Axios.get("http://localhost:3001/getRoster", {
      params: { id: getSessionStorage("campNumber") },
    }).then((response) => {
      setRosterList(response.data);
    });
  }

  if (getSessionStorage("classification").toLowerCase() === "client") {
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

              {rosterList.map((val) => {
                return (
                  <div>
                    Name: {val.Name} Role: {val.Role} Gender:
                    {val.Gender.toLowerCase()}
                  </div>
                );
              })}

              <h1>Roster</h1>

              <div>
                <span className="roster">
                  <label>Name: </label>
                  <input
                    type="text"
                    name="name"
                    onChange={(event) => {
                      setName(event.target.value);
                    }}
                  />
                </span>
                <span className="roster">
                  <label>Role: </label>
                  <input
                    type="text"
                    name="name"
                    onChange={(event) => {
                      setRole(event.target.value);
                    }}
                  />
                </span>
                <span className="roster">
                  <label>Birth-Date: </label>
                  <input
                    type="date"
                    name="name"
                    onChange={(event) => {
                      setBirthDate(event.target.value);
                    }}
                  />
                </span>
                <span className="roster">
                  <label>Gender: </label>
                  <select
                    id="country"
                    name="country"
                    onChange={(event) => {
                      setGender(event.target.value);
                    }}
                  >
                    <option value="Select One">Select One</option>
                    <option value="MALE">MALE</option>
                    <option value="FEMALE">FEMALE</option>
                  </select>
                </span>
                <button onClick={sendRoster}>Submit</button>
              </div>
            </div>
          );
        })}
      </div>
    );
  } else {
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
          );
        })}

        <h1>ROSTER</h1>
        {rosterList.map((val) => {
          return (
            <div>
              Name: {val.Name} Role: {val.Role} Gender:
              {val.Gender.toLowerCase()}
            </div>
          );
        })}
      </div>
    );
  }
}

export default App;
