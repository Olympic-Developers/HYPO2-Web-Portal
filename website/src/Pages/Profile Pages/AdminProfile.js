import format from "date-fns/format";
import getDay from "date-fns/getDay";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import React, { useEffect } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Auth } from "aws-amplify";
import { useNavigate } from "react-router-dom";
import {
  authCheckAdmin,
  getSessionStorage,
  setSessionStorage,
} from "../../Components/UserInfoAndAuth";

function App() {
  const locales = {
    "en-US": require("date-fns/locale/en-US"),
  };

  const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
  });

  const events = [];

  // Set default value for navigate
  let navigate = useNavigate();

  useEffect(() => {
    authCheckAdmin(navigate);
  });

  // For signing out users
  async function signOut() {
    try {
      // signOut users
      await Auth.signOut();
      // put user back on sign in page
      navigate("/");
    } catch {
      console.log("error signing out: ");
    }
  }

  // checking for proper user
  if (
    getSessionStorage("authenticated") === "true" &&
    getSessionStorage("classification").toLowerCase() === "admin"
  ) {
    return (
      <div>
        <h1>
          Hello {getSessionStorage("username").toLowerCase()} welcome to your
          Admin Page
        </h1>
        <button
          style={{ display: "inline", marginRight: "20px" }}
          onClick={() => {
            navigate("/AdminProfile");
          }}
        >
          Home
        </button>
        <button
          style={{ display: "inline", marginRight: "20px" }}
          onClick={() => {
            navigate("/AdminProfile/PendingCamps");
          }}
        >
          Pending Camps
        </button>
        <button style={{ display: "inline", marginRight: "20px" }}>
          Camps That Need Assistance
        </button>
        <button style={{ display: "inline", marginRight: "20px" }}>
          Confirmed Camps
        </button>
        <button style={{ display: "inline", marginRight: "20px" }}>
          Past Camps
        </button>
        <button
          style={{ display: "inline", marginRight: "20px" }}
          onClick={() => {
            navigate("/AdminProfile/UpdatePrices");
          }}
        >
          Update Prices Of Services
        </button>
        <button
          style={{ display: "inline", marginRight: "20px" }}
          onClick={() => {
            signOut();
          }}
        >
          Sign out
        </button>

        <h1>Master Calendar</h1>
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 700, margin: "0px 25px" }}
          onSelectEvent={(event) => {
            setSessionStorage("campNumber", event.campID);
            navigate("/CampPage/Event");
          }}
        />
      </div>
    );
  }
  // not a proper user display nothing
  else {
    return null;
  }
}

export default App;
