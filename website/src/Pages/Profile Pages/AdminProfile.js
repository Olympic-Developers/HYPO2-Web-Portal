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
import "../../Style pages/dashBoard.css";
import SignInImage from "../../Style pages/Images/SignInLogo.png";

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

  const eventStyleGetter = (event) => ({
    style: {
      backgroundColor:
        event.request === "Removal"
          ? "red"
          : event.request === "Request New"
          ? "grey"
          : "green",
    },
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

  const handleSelected = (event) => {
    setSessionStorage("campNumber", event.Camp_ID);
    setSessionStorage("campProgressType", event.Status);
    setSessionStorage("eventNumber", event.EventID);
    navigate("/CampPage/Event");
  };

  // checking for proper user
  if (
    getSessionStorage("authenticated") === "true" &&
    getSessionStorage("classification").toLowerCase() === "admin"
  ) {
    return (
      <div>
        <div class="navbar">
          <img src={SignInImage} alt="HYPO2 Logo"></img>

          <button
            onClick={() => {
              navigate("/AdminProfile");
            }}
          >
            Home
          </button>
          <button
            onClick={() => {
              navigate("/AdminProfile/PendingCamps");
            }}
          >
            Pending
          </button>
          <button
            onClick={() => {
              navigate("/AdminProfile/NeedsAssistance");
            }}
          >
            Needs Assistance
          </button>
          <button
            onClick={() => {
              navigate("/AdminProfile/ConfirmedCamps");
            }}
          >
            Confirmed
          </button>
          <button
            onClick={() => {
              navigate("/AdminProfile/PastCamps");
            }}
          >
            Past
          </button>
          <button
            onClick={() => {
              navigate("/AdminProfile/UpdatePrices");
            }}
          >
            Update Prices
          </button>
          <button
            onClick={() => {
              signOut();
            }}
          >
            Sign out
          </button>
        </div>
        <div class="rightContent">
          <h1>Master Calendar</h1>
          <Calendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            style={{
              height: 700,
              margin: "0px 25px",
              backgroundColor: "white",
            }}
            onSelectEvent={handleSelected}
            eventPropGetter={eventStyleGetter}
          />
        </div>
      </div>
    );
  }
  // not a proper user display nothing
  else {
    return null;
  }
}

export default App;
