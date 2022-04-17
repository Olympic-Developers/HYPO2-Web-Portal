import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getSessionStorage,
  authCheckEvent,
  setSessionStorage,
} from "../Components/UserInfoAndAuth";
import Axios from "axios";
import "../Style pages/dashBoard.css";
import SignInImage from "../Style pages/Images/SignInLogo.png";

function App() {
  // Set default value for navigate
  let navigate = useNavigate();
  const [singleEvent, setSingleEvent] = useState([]);
  const [didLoad, setDidLoad] = useState(false);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    if (!didLoad) {
      if (authCheckEvent(navigate)) {
        getSingleEvent();
        getUserCamps();
        setDidLoad(true);
      }
    }
  }, [didLoad, navigate]);

  function checkCampsForConfirmedRequests() {
    let index = 0;

    while (index < events.length) {
      if (events[index].request !== "No Request") {
        if (
          events[index].EventID !== Number(getSessionStorage("eventNumber"))
        ) {
          console.log("got here");
          return false;
        }
      }

      index++;
    }

    return true;
  }

  // get information for event we are looking at
  function getSingleEvent() {
    Axios.get("http://localhost:3001/getSingleEventInfo", {
      params: { id: getSessionStorage("eventNumber") },
    }).then((response) => {
      // put information into getUserCampsList array
      setSingleEvent(response.data);
    });
  }

  function getUserCamps() {
    Axios.get("http://localhost:3001/getUserEvent", {
      params: { id: getSessionStorage("campNumber") },
    }).then((response) => {
      setEvents(response.data);
    });
  }

  if (singleEvent.length === 0) {
    return (
      <div>
        <p>
          <div>
            <div class="navbar">
              <img src={SignInImage} alt="HYPO2 Logo"></img>
              <button
                onClick={() => {
                  navigate(-1);
                }}
              >
                Back to Calendar
              </button>
            </div>
            <div class="rightContent">
              <h1>Event was deleted and no longer exist</h1>
            </div>
          </div>
        </p>
      </div>
    );
  } else if (
    getSessionStorage("authenticated") === "true" &&
    (getSessionStorage("classification").toLowerCase() === "client" ||
      getSessionStorage("classification").toLowerCase() === "admin" ||
      getSessionStorage("classification").toLowerCase() === "staff")
  ) {
    return (
      <div>
        {singleEvent.map((val) => {
          const StatusDateStart = val.start.split(/[- : T]/);
          const yearStart = StatusDateStart[0];
          const monthStart = StatusDateStart[1];
          const dayStart = StatusDateStart[2];
          const startHour = StatusDateStart[3] % 12;
          const startMinute = StatusDateStart[4];

          const StatusDateEnd = val.end.split(/[- : T]/);

          const yearEnd = StatusDateEnd[0];
          const monthEnd = StatusDateEnd[1];
          const dayEnd = StatusDateEnd[2];

          const endHour = StatusDateEnd[3] % 12;
          const endMinute = StatusDateEnd[4];
          // Function for request removal
          function requestRemoval() {
            // Always set camp to Needs Assistance
            Axios.post("http://localhost:3001/setCampStatus", {
              campID: getSessionStorage("campNumber"),
              status: "Needs Assistance",
            }).then(() => {
              setSessionStorage("campProgressType", "Needs Assistance");
            });

            // Sets type of request needed for event (Removal)
            Axios.post("http://localhost:3001/setEventRequest", {
              id: val.EventID,
              request: "Removal",
            }).then(() => {
              setDidLoad(false);
            });
          }

          // remove request
          function removeRequest() {
            // Sets type of request needed for event (no Request)
            Axios.post("http://localhost:3001/setEventRequest", {
              id: val.EventID,
              request: "No Request",
            }).then(() => {
              if (checkCampsForConfirmedRequests()) {
                Axios.post("http://localhost:3001/setCampStatus", {
                  campID: getSessionStorage("campNumber"),
                  status: "Camp Confirmed",
                });
              }
              setDidLoad(false);
            });
          }

          function deleteEventForever() {
            Axios.post("http://localhost:3001/subCurrentPrices", {
              campID: getSessionStorage("campNumber"),
              price: val.Price,
            });

            Axios.delete(
              `http://localhost:3001/deleteSingleEvent/${val.EventID}`
            ).then(() => {
              if (checkCampsForConfirmedRequests()) {
                Axios.post("http://localhost:3001/setCampStatus", {
                  campID: getSessionStorage("campNumber"),
                  status: "Camp Confirmed",
                });
                setSessionStorage("Camp Confirmed", "Needs Assistance");
              }
              setDidLoad(false);
            });
          }

          return (
            <div key={val.EventID}>
              <div class="navbar">
                <img src={SignInImage} alt="HYPO2 Logo"></img>
                <div>
                  {getSessionStorage("campProgressType") !== "Past Camp" ? (
                    getSessionStorage("classification").toLowerCase() ===
                      "admin" && val.request === "No Request" ? (
                      <button
                        onClick={() => {
                          deleteEventForever();
                        }}
                      >
                        Delete
                      </button>
                    ) : // buttons for client on No Request
                    getSessionStorage("classification").toLowerCase() ===
                        "client" && val.request === "No Request" ? (
                      <button
                        onClick={() => {
                          requestRemoval();
                        }}
                      >
                        Request Deletion
                      </button>
                    ) : // buttons for admin on Removal
                    getSessionStorage("classification").toLowerCase() ===
                        "admin" && val.request === "Removal" ? (
                      <div>
                        <button
                          onClick={() => {
                            removeRequest();
                          }}
                        >
                          Reject Request of Deletion
                        </button>
                        <button
                          onClick={() => {
                            deleteEventForever();
                          }}
                        >
                          Confirm Request of Deletion
                        </button>
                      </div>
                    ) : // buttons for client on Removal
                    getSessionStorage("classification").toLowerCase() ===
                        "client" && val.request === "Removal" ? (
                      <button
                        onClick={() => {
                          removeRequest();
                        }}
                      >
                        Cancel Request for Deletion
                      </button>
                    ) : // buttons for admin on Request New
                    getSessionStorage("classification").toLowerCase() ===
                        "admin" && val.request === "Request New" ? (
                      <div>
                        <button
                          onClick={() => {
                            deleteEventForever();
                          }}
                        >
                          Reject Request of Addition
                        </button>
                        <button
                          onClick={() => {
                            removeRequest();
                          }}
                        >
                          Confirm Request of Addition
                        </button>
                      </div>
                    ) : // buttons for client on Request New
                    getSessionStorage("classification").toLowerCase() ===
                        "client" && val.request === "Request New" ? (
                      <button
                        onClick={() => {
                          deleteEventForever();
                        }}
                      >
                        Cancel Request for Addition
                      </button>
                    ) : null
                  ) : null}
                </div>

                <button
                  onClick={() => {
                    navigate(-1);
                  }}
                >
                  Back to Calendar
                </button>
              </div>
              <div class="rightContent">
                <h1>Event: {val.title}</h1>
                <h1>Comment: {val.Comments}</h1>
                <h1>
                  Start Date: {monthStart}/{dayStart}/{yearStart}{" "}
                  {parseInt(StatusDateStart[3]) === 12 ? "12" : startHour}:
                  {startMinute}
                  {parseInt(StatusDateStart[3]) >= 12 ? "PM" : "AM"}
                </h1>
                <h1>
                  End Date: {monthEnd}/{dayEnd}/{yearEnd}{" "}
                  {parseInt(StatusDateEnd[3]) === 12 ? "12" : endHour}:
                  {endMinute}
                  {parseInt(StatusDateEnd[3]) >= 12 ? "PM" : "AM"}
                </h1>
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
