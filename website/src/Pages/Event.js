import React from "react";
import { useNavigate } from "react-router-dom";
import {
  getSessionStorage,
  authCheckCamp,
  setSessionStorage,
} from "../Components/UserInfoAndAuth";

function App() {
  // Set default value for navigate
  let navigate = useNavigate();

  let comment = getSessionStorage("eventComments");
  let title = getSessionStorage("eventTitle");

  return (
    <div>
      <h1>Event Page</h1>
      <h1>{title}</h1>
      <p>Comments: {comment}</p>
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
        }}
      >
        Delete
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
