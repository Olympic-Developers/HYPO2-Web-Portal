import format from "date-fns/format";
import getDay from "date-fns/getDay";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import React, { useState, useEffect } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import {
  getSessionStorage,
  authCheckCamp,
  setSessionStorage,
} from "../Components/UserInfoAndAuth";

function App() {
  const [didLoad, setDidLoad] = useState(false);
  let navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [userInfo, setGetInfo] = useState([]);

  const [newEvent, setNewEvent] = useState({
    price: 0,
    amountOfPeople: 0,
    title: "",
    comment: "",
    start: null,
    end: null,
    request: "",
  });

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
      if (authCheckCamp(navigate)) {
        getUserCamps();
        getInfo();
        setDidLoad(true);
      }
    }
  }, [didLoad, navigate]);

  function getUserCamps() {
    Axios.get("http://localhost:3001/getUserEvent", {
      params: { id: getSessionStorage("campNumber") },
    }).then((response) => {
      setEvents(response.data);

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

  function postActivity() {
    Axios.post("http://localhost:3001/addEvent", {
      // GeneralIntake Table Posts
      Camp_ID: getSessionStorage("campNumber"),
      actClass: "none",
      actStartTime: new Date(
        newEvent.start.getTime() +
          (-7 * 60 + newEvent.start.getTimezoneOffset()) * 60 * 1000
      ),
      actEndTime: new Date(
        newEvent.end.getTime() +
          (-7 * 60 + newEvent.end.getTimezoneOffset()) * 60 * 1000
      ),
      price: newEvent.price,
      attendees: newEvent.amountOfPeople,
      title: newEvent.title,
      comment: newEvent.comment,
      request: newEvent.request,
    });
  }

  function handleAddEvent() {
    if (newEvent.start !== null && newEvent.end !== null) {
      if (Date.parse(newEvent.start) < Date.parse(newEvent.end)) {
        if (getSessionStorage("classification").toLowerCase() === "client") {
          Axios.post("http://localhost:3001/setCampStatus", {
            campID: getSessionStorage("campNumber"),
            status: "Needs Assistance",
          }).then(() => {
            setSessionStorage("campProgressType", "Needs Assistance");
          });
          newEvent.request = "Request New";
        } else {
          newEvent.request = "No Request";
        }

        postActivity();
        setDidLoad(false);
      } else {
        alert("Please make sure the end date is after the start date");
      }
    } else {
      alert("Please make sure to enter a start and end date");
    }
  }

  function displayAmountOfPeopleTextBox(event) {
    const idOfService = event.target.value;
    let Input = document.getElementById("amountOfPeople");

    if (
      idOfService === "Outdoor Fields Grass" ||
      idOfService === "Outdoor Fields Artificial Turf" ||
      idOfService === "Indoor Field" ||
      idOfService === "Physiotherapy/Chiropractic Rehab/Prehab" ||
      idOfService === "Orthopaedic Care" ||
      idOfService === "Primary Medical Care" ||
      idOfService === "Supplemental O2 for Training / Recovery" ||
      idOfService === "Integrated Training and Dietary Analysis" ||
      idOfService === "Group Presentation or Workshop" ||
      idOfService === "Individual Consultation " ||
      idOfService === "Team Focus Session" ||
      idOfService === "Group Presentation or Workshop" ||
      idOfService === "Other"
    ) {
      Input.style.display = "none";
    } else {
      Input.style.display = "block";
    }
  }

  const handleSelected = (event) => {
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

  function displayPriceTextBox(event) {
    const idOfService = event.target.value;
    let Input = document.getElementById("priceForService");

    if (
      idOfService === "Outdoor Fields Grass" ||
      idOfService === "Outdoor Fields Artificial Turf" ||
      idOfService === "Indoor Field" ||
      idOfService === "Orthopaedic Care" ||
      idOfService === "Primary Medical Care" ||
      idOfService === "Other"
    ) {
      Input.style.display = "block";
    } else {
      Input.style.display = "none";
    }
  }

  function backToCorrectHomePage() {
    if (getSessionStorage("classification").toLowerCase() === "admin") {
      navigate("/AdminProfile");
    } else {
      navigate("/ClientProfile");
    }
  }

  function getInfo() {
    Axios.get("http://localhost:3001/CampInfo", {
      params: { id: getSessionStorage("campNumber") },
    }).then((response) => {
      // put information into getUserCampsList array
      setGetInfo(response.data);
    });
  }

  if (
    getSessionStorage("authenticated") === "true" &&
    getSessionStorage("campProgressType") ===
      "Pending Camp Confirmation Needed" &&
    getSessionStorage("classification").toLowerCase() === "client"
  ) {
    return (
      <div>
        <h1>
          The team is currently working on setting up your camp please check
          back soon!
        </h1>
        <button onClick={backToCorrectHomePage}>return to home page</button>
      </div>
    );
  } else if (
    getSessionStorage("authenticated") === "true" &&
    getSessionStorage("campProgressType") ===
      "Pending Camp Confirmation Needed" &&
    getSessionStorage("classification").toLowerCase() === "admin"
  ) {
    return (
      <div>
        {userInfo.map((val) => {
          function getDateRanges() {
            const initialTime = new Date(yearStart, monthStart, dayStart);
            const endTime = new Date(yearEnd, monthEnd, dayEnd);
            const rangeOfDates = [];

            for (
              let tempTime = initialTime;
              tempTime < endTime;
              tempTime.setDate(tempTime.getDate() + 1)
            ) {
              rangeOfDates.push((tempTime.getMonth() + 1).toString());
            }
            console.log(rangeOfDates);
          }

          const splitStartDate = val.Camp_Date_Start.split(/[- : T]/);

          const yearStart = splitStartDate[0];
          const monthStart = splitStartDate[1] - 1;
          const dayStart = splitStartDate[2];

          const splitEndDate = val.Camp_Date_End.split(/[- : T]/);

          const yearEnd = splitEndDate[0];
          const monthEnd = splitEndDate[1] - 1;
          const dayEnd = splitEndDate[2];

          let tempTitle;
          return (
            <div key={val.Camp_ID}>
              <h1>Camp Setup</h1>
              <h1>Camp Summary</h1>
              <h3>General Information</h3>
              <div>Team Name: {val.Team_Name}</div>
              <div>
                Camp Start: {monthStart + 1} /{dayStart}/ {yearStart}
              </div>
              <div>
                Camp End: {monthEnd + 1}/{dayEnd}/{yearEnd}
              </div>
              <div>Number of Personnel: {val.Num_Personnel}</div>
              <div>Country: {val.Country}</div>
              <div>Contact: {val.Contact_Name}</div>
              <div>Email: {val.Contact_Email}</div>
              <div>Phone: {val.Contact_Phone}</div>
              <div>On Site Contact: {val.OnSite_Name}</div>
              <div>On Site Email: {val.OnSite_Email}</div>
              <div>On Site Phone: {val.OnSite_Phone}</div>
              <h3>Core Camp Needs</h3>
              {(() => {
                if (val.Hotel_Accom === 1) {
                  return (
                    <div>
                      <div>Hotel Accommodations: True</div>
                      <div>Hotel Accommodation Notes: {val.hotelAccomInfo}</div>
                    </div>
                  );
                }
              })()}
              {(() => {
                if (val.Condo_Accom === 1) {
                  return (
                    <div>
                      <div>Condo Accommodations: True</div>
                      <div>Condo Accommodation Notes: {val.condoAccomInfo}</div>
                    </div>
                  );
                }
              })()}
              {(() => {
                if (val.Univ_Cafeteria === 1) {
                  return (
                    <div>
                      <div>University Cafeteria: True</div>
                      <div>University Cafeteria Notes: {val.cafeteriaInfo}</div>
                    </div>
                  );
                }
              })()}
              {(() => {
                if (val.Catering === 1) {
                  return (
                    <div>
                      <div>Catering: True</div>
                      <div>Catering Notes: {val.cateringInfo}</div>
                    </div>
                  );
                }
              })()}
              {(() => {
                if (val.charter_transport === 1) {
                  return (
                    <div>
                      <div>Charter Transport: True</div>
                      <div>Charter Transport Notes: {val.charterInfo}</div>
                    </div>
                  );
                }
              })()}
              {(() => {
                if (val.Indiv_Shuttle === 1) {
                  return (
                    <div>
                      <div>Individual Shuttle: True</div>
                      <div>INdividual Shuttle Notes: {val.shuttleInfo}</div>
                    </div>
                  );
                }
              })()}
              {(() => {
                if (val.Rental === 1) {
                  return (
                    <div>
                      <div> Rental: True</div>
                      <div> Rental Notes: {val.rentalInfo}</div>
                      <div id="priceForRental">
                        <input
                          type="number"
                          placeholder="Price for Rental Car"
                        ></input>
                      </div>
                    </div>
                  );
                }
              })()}
              {(() => {
                if (val.permit === 1) {
                  return (
                    <div>
                      <div> University Parking Permit: True</div>
                      <div>
                        University Parking Permit Notes: {val.permitInfo}
                      </div>
                    </div>
                  );
                }
              })()}
              <h4> Facilities</h4>
              {(() => {
                if (val.Pool50M !== 0) {
                  return <div>50M Aquatic Center Lanes: {val.Pool50M}</div>;
                }
              })()}
              {(() => {
                if (val.Track400M === 1) {
                  return (
                    <div>
                      <div> Track 400M: True</div>
                      <div> Track 400M Notes: {val.track400Info}</div>
                    </div>
                  );
                }
              })()}
              {(() => {
                if (val.Track300M === 1) {
                  return (
                    <div>
                      <div> Track 300M: True</div>
                      <div> Track 300M Notes: {val.track300Info}</div>
                    </div>
                  );
                }
              })()}
              {(() => {
                if (val.Gym === 1) {
                  return (
                    <div>
                      <div> Gym: True</div>
                      <div> Gym Notes: {val.gymInfo}</div>
                    </div>
                  );
                }
              })()}
              {(() => {
                if (val.OutdoorFieldGrass === 1) {
                  return (
                    <div>
                      <div> Outdoor Grass Field: True</div>
                      <div> Outdoor Grass FieldNotes: {val.OFGInfo}</div>
                    </div>
                  );
                }
              })()}
              {(() => {
                if (val.OutdoorFieldTurf === 1) {
                  return (
                    <div>
                      <div> Outdoor Turf Field: True</div>
                      <div> Outdoor Turf Field Notes: {val.OFTInfo}</div>
                    </div>
                  );
                }
              })()}
              {(() => {
                if (val.IndoorFieldTurf === 1) {
                  return (
                    <div>
                      <div> Indoor Turf Field: True</div>
                      <div> Indoor Turf Field Notes: {val.IFTInfo}</div>
                    </div>
                  );
                }
              })()}
              {(() => {
                if (val.CourtSpace === 1) {
                  return <div>Court Space: True</div>;
                }
              })()}
              {(() => {
                if (val.CourtUsage !== 0) {
                  return <div>Court Usage: {val.CourtUsage}</div>;
                }
              })()}
              {(() => {
                if (val.AntiGravTread === 1) {
                  return (
                    <div>
                      <div> Anti Grav Treadmill: True</div>
                      <div> Anti Grav Treadmill Notes: {val.AGTInfo}</div>
                    </div>
                  );
                }
              })()}
              <h3> Additional Services </h3>
              {(() => {
                if (val.Massage_Therapy === 1) {
                  return (
                    <div>
                      <div> Massage Therapy: True</div>
                      <div> Massage Therapy Notes: {val.massageInfo}</div>
                    </div>
                  );
                }
              })()}
              {(() => {
                if (val.Physio_Therapy === 1) {
                  return (
                    <div>
                      <div> Physio Therapy: True</div>
                      <div> Physio Therapy Notes: {val.physioInfo}</div>
                    </div>
                  );
                }
              })()}
              {(() => {
                if (val.Strength_Cond === 1) {
                  return (
                    <div>
                      <div> Strength and Conditioning: True</div>
                      <div>
                        Strength and Conditioning Notes: {val.strengthInfo}
                      </div>
                    </div>
                  );
                }
              })()}
              {(() => {
                if (val.Ortho_Care === 1) {
                  return (
                    <div>
                      <div> Orthopedic Care: True</div>
                      <div> Orthopedic Care Notes: {val.orthoInfo}</div>
                    </div>
                  );
                }
              })()}
              {(() => {
                if (val.Prim_Med_Care === 1) {
                  return (
                    <div>
                      <div> Primary Medical Care: True</div>
                      <div> Primary Medical Care Notes: {val.primMedInfo}</div>
                    </div>
                  );
                }
              })()}
              <h4>Blood Testing / Biomarkers</h4>
              {(() => {
                if (val.Hemo_Test === 1) {
                  return (
                    <div>
                      <div> Hemoglobin Test: True</div>
                      <div> Hemoglobin Test Notes: {val.hemoInfo}</div>
                    </div>
                  );
                }
              })()}
              {(() => {
                if (val.Comp_Blood_Prof === 1) {
                  return (
                    <div>
                      <div> Complete Blood Profile: True</div>
                      <div>
                        Complete Blood Profile Notes: {val.compBloodInfo}
                      </div>
                    </div>
                  );
                }
              })()}
              {(() => {
                if (val.Meta_Panel === 1) {
                  return (
                    <div>
                      <div> Metabolism Panel: True</div>
                      <div> Metabolism Panel Notes: {val.metaInfo}</div>
                    </div>
                  );
                }
              })()}
              {(() => {
                if (val.TIBC === 1) {
                  return (
                    <div>
                      <div> TIBC: True</div>
                      <div> TIBC Notes: {val.TIBCInfo}</div>
                    </div>
                  );
                }
              })()}
              {(() => {
                if (val.Creatine_Kinase === 1) {
                  return (
                    <div>
                      <div> Creatine Kinase Test: True</div>
                      <div>
                        Creatine Kinase Test Notes: {val.creatineKinaseInfo}
                      </div>
                    </div>
                  );
                }
              })()}
              <div>Other Information: {val.other}</div>
              <h4>Physiological Testing</h4>
              {(() => {
                if (val.VO2_Lactate === 1) {
                  return (
                    <div>
                      <div> VO2 Lactate Test: True</div>
                      <div> VO2 Lactate Test Notes: {val.VO2LactateInfo}</div>
                    </div>
                  );
                }
              })()}
              {(() => {
                if (val.VO2_Thresh === 1) {
                  return (
                    <div>
                      <div> VO2 Threshold Test: True</div>
                      <div> Vo2 Threshold Test Notes: {val.VO2ThreshInfo}</div>
                    </div>
                  );
                }
              })()}
              {(() => {
                if (val.Lactate_Thresh === 1) {
                  return (
                    <div>
                      <div> Lactate Threshold Test: True</div>
                      <div>
                        Lactate Threshold Test Notes: {val.LactateThreshInfo}
                      </div>
                    </div>
                  );
                }
              })()}
              {(() => {
                if (val.Supp_O2 === 1) {
                  return (
                    <div>
                      <div> Supplemental O2: True</div>
                      <div> Supplemental O2 Notes: {val.suppO2Info}</div>
                    </div>
                  );
                }
              })()}
              <h4>Sports Nutrition</h4>
              {(() => {
                if (val.Int_train_diet_analysis === 1) {
                  return (
                    <div>
                      <div> Integrated training and dietary analysis: True</div>
                      <div>
                        Integrate training and dietary analysis Notes:
                        {val.dietAnalysisInfo}
                      </div>
                    </div>
                  );
                }
              })()}
              {(() => {
                if (val.Nutrition_Group_Pres_WS === 1) {
                  return (
                    <div>
                      <div> Nutrition Group Presentation Workshop: True</div>
                      <div>
                        Nutrition Group Presentation Workshop Notes:
                        {val.nutritionWSInfo}
                      </div>
                    </div>
                  );
                }
              })()}
              <h4>Sport Psychology / Mental Performance</h4>
              {(() => {
                if (val.Indiv_Pysch_consult === 1) {
                  return (
                    <div>
                      <div> Individual Psych Consultation: True</div>
                      <div>
                        Individual Psych Consultation Notes:
                        {val.psychConsultInfo}
                      </div>
                    </div>
                  );
                }
              })()}
              {(() => {
                if (val.Pysch_Group_Pres_WS === 1) {
                  return (
                    <div>
                      <div> Psych Group Presentation Workshop: True</div>
                      <div>
                        Psych Group Presentation Workshop Notes:
                        {val.psychWSInfo}
                      </div>
                    </div>
                  );
                }
              })()}
              {(() => {
                if (val.Meeting_Space === 1) {
                  return (
                    <div>
                      <div> Meeting Space: True</div>
                      <div> Meeting Space Notes: {val.meetingInfo}</div>
                    </div>
                  );
                }
              })()}
              {(() => {
                if (val.Equip_Stored === 1) {
                  return (
                    <div>
                      <div> Equipment Storage: True</div>
                      <div> Equipment Storage Notes: {val.equipInfo}</div>
                    </div>
                  );
                }
              })()}
              {(() => {
                if (val.Day_Trip_Excur === 1) {
                  return (
                    <div>
                      <div> Day Trip Excursion: True</div>
                      <div> Day Trip Excursion Notes: {val.dayTripInfo}</div>
                    </div>
                  );
                }
              })()}
              {(() => {
                if (val.Team_Build_Excer === 1) {
                  return (
                    <div>
                      <div> Team Building Exercise: True</div>
                      <div>
                        Team Building Exercise Notes: {val.teamBuildInfo}
                      </div>
                    </div>
                  );
                }
              })()}
              {(() => {
                if (val.otherInfo === 1) {
                  return (
                    <div>
                      <div> Notes: {val.otherInfoText}</div>
                    </div>
                  );
                }
              })()}
              <h1>Setup Calendar</h1>

              <div>
                <select
                  value={tempTitle}
                  onChange={(event) => {
                    setNewEvent({
                      ...newEvent,
                      title: `${val.Team_Name} - ${val.Camp_ID} - ${event.target.value}`,
                    });

                    tempTitle = event.target.value;
                    displayAmountOfPeopleTextBox(event);
                    displayPriceTextBox(event);
                  }}
                >
                  <option value="50m Aquatic Center LC Lanes">
                    50m Aquatic Center LC Lanes
                  </option>

                  <option value="50m Aquatic Center SC Lanes">
                    50m Aquatic Center SC Lanes
                  </option>

                  <option value="400m Outdoor Track (8-lane)">
                    400m Outdoor Track (8-lane)
                  </option>
                  <option value="300m Indoor Track (6-lane)">
                    300m Indoor Track (6-lane)
                  </option>
                  <option value="University Gym">University Gym</option>
                  <option value="Hypo2 Gym">Hypo2 Gym</option>
                  <option value="Outdoor Fields Grass">
                    Outdoor Fields Grass
                  </option>
                  <option value="Outdoor Fields Artificial Turf">
                    Outdoor Fields Artificial Turf
                  </option>
                  <option value="Indoor Field">Indoor Field</option>
                  <option value="High Speed Treadmill">
                    High Speed Treadmill
                  </option>
                  <option value="Massage Therapy">Massage Therapy</option>
                  <option value="Physiotherapy/Chiropractic Rehab/Prehab">
                    Physiotherapy/Chiropractic Rehab/Prehab
                  </option>
                  <option value="Strength & Conditioning Coaching">
                    Strength & Conditioning Coaching
                  </option>
                  <option value="Orthopaedic Care">Orthopaedic Care</option>
                  <option value="Primary Medical Care">
                    Primary Medical Care
                  </option>
                  <option value="Total Hemoglobin Mass Testing">
                    Total Hemoglobin Mass Testing (via CO Rebreathing Method)
                  </option>
                  <option value="Complete Blood Profile (includes RBC, WBC, Hematocrit, Hemoglobin, etc.) ">
                    Complete Blood Profile (includes RBC, WBC, Hematocrit,
                    Hemoglobin, etc.)
                  </option>
                  <option value="Comprehensive Metabolic Panel">
                    Comprehensive Metabolic Panel
                  </option>
                  <option value="Ferritin/Iron/Total iron Binding Capacity">
                    Ferritin/Iron/Total iron Binding Capacity
                  </option>
                  <option value="Creatine Kinase (CK/CPK)">
                    Creatine Kinase (CK/CPK)
                  </option>
                  <option value="VO2 & Lactate Combined">
                    VO2 & Lactate Combined
                  </option>
                  <option value="VO2 Threshold">VO2 Threshold</option>
                  <option value="Lactate Threshold">Lactate Threshold</option>
                  <option value="Supplemental O2 for Training / Recovery">
                    Supplemental O2 for Training / Recovery
                  </option>
                  <option value="Integrated Training and Dietary Analysis ">
                    Integrated Training and Dietary Analysis
                  </option>
                  <option value="Group Presentation or Workshop">
                    Group Presentation or Workshop
                  </option>
                  <option value="Individual Consultation">
                    Individual Consultation
                  </option>
                  <option value="Team Focus Session">Team Focus Session</option>
                  <option value="Group Presentation or Workshop">
                    Group Presentation or Workshop
                  </option>
                  <option value="Other">Other</option>
                </select>

                <div>
                  <textarea
                    placeholder="Comment if needed"
                    placename="Comments"
                    onChange={(event) => {
                      setNewEvent({
                        ...newEvent,
                        comment: event.target.value,
                      });
                    }}
                    cols="50"
                    rows="10"
                  ></textarea>
                </div>

                <div id="amountOfPeople">
                  <input
                    type="number"
                    placeholder="Amount of people"
                    onChange={(event) =>
                      setNewEvent({
                        ...newEvent,
                        amountOfPeople: event.target.value,
                      })
                    }
                  ></input>
                </div>

                <div id="priceForService" className="hidden-text">
                  <input
                    type="number"
                    placeholder="Price for service"
                    onChange={(event) =>
                      setNewEvent({ ...newEvent, price: event.target.value })
                    }
                  />
                </div>

                <DatePicker
                  placeholderText="Start Date"
                  dateFormat="MM/dd/yyyy  EE hh:mm a"
                  showTimeSelect
                  selected={newEvent.start}
                  onChange={(start) => setNewEvent({ ...newEvent, start })}
                />
                <DatePicker
                  placeholderText="End Date"
                  dateFormat="MM/dd/yyyy  EE hh:mm a"
                  showTimeSelect
                  selected={newEvent.end}
                  onChange={(end) => setNewEvent({ ...newEvent, end })}
                />
                <button style={{ marginTop: "25px" }} onClick={handleAddEvent}>
                  Add Event
                </button>
              </div>

              <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                defaultDate={new Date(yearStart, monthStart, dayStart)}
                style={{ height: 700 }}
                eventPropGetter={eventStyleGetter}
                onSelectEvent={handleSelected}
              />

              <button onClick={backToCorrectHomePage}>
                return to home page
              </button>

              <button
                onClick={() => {
                  const CampID = getSessionStorage("campNumber");

                  console.log(CampID);

                  Axios.post("http://localhost:3001/setCampStatus", {
                    campID: CampID,
                    status: "Camp Confirmed",
                  }).then(() => {
                    setSessionStorage("campProgressType", "Camp Confirmed");
                    window.location.reload(false);
                  });
                }}
              >
                Confirm Camp
              </button>
            </div>
          );
        })}
      </div>
    );
  } else if (
    getSessionStorage("authenticated") === "true" &&
    (getSessionStorage("campProgressType") === "Camp Confirmed" ||
      getSessionStorage("campProgressType") === "Needs Assistance") &&
    (getSessionStorage("classification").toLowerCase() === "admin" ||
      getSessionStorage("classification").toLowerCase() === "client")
  ) {
    return (
      <div>
        {userInfo.map((val) => {
          const splitStartDate = val.Camp_Date_Start.split(/[- : T]/);

          const yearStart = splitStartDate[0];
          const monthStart = splitStartDate[1] - 1;
          const dayStart = splitStartDate[2];

          let tempTitle;

          return (
            <div key={val.Camp_ID}>
              <h1>
                Camp Page {val.Team_Name} - {val.Camp_ID}
              </h1>

              <button disabled={val.clicked}>Home Camp Page</button>
              <button disabled={val.clicked}>Roster</button>
              <button
                disabled={val.clicked}
                onClick={() => {
                  navigate("/CampPage/Summary");
                }}
              >
                Summary
              </button>
              <button disabled={val.clicked}>billing</button>
              <span>
                {getSessionStorage("classification").toLowerCase() ===
                "admin" ? (
                  <button>Admin Permissions</button>
                ) : null}
              </span>

              <div>
                <select
                  value={tempTitle}
                  onChange={(event) => {
                    setNewEvent({
                      ...newEvent,
                      title: `${val.Team_Name} - ${val.Camp_ID} - ${event.target.value}`,
                    });

                    tempTitle = event.target.value;
                    displayAmountOfPeopleTextBox(event);
                    displayPriceTextBox(event);
                  }}
                >
                  <option value="50m Aquatic Center LC Lanes">
                    50m Aquatic Center LC Lanes
                  </option>

                  <option value="50m Aquatic Center SC Lanes">
                    50m Aquatic Center SC Lanes
                  </option>

                  <option value="400m Outdoor Track (8-lane)">
                    400m Outdoor Track (8-lane)
                  </option>
                  <option value="300m Indoor Track (6-lane)">
                    300m Indoor Track (6-lane)
                  </option>
                  <option value="University Gym">University Gym</option>
                  <option value="Hypo2 Gym">Hypo2 Gym</option>
                  <option value="Outdoor Fields Grass">
                    Outdoor Fields Grass
                  </option>
                  <option value="Outdoor Fields Artificial Turf">
                    Outdoor Fields Artificial Turf
                  </option>
                  <option value="Indoor Field">Indoor Field</option>
                  <option value="High Speed Treadmill">
                    High Speed Treadmill
                  </option>
                  <option value="Massage Therapy">Massage Therapy</option>
                  <option value="Physiotherapy/Chiropractic Rehab/Prehab">
                    Physiotherapy/Chiropractic Rehab/Prehab
                  </option>
                  <option value="Strength & Conditioning Coaching">
                    Strength & Conditioning Coaching
                  </option>
                  <option value="Orthopaedic Care">Orthopaedic Care</option>
                  <option value="Primary Medical Care">
                    Primary Medical Care
                  </option>
                  <option value="Total Hemoglobin Mass Testing">
                    Total Hemoglobin Mass Testing (via CO Rebreathing Method)
                  </option>
                  <option value="Complete Blood Profile (includes RBC, WBC, Hematocrit, Hemoglobin, etc.) ">
                    Complete Blood Profile (includes RBC, WBC, Hematocrit,
                    Hemoglobin, etc.)
                  </option>
                  <option value="Comprehensive Metabolic Panel">
                    Comprehensive Metabolic Panel
                  </option>
                  <option value="Ferritin/Iron/Total iron Binding Capacity">
                    Ferritin/Iron/Total iron Binding Capacity
                  </option>
                  <option value="Creatine Kinase (CK/CPK)">
                    Creatine Kinase (CK/CPK)
                  </option>
                  <option value="VO2 & Lactate Combined">
                    VO2 & Lactate Combined
                  </option>
                  <option value="VO2 Threshold">VO2 Threshold</option>
                  <option value="Lactate Threshold">Lactate Threshold</option>
                  <option value="Supplemental O2 for Training / Recovery">
                    Supplemental O2 for Training / Recovery
                  </option>
                  <option value="Integrated Training and Dietary Analysis ">
                    Integrated Training and Dietary Analysis
                  </option>
                  <option value="Group Presentation or Workshop">
                    Group Presentation or Workshop
                  </option>
                  <option value="Individual Consultation">
                    Individual Consultation
                  </option>
                  <option value="Team Focus Session">Team Focus Session</option>
                  <option value="Group Presentation or Workshop">
                    Group Presentation or Workshop
                  </option>
                  <option value="Other">Other</option>
                </select>

                <div>
                  <textarea
                    placeholder="Comment if needed"
                    placename="Comments"
                    onChange={(event) => {
                      setNewEvent({
                        ...newEvent,
                        comment: event.target.value,
                      });
                    }}
                    cols="50"
                    rows="10"
                  ></textarea>
                </div>

                <div id="amountOfPeople">
                  <input
                    type="number"
                    placeholder="Amount of people"
                    onChange={(event) =>
                      setNewEvent({
                        ...newEvent,
                        amountOfPeople: event.target.value,
                      })
                    }
                  ></input>
                </div>

                <div id="priceForService" className="hidden-text">
                  <input
                    type="number"
                    placeholder="Price for service"
                    onChange={(event) =>
                      setNewEvent({ ...newEvent, price: event.target.value })
                    }
                  />
                </div>

                <DatePicker
                  placeholderText="Start Date"
                  dateFormat="MM/dd/yyyy  EE hh:mm a"
                  showTimeSelect
                  selected={newEvent.start}
                  onChange={(start) => setNewEvent({ ...newEvent, start })}
                />
                <DatePicker
                  placeholderText="End Date"
                  dateFormat="MM/dd/yyyy  EE hh:mm a"
                  showTimeSelect
                  selected={newEvent.end}
                  onChange={(end) => setNewEvent({ ...newEvent, end })}
                />
                <button style={{ marginTop: "25px" }} onClick={handleAddEvent}>
                  Add Event
                </button>
              </div>

              <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                defaultDate={new Date(yearStart, monthStart, dayStart)}
                style={{ height: 700 }}
                eventPropGetter={eventStyleGetter}
                onSelectEvent={handleSelected}
              />

              <button onClick={backToCorrectHomePage}>
                return to home page
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
