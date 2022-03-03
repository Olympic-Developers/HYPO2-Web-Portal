import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getSessionStorage,
  authCheckCamp,
  setSessionStorage,
} from "../Components/UserInfoAndAuth";
import Axios from "axios";

function App() {
  // Set default value for navigate
  let navigate = useNavigate();
  const [singleEvent, setSingleEvent] = useState([]);
  const [didLoad, setDidLoad] = useState(false);
  const [events, setEvents] = useState([]);
  const [singleEventFlag, setsSingleEventFlag] = useState(false);

  useEffect(() => {
    if (!didLoad) {
      if (authCheckCamp(navigate)) {
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
      setsSingleEventFlag(true);
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
          {singleEventFlag ? (
            <div>
              <h1>Event was deleted and no longer exist</h1>

              <button
                onClick={() => {
                  navigate(-1);
                }}
              >
                Back to Calendar
              </button>
            </div>
          ) : null}
        </p>
      </div>
    );
  } else if (
    getSessionStorage("authenticated") === "true" &&
    (getSessionStorage("classification").toLowerCase() === "client" ||
      getSessionStorage("classification").toLowerCase() === "admin")
  ) {
    return (
      <div>
        {singleEvent.map((val) => {
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
            Axios.delete(
              `http://localhost:3001/deleteSingleEvent/${val.EventID}`
            ).then(() => {
              if (checkCampsForConfirmedRequests()) {
                Axios.post("http://localhost:3001/setCampStatus", {
                  campID: getSessionStorage("campNumber"),
                  status: "Camp Confirmed",
                });
                setSessionStorage("Camp Confirmed", "Needs Assistance");
                window.location.reload(false);
                setSingleEvent(null);
              }
            });
          }

          return (
            <div key={val.EventID}>
              <h1>Event: {val.title}</h1>
              <p>Comment: {val.Comments}</p>

              <div>
                {getSessionStorage("campProgressType") !== "Past Camp" ? (
                  getSessionStorage("classification").toLowerCase() ===
                    "admin" && val.request === "No Request" ? (
                    <button
                      onClick={() => {
                        deleteEventForever();
                      }}
                    >
                      delete
                    </button>
                  ) : // buttons for client on No Request
                  getSessionStorage("classification").toLowerCase() ===
                      "client" && val.request === "No Request" ? (
                    <button
                      onClick={() => {
                        requestRemoval();
                      }}
                    >
                      request deletion
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
                        reject request of deletion
                      </button>
                      <button
                        onClick={() => {
                          deleteEventForever();
                        }}
                      >
                        confirm request of deletion
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
                      cancel request for deletion
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
                        reject request of addition
                      </button>
                      <button
                        onClick={() => {
                          removeRequest();
                        }}
                      >
                        confirm request of addition
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
                      cancel request for addition
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
          );
        })}
      </div>
    );
  } else {
    return null;
  }
}

export default App;
