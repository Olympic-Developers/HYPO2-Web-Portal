import React from "react";
import { useNavigate } from "react-router-dom";
import {
  getSessionStorage,
  setSessionStorage,
} from "../Components/UserInfoAndAuth";
import Axios from "axios";

function App() {
  // Set default value for navigate
  let navigate = useNavigate();

  let event = JSON.parse(getSessionStorage("event"));
  const CampID = getSessionStorage("campNumber");

  function changeStatus() {
    Axios.post("http://localhost:3001/setCampStatus", {
      campID: CampID,
      status: "Needs Assistance",
    }).then(() => {
      setSessionStorage("campProgressType", "Needs Assistance");
    });

    Axios.post("http://localhost:3001/setEventRequest", {
      id: event.EventID,
      request: true,
    }).then(() => {
      console.log("success");
    });
  }
  return (
    <div>
      <h1>Event Page</h1>
      <h1>{event.title}</h1>
      <p>Comments: {event.Comments}</p>
      {/*Show this button for only admins when the schedule block has status of request*/}
      <button
        style={{ display: "inline", marginRight: "20px" }}
        onClick={() => {
          navigate(-1);
          // Add more code here
        }}
      >
        Confirm
      </button>
      <button
        style={{ display: "inline", marginRight: "20px" }}
        onClick={() => {
          // To camp page
          changeStatus();
        }}
      >
        Request Removal
      </button>
      <button
        style={{ display: "inline", marginRight: "20px" }}
        onClick={() => {
          // To camp page
        }}
      >
        To Camp Page
      </button>
    </div>
  );
}

export default App;
