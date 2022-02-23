import React from "react";
import { useNavigate } from "react-router-dom";

function App() {
  // Set default value for navigate
  let navigate = useNavigate();

  return (
    <div>
      <h1>Event Page (Event name here)</h1>
      <p>Comments:</p>
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
