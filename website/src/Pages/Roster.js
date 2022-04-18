import React, { useState, useEffect } from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  authCheckCamp,
  getSessionStorage,
} from "../Components/UserInfoAndAuth";
import "../Style pages/dashBoard.css";
import SignInImage from "../Style pages/Images/SignInLogo.png";

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

  if (
    getSessionStorage("authenticated") === "true" &&
    getSessionStorage("campProgressType") !== "Past Camp" &&
    (getSessionStorage("classification").toLowerCase() === "admin" ||
      getSessionStorage("classification").toLowerCase() === "client")
  ) {
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

                <h1>Roster</h1>
                <table>
                  <tr>
                    <th>
                      <h2>Name</h2>
                    </th>
                    <th>
                      <h2>Role</h2>
                    </th>
                    <th>
                      <h2>Gender</h2>
                    </th>
                    <th>
                      <h2>Date of Birth</h2>
                    </th>
                  </tr>
                  {rosterList.map((val) => {
                    const birthDateSplit = val.Birth_Date.split(/[- : T]/);

                    const year = birthDateSplit[0];
                    const month = birthDateSplit[1];
                    const day = birthDateSplit[2];
                    return (
                      <tr>
                        <td>{val.Name}</td>
                        <td>{val.Role}</td>
                        <td>{val.Gender.toLowerCase()}</td>
                        <td>
                          {month}/{day}/{year}
                        </td>
                      </tr>
                    );
                  })}
                </table>

                <div class="roster">
                  <span>
                    <label>Name: </label>
                    <input
                      type="text"
                      name="name"
                      onChange={(event) => {
                        setName(event.target.value);
                      }}
                    />
                  </span>
                  <span>
                    <label>Role: </label>
                    <input
                      type="text"
                      name="name"
                      onChange={(event) => {
                        setRole(event.target.value);
                      }}
                    />
                  </span>
                  <span>
                    <label>Birth-Date: </label>
                    <input
                      type="date"
                      name="name"
                      onChange={(event) => {
                        setBirthDate(event.target.value);
                      }}
                    />
                  </span>
                  <span>
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
                      <option value="OTHER">OTHER</option>
                    </select>
                  </span>
                  <button
                    onClick={() => {
                      sendRoster();
                      window.location.reload(false);
                    }}
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  } else if (
    getSessionStorage("authenticated") === "true" &&
    getSessionStorage("campProgressType") === "Past Camp" &&
    (getSessionStorage("classification").toLowerCase() === "admin" ||
      getSessionStorage("classification").toLowerCase() === "client")
  ) {
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
                <button onClick={backToCorrectHomePage}>
                  Return To Home Page
                </button>
              </div>
              <div class="rightContent">
                <h1>
                  Camp Page {val.Team_Name} - {val.Camp_ID}
                </h1>

                <h1>Roster</h1>
                <table>
                  <tr>
                    <th>
                      <h2>Name</h2>
                    </th>
                    <th>
                      <h2>Role</h2>
                    </th>
                    <th>
                      <h2>Gender</h2>
                    </th>
                  </tr>
                  {rosterList.map((val) => {
                    const birthDateSplit = val.Birth_Date.split(/[- : T]/);

                    const year = birthDateSplit[0];
                    const month = birthDateSplit[1];
                    const day = birthDateSplit[2];
                    return (
                      <tr>
                        <td>{val.Name}</td>
                        <td>{val.Role}</td>
                        <td>{val.Gender.toLowerCase()}</td>
                      </tr>
                    );
                  })}
                </table>
              </div>
            </div>
          );
        })}
      </div>
    );
  } else {
    return null;
  }
}

export default App;
