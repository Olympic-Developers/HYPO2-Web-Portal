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
} from "../Components/UserInfoAndAuth";

function App() {
  const locales = {
    "en-US": require("date-fns/locale/en-US"),
  };

  function handleAddEvent() {
    setAllEvents([...allEvents, newEvent]);
  }

  const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
  });

  const events = [];

  const [newEvent, setNewEvent] = useState({ title: "", start: "", end: "" });
  const [allEvents, setAllEvents] = useState(events);

  let navigate = useNavigate();

  const [userInfo, setGetInfo] = useState([]);

  useEffect(() => {
    if (authCheckCamp(navigate)) {
      getInfo();
    }
  });

  function backToCorrectHomePage() {
    if (getSessionStorage("classification").toLowerCase() === "admin") {
      navigate("/AdminProfile");
    } else {
      navigate("/ClientProfile");
    }
  }

  const getInfo = () => {
    Axios.get("http://localhost:3001/CampInfo", {
      params: { id: getSessionStorage("campNumber") },
    }).then((response) => {
      // put information into getUserCampsList array
      setGetInfo(response.data);
    });
  };

  if (
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
    getSessionStorage("campProgressType") ===
      "Pending Camp Confirmation Needed" &&
    getSessionStorage("classification").toLowerCase() === "admin"
  ) {
    return (
      <div>
        <h1>Camp Setup</h1>
        {userInfo.map((val) => {
          return (
            <div key={val.Camp_ID}>
              <h1>Camp Summary</h1>
              <h3>General Information</h3>
              <div>Team Name: {val.Team_Name}</div>
              <div>Camp Start: {val.Camp_Date_Start}</div>
              <div>Camp End: {val.Camp_Date_End}</div>
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
            </div>
          );
        })}

        <h1>Setup Calendar</h1>

        <div>
          <input
            type="text"
            placeholder="Add Title"
            value={newEvent.title}
            onChange={(e) =>
              setNewEvent({ ...newEvent, title: e.target.value })
            }
          />
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
          events={allEvents}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 700 }}
          onSelectEvent={() => navigate("/CampPage/Event")}
        />

        <button
          onClick={() => {
            navigate("/AdminProfile/PendingCamps");
          }}
        >
          Back to Profile Page
        </button>
      </div>
    );
  } else {
    return (
      <div>
        <h1>Camp Page</h1>
      </div>
    );
  }
}

export default App;
