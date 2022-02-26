import format from "date-fns/format";
import getDay from "date-fns/getDay";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import React, { useEffect, useState } from "react";
import Axios from "axios";
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

  // Set default value for navigate
  const [events, getEvents] = useState([]);
  let navigate = useNavigate();
  const [didLoad, setDidLoad] = useState(false);

  useEffect(() => {
    if (!didLoad) {
      if (authCheckAdmin(navigate)) {
        getAllCamps();
        setDidLoad(true);
      }
    }
  }, [didLoad, navigate]);

  function getAllCamps() {
    Axios.get("http://localhost:3001/getAllEvent").then((response) => {
      getEvents(response.data);

      let index = 0;

      while (index < response.data.length) {
        let splitStartDate = response.data[index].start.split(/[- : T]/);

        const yearStart = splitStartDate[0];
        const monthStart = splitStartDate[1] - 1;
        const dayStart = splitStartDate[2];
        const hourStart = splitStartDate[3];
        const minuteStart = splitStartDate[4];

        response.data[index].start = new Date(
          yearStart,
          monthStart,
          dayStart,
          hourStart,
          minuteStart
        );

        const splitEndDate = response.data[index].end.split(/[- : T]/);

        const yearEnd = splitEndDate[0];
        const monthEnd = splitEndDate[1] - 1;
        const dayEnd = splitEndDate[2];
        const hourEnd = splitEndDate[3];
        const minuteEnd = splitEndDate[4];

        response.data[index].end = new Date(
          yearEnd,
          monthEnd,
          dayEnd,
          hourEnd,
          minuteEnd
        );
        index++;
      }
    });
  }

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
