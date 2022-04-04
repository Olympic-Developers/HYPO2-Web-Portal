import format from "date-fns/format";
import getDay from "date-fns/getDay";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import React, { useEffect, useState } from "react";
import { Auth } from "aws-amplify";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import {
  authCheckStaff,
  getSessionStorage,
  setSessionStorage,
} from "../../Components/UserInfoAndAuth";
import "../../Style pages/dashBoard.css";
import SignInImage from "../../Style pages/Images/SignInLogo.png";

function App() {
  // Set default value for navigate
  let navigate = useNavigate();
  const [didLoad, setDidLoad] = useState(false);
  const [staffSchedule, setStaffSchedule] = useState(false);

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

  useEffect(() => {
    if (!didLoad) {
      if (authCheckStaff(navigate)) {
        getStaffSchedule();
        setDidLoad(true);
      }
    }
  }, [didLoad, navigate]);

  const handleSelected = (event) => {
    setSessionStorage("campNumber", event.Camp_ID);
    setSessionStorage("campProgressType", event.Status);
    setSessionStorage("eventNumber", event.EventID);
    navigate("/CampPage/Event");
  };

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

  function getStaffSchedule() {
    Axios.get("http://localhost:3001/getStaffSchedule", {
      params: {
        activityClassOne: getSessionStorage("jobRoleOne"),
        activityClassTwo: getSessionStorage("jobRoleTwo"),
        activityClassThree: getSessionStorage("jobRoleThree"),
      },
    }).then((response) => {
      // put information into getUserCampsList array
      setStaffSchedule(response.data);
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
    getSessionStorage("classification").toLowerCase() === "staff"
  ) {
    return (
      <div>
        <div class="navbar">
          <img src={SignInImage} alt="HYPO2 Logo"></img>

          <button
            onClick={() => {
              signOut();
            }}
          >
            Sign out
          </button>
        </div>

        <div class="rightContent">
          <h1>Calendar</h1>
          <Calendar
            localizer={localizer}
            events={staffSchedule}
            startAccessor="start"
            endAccessor="end"
            style={{
              height: 700,
              margin: "0px 25px",
              backgroundColor: "white",
            }}
            eventPropGetter={eventStyleGetter}
            onSelectEvent={handleSelected}
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
