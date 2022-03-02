import React, { useState, useEffect } from "react";
import Axios from "axios";
import { Auth } from "aws-amplify";
import { useNavigate } from "react-router-dom";
import {
  authCheckAdmin,
  authCheckClient,
  authCheckCamp,
  getSessionStorage,
} from "../Components/UserInfoAndAuth";

function App() {
  // Set default value for navigate
  let navigate = useNavigate();
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
    }).then(() => {
      console.log("Success");
    });
  }

  // For signing out users
  /*async function signOut() {
    try {
      // signOut users
      await Auth.signOut();
      // put user back on sign in page
      navigate("/");
    } catch {
      console.log("error signing out: ");
    }
  }*/

  useEffect(() => {
    if (!didLoad) {
      if (authCheckCamp(navigate)) {
        getRoster();
        setDidLoad(true);
      }
    }
  }, [navigate, didLoad]);

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
        <h1>ROSTER</h1>
        {rosterList.map((val) => {
          return (
            <div>
              Name: {val.Name} Role: {val.Role} Gender: {val.Gender}
            </div>
          );
        })}

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
        <button onClick={backToCorrectHomePage}>return to home page</button>
      </div>
    );
  } else {
    return (
      <div>
        <h1>ROSTER</h1>
        {rosterList.map((val) => {
          return (
            <div>
              Name: {val.Name} Role: {val.Role} Gender: {val.Gender}
            </div>
          );
        })}
        <button onClick={backToCorrectHomePage}>return to home page</button>
      </div>
    );
  }
}

export default App;
