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
  let accomPrice = 0;
  const [rentalPrice, setRentalPrice] = useState(0);
  const [events, setEvents] = useState([]);
  const [userInfo, setGetInfo] = useState([]);
  const [priceList, setPriceList] = useState([]);
  const [newEvent, setNewEvent] = useState({
    price: 0,
    amountOfPeople: 1,
    activityClass: "",
    title: "",
    comment: "",
    start: null,
    end: null,
    request: "",
  });
  const [tempTitle, setTempTitle] = useState("");

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
  const getPrice = () => {
    Axios.get("http://localhost:3001/Prices").then((response) => {
      // put information into getUserCampsList array
      setPriceList(response.data);
    });
  };
  useEffect(() => {
    if (!didLoad) {
      if (authCheckCamp(navigate)) {
        getUserCamps();
        getInfo();
        getPrice();
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
      actClass: newEvent.activityClass,
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

    if (
      getSessionStorage("campProgressType") ===
      "Pending Camp Confirmation Needed"
    ) {
      Axios.post("http://localhost:3001/updateInit", {
        campID: getSessionStorage("campNumber"),
        price: newEvent.price,
      }).then(() => {
        window.location.reload(false);
      });
    } else {
      Axios.post("http://localhost:3001/updateCurrent", {
        campID: getSessionStorage("campNumber"),
        price: newEvent.price,
      }).then(() => {
        window.location.reload(false);
      });
    }
  }

  function updateTransportPrice(price) {
    console.log(price);

    Axios.post("http://localhost:3001/updateTransport", {
      campID: getSessionStorage("campNumber"),
      price: price,
    }).then(() => {
      window.location.reload(false);
    });
  }

  function calcEventPrice() {
    if (tempTitle === "Cafeteria Buffet Breakfast") {
      newEvent.price =
        priceList[0].University_Cafeteria_Breakfast * newEvent.amountOfPeople;
    }
    if (tempTitle === "Cafeteria Buffet Lunch") {
      newEvent.price =
        priceList[0].University_Cafeteria_Lunch * newEvent.amountOfPeople;
    }
    if (tempTitle === "Cafeteria Buffet Dinner") {
      newEvent.price =
        priceList[0].University_Cafeteria_Dinner * newEvent.amountOfPeople;
    }
    if (tempTitle === "50m Aquatic Center LC Lanes") {
      newEvent.price = priceList[0].Aquatic_Center_LC * newEvent.amountOfPeople;
    }
    if (tempTitle === "50m Aquatic Center SC Lanes") {
      newEvent.price = priceList[0].Aquatic_Center_SC * newEvent.amountOfPeople;
    }
    if (tempTitle === "400m Outdoor track(8-lane)") {
      newEvent.price = priceList[0].Outdoor_Track * newEvent.amountOfPeople;
    }
    if (tempTitle === "300m Indoor Track(6-lane)") {
      newEvent.price = priceList[0].Outdoor_Track * newEvent.amountOfPeople;
    }
    if (tempTitle === "University Gym") {
      newEvent.price = priceList[0].University_Gym * newEvent.amountOfPeople;
    }
    if (tempTitle === "Hypo2 Gym") {
      newEvent.price = priceList[0].Hypo2_Gym * newEvent.amountOfPeople;
    }
    if (tempTitle === "High Speed Treadmill") {
      newEvent.price =
        priceList[0].High_Speed_Treadmill * newEvent.amountOfPeople;
    }
    if (tempTitle === "Massage Therapy" && newEvent.amountOfPeople <= 10) {
      newEvent.price =
        priceList[0].Massage_Therapy_1_10 * newEvent.amountOfPeople;
    }
    if (tempTitle === "Massage Therapy" && newEvent.amountOfPeople > 10) {
      newEvent.price =
        priceList[0].Massage_Therapy_10 * newEvent.amountOfPeople;
    }
    if (tempTitle === "Physiotherapy/Chiropractic Rehab/Prehab") {
      newEvent.price = priceList[0].Physio_Chiro * newEvent.amountOfPeople;
    }
    if (
      tempTitle === "Total Hemoglobin Mass Testing(via CO Rebreathing method)"
    ) {
      newEvent.price =
        priceList[0].Hemoglobin_Mass_Testing * newEvent.amountOfPeople;
    }
    if (
      tempTitle ===
      "Complete Blood Profile(includes RBC, WBC, Hematocrit, Hemoglobin, etc.)"
    ) {
      newEvent.price = priceList[0].Comp_Blood * newEvent.amountOfPeople;
    }
    if (tempTitle === "Comprehensive Metabolic Panel") {
      newEvent.price = priceList[0].Metabolic_Profile * newEvent.amountOfPeople;
    }
    if (tempTitle === "Ferritin/Total iron Binding Capacity") {
      newEvent.price =
        priceList[0].Ferritin_Iron_Binding_Capacity * newEvent.amountOfPeople;
    }
    if (tempTitle === "Creatine Kinase (CK/CPK)") {
      newEvent.price = priceList[0].CK_CPK * newEvent.amountOfPeople;
    }
    if (tempTitle === "VO2 & Lactate Combined") {
      newEvent.price = priceList[0].VO2_Lactate * newEvent.amountOfPeople;
    }
    if (tempTitle === "VO2 Threshold") {
      newEvent.price = priceList[0].VO2 * newEvent.amountOfPeople;
    }
    if (tempTitle === "Lactate Threshold") {
      newEvent.price = priceList[0].Lactate * newEvent.amountOfPeople;
    }
    if (tempTitle === "Supplemental O2 for Training/Recovery") {
      newEvent.price = priceList[0].Supplemental_O2 * newEvent.amountOfPeople;
    }
    if (tempTitle === "Integrated Training and Dietary Analysis") {
      newEvent.price =
        priceList[0].Integrated_Training_Dietary_Analysis *
        newEvent.amountOfPeople;
    }
    if (tempTitle === "Nutrition Group Presentation or Workshop") {
      newEvent.price =
        priceList[0].Group_Presentation_Workshop_Nutrition *
        newEvent.amountOfPeople;
    }
    if (tempTitle === "Mental Group Presentation or Workshop") {
      newEvent.price =
        priceList[0].Group_Presentation_Workshop_Psychology *
        newEvent.amountOfPeople;
    }
    if (tempTitle === "Individual Consultation") {
      newEvent.price = priceList[0].Consult * newEvent.amountOfPeople;
    }
    if (tempTitle === "Team Focus Session") {
      newEvent.price = priceList[0].Focus * newEvent.amountOfPeople;
    }
  }

  function handleAddEvent() {
    if (newEvent.start === null || newEvent.end === null || tempTitle === "") {
      alert(
        "Please make sure to enter a start and end date and select a event"
      );
      return;
    }

    if (Date.parse(newEvent.start) > Date.parse(newEvent.end)) {
      alert("Please make sure the end date is after the start date");
      return;
    }

    calcEventPrice();

    if (
      getSessionStorage("classification").toLowerCase() === "admin" &&
      newEvent.price === 0
    ) {
      alert("Please enter a price");
      return;
    }

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
  }

  function displayAmountOfPeopleTextBox(event) {
    const idOfService = event.target.value;
    let Input = document.getElementById("amountOfPeople");

    if (
      idOfService === "50m Aquatic Center LC Lanes" ||
      idOfService === "50m Aquatic Center SC Lanes" ||
      idOfService === "400m Outdoor Track (8-lane)" ||
      idOfService === "High Speed Treadmill" ||
      idOfService === "Outdoor Fields Grass" ||
      idOfService === "Outdoor Fields Artificial Turf" ||
      idOfService === "Indoor Field" ||
      idOfService === "Nutrition Group Presentation or Workshop" ||
      idOfService === "Team Focus Session" ||
      idOfService === "Mental Group Presentation or Workshop" ||
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
          function getAccomPrices() {
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

            let index = 0;

            if (val.Hotel_Accom === 1) {
              while (index < rangeOfDates.length) {
                if (
                  rangeOfDates[index] === 1 ||
                  rangeOfDates[index] === 2 ||
                  rangeOfDates[index] === 3 ||
                  rangeOfDates[index] === 4
                ) {
                  accomPrice += priceList[0].Hotel_Jan_Apr;
                } else if (
                  rangeOfDates[index] === 5 ||
                  rangeOfDates[index] === 6 ||
                  rangeOfDates[index] === 7 ||
                  rangeOfDates[index] === 8 ||
                  rangeOfDates[index] === 9 ||
                  rangeOfDates[index] === 10
                ) {
                  accomPrice += priceList[0].Hotel_May_Oct;
                } else {
                  accomPrice += priceList[0].Hotel_Nov_Dec;
                }
                index++;
              }
            }
            if (val.Condo_Accom === 1) {
              if (val.condoAccomInfo === "2 Bedroom") {
                while (index < rangeOfDates.length) {
                  if (
                    rangeOfDates[index] === 1 ||
                    rangeOfDates[index] === 2 ||
                    rangeOfDates[index] === 3 ||
                    rangeOfDates[index] === 4
                  ) {
                    accomPrice += priceList[0].Extended_Hotel_Jan_Apr_2Bed;
                  } else if (rangeOfDates[index] === 5) {
                    accomPrice += priceList[0].Extended_Hotel_May_2Bed;
                  } else if (
                    rangeOfDates[index] === 6 ||
                    rangeOfDates[index] === 7
                  ) {
                    accomPrice += priceList[0].Extended_Hotel_June_July_2Bed;
                  } else if (
                    rangeOfDates[index] === 8 ||
                    rangeOfDates[index] === 9
                  ) {
                    accomPrice += priceList[0].Extended_Hotel_Aug_Sep_2Bed;
                  } else {
                    accomPrice += priceList[0].Extended_Hotel_Oct_Dec_2Bed;
                  }
                  index++;
                }
              } else {
                while (index < rangeOfDates.length) {
                  if (
                    rangeOfDates[index] === 1 ||
                    rangeOfDates[index] === 2 ||
                    rangeOfDates[index] === 3 ||
                    rangeOfDates[index] === 4
                  ) {
                    accomPrice += priceList[0].Extended_Hotel_Jan_Apr_Studio;
                  } else if (rangeOfDates[index] === 5) {
                    accomPrice += priceList[0].Extended_Hotel_May_Studio;
                  } else if (
                    rangeOfDates[index] === 6 ||
                    rangeOfDates[index] === 7
                  ) {
                    accomPrice += priceList[0].Extended_Hotel_June_July_Studio;
                  } else if (
                    rangeOfDates[index] === 8 ||
                    rangeOfDates[index] === 9
                  ) {
                    accomPrice += priceList[0].Extended_Hotel_Aug_Sep_Studio;
                  } else {
                    accomPrice += priceList[0].Extended_Hotel_Oct_Dec_Studio;
                  }

                  index++;
                }
              }
            }
            Axios.post("http://localhost:3001/updateAccom", {
              campID: getSessionStorage("campNumber"),
              price: accomPrice,
            });
          }

          const splitStartDate = val.Camp_Date_Start.split(/[- : T]/);

          const yearStart = splitStartDate[0];
          const monthStart = splitStartDate[1] - 1;
          const dayStart = splitStartDate[2];

          const splitEndDate = val.Camp_Date_End.split(/[- : T]/);

          const yearEnd = splitEndDate[0];
          const monthEnd = splitEndDate[1] - 1;
          const dayEnd = splitEndDate[2];

          function setTitleAndActivityClass(event) {
            if (tempTitle === "Massage Therapy") {
              setNewEvent({
                ...newEvent,
                title: `${val.Team_Name} - ${val.Camp_ID} - ${event.target.value}`,
                activityClass: "Massage Therapy",
              });
            }
            // For Sport Psychology / Mental Performance
            else if (
              tempTitle === "Mental Group Presentation or Workshop" ||
              tempTitle === "Team Focus Session" ||
              tempTitle === "Individual Consultation"
            ) {
              setNewEvent({
                ...newEvent,
                title: `${val.Team_Name} - ${val.Camp_ID} - ${event.target.value}`,
                activityClass: "Sport Psychology / Mental Performance",
              });
            }
            // For Blood Testing
            else if (
              tempTitle === "Total Hemoglobin Mass Testing" ||
              tempTitle ===
                "Complete Blood Profile (includes RBC, WBC, Hematocrit, Hemoglobin, etc.)" ||
              tempTitle === "Comprehensive Metabolic Panel" ||
              tempTitle === "Ferritin/Iron/Total iron Binding Capacity" ||
              tempTitle === "Creatine Kinase (CK/CPK)"
            ) {
              setNewEvent({
                ...newEvent,
                title: `${val.Team_Name} - ${val.Camp_ID} - ${event.target.value}`,
                activityClass: "Blood Testing",
              });
            }
            // For Physiological Testing
            else if (
              tempTitle === "VO2 & Lactate Combined" ||
              tempTitle === "VO2 Threshold" ||
              tempTitle === "Lactate Threshold" ||
              tempTitle === "Supplemental O2 for Training / Recovery"
            ) {
              setNewEvent({
                ...newEvent,
                title: `${val.Team_Name} - ${val.Camp_ID} - ${event.target.value}`,
                activityClass: "Physiological Testing",
              });
            }
            // For Physiotherapy/Chiropractic Rehab/Prehab
            else if (tempTitle === "Physiotherapy/Chiropractic Rehab/Prehab") {
              setNewEvent({
                ...newEvent,
                title: `${val.Team_Name} - ${val.Camp_ID} - ${event.target.value}`,
                activityClass: "Physiotherapy/Chiropractic Rehab/Prehab",
              });
            }
            // For Strength & Conditioning Coaching
            else if (tempTitle === "Strength & Conditioning Coaching") {
              setNewEvent({
                ...newEvent,
                title: `${val.Team_Name} - ${val.Camp_ID} - ${event.target.value}`,
                activityClass: "Strength & Conditioning Coaching",
              });
            }
            // For Sport Nutrition
            else if (
              tempTitle === "Integrated Training and Dietary Analysis" ||
              tempTitle === "Nutrition Group Presentation or Workshop"
            ) {
              setNewEvent({
                ...newEvent,
                title: `${val.Team_Name} - ${val.Camp_ID} - ${event.target.value}`,
                activityClass: "Sport Nutrition",
              });
            }
            // For no job title
            else {
              setNewEvent({
                ...newEvent,
                title: `${val.Team_Name} - ${val.Camp_ID} - ${event.target.value}`,
                activityClass: "None",
              });
            }
          }

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
                      <div>
                        Condo Accommodation Notes: {val.condoAmountInfo}
                      </div>
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
                      <div>Individual Shuttle Notes: {val.shuttleInfo}</div>
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
                        <div id="priceForRental">
                          {val.transportPrice === 0 ? (
                            <div>
                              <input
                                type="number"
                                placeholder="Price for Rental Car"
                                onChange={(event) => {
                                  setRentalPrice(event.target.value);
                                }}
                              ></input>
                              <button
                                onClick={() => {
                                  updateTransportPrice(rentalPrice);
                                }}
                              >
                                Add Rental
                              </button>
                            </div>
                          ) : (
                            <div>
                              <p>Price has already been set for this service</p>
                            </div>
                          )}
                        </div>
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
                    setTempTitle(event.target.value);
                    setTitleAndActivityClass(event);
                    displayAmountOfPeopleTextBox(event);
                    displayPriceTextBox(event);
                  }}
                >
                  <option value="Select An Event">Select an Event</option>
                  <option value="Cafeteria Buffet Breakfast">
                    Cafeteria Buffet Breakfast
                  </option>
                  <option value="Cafeteria Buffet Lunch">
                    Cafeteria Buffet Lunch
                  </option>
                  <option value="Cafeteria Buffet Dinner">
                    Cafeteria Buffet Dinner
                  </option>
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
                  <option value="Complete Blood Profile (includes RBC, WBC, Hematocrit, Hemoglobin, etc.)">
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
                  <option value="Nutrition Group Presentation or Workshop">
                    Nutrition Group Presentation or Workshop
                  </option>
                  <option value="Individual Consultation">
                    Individual Consultation
                  </option>
                  <option value="Team Focus Session">Team Focus Session</option>
                  <option value="Mental Group Presentation or Workshop">
                    Mental Group Presentation or Workshop
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

                <div id="amountOfPeople" className="hidden-text">
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
                  getAccomPrices();

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

          function setTitleAndActivityClass(event) {
            if (tempTitle === "Massage Therapy") {
              setNewEvent({
                ...newEvent,
                title: `${val.Team_Name} - ${val.Camp_ID} - ${event.target.value}`,
                activityClass: "Massage Therapy",
              });
            }
            // For Sport Psychology / Mental Performance
            else if (
              tempTitle === "Mental Group Presentation or Workshop" ||
              tempTitle === "Team Focus Session" ||
              tempTitle === "Individual Consultation"
            ) {
              setNewEvent({
                ...newEvent,
                title: `${val.Team_Name} - ${val.Camp_ID} - ${event.target.value}`,
                activityClass: "Sport Psychology / Mental Performance",
              });
            }
            // For Blood Testing
            else if (
              tempTitle === "Total Hemoglobin Mass Testing" ||
              tempTitle ===
                "Complete Blood Profile (includes RBC, WBC, Hematocrit, Hemoglobin, etc.)" ||
              tempTitle === "Comprehensive Metabolic Panel" ||
              tempTitle === "Ferritin/Iron/Total iron Binding Capacity" ||
              tempTitle === "Creatine Kinase (CK/CPK)"
            ) {
              setNewEvent({
                ...newEvent,
                title: `${val.Team_Name} - ${val.Camp_ID} - ${event.target.value}`,
                activityClass: "Blood Testing",
              });
            }
            // For Physiological Testing
            else if (
              tempTitle === "VO2 & Lactate Combined" ||
              tempTitle === "VO2 Threshold" ||
              tempTitle === "Lactate Threshold" ||
              tempTitle === "Supplemental O2 for Training / Recovery"
            ) {
              setNewEvent({
                ...newEvent,
                title: `${val.Team_Name} - ${val.Camp_ID} - ${event.target.value}`,
                activityClass: "Physiological Testing",
              });
            }
            // For Physiotherapy/Chiropractic Rehab/Prehab
            else if (tempTitle === "Physiotherapy/Chiropractic Rehab/Prehab") {
              setNewEvent({
                ...newEvent,
                title: `${val.Team_Name} - ${val.Camp_ID} - ${event.target.value}`,
                activityClass: "Physiotherapy/Chiropractic Rehab/Prehab",
              });
            }
            // For Strength & Conditioning Coaching
            else if (tempTitle === "Strength & Conditioning Coaching") {
              setNewEvent({
                ...newEvent,
                title: `${val.Team_Name} - ${val.Camp_ID} - ${event.target.value}`,
                activityClass: "Strength & Conditioning Coaching",
              });
            }
            // For Sport Nutrition
            else if (
              tempTitle === "Integrated Training and Dietary Analysis" ||
              tempTitle === "Nutrition Group Presentation or Workshop"
            ) {
              setNewEvent({
                ...newEvent,
                title: `${val.Team_Name} - ${val.Camp_ID} - ${event.target.value}`,
                activityClass: "Sport Nutrition",
              });
            }
            // For no job title
            else {
              setNewEvent({
                ...newEvent,
                title: `${val.Team_Name} - ${val.Camp_ID} - ${event.target.value}`,
                activityClass: "None",
              });
            }
          }

          return (
            <div key={val.Camp_ID}>
              <h1>
                Camp Page {val.Team_Name} - {val.Camp_ID}
              </h1>

              <button
                onClick={() => {
                  navigate("/CampPage");
                }}
              >
                Home Camp Page
              </button>
              <button
                onClick={() => {
                  navigate("/CampPage/Roster");
                }}
              >
                Roster
              </button>
              <button
                onClick={() => {
                  navigate("/CampPage/Summary");
                }}
              >
                Summary
              </button>
              <button
                onClick={() => {
                  navigate("/CampPage/Billing");
                }}
              >
                Billing
              </button>
              <span>
                {getSessionStorage("classification").toLowerCase() ===
                "admin" ? (
                  <button
                    onClick={() => {
                      navigate("/CampPage/AdminPermissions");
                    }}
                  >
                    Admin Permissions
                  </button>
                ) : null}
              </span>

              <button onClick={backToCorrectHomePage}>
                Return To Home Page
              </button>

              <div>
                <select
                  value={tempTitle}
                  onChange={(event) => {
                    setTempTitle(event.target.value);
                    setTitleAndActivityClass(event);
                    displayAmountOfPeopleTextBox(event);
                    if (
                      getSessionStorage("classification").toLowerCase() ===
                      "admin"
                    ) {
                      displayPriceTextBox(event);
                    }
                  }}
                >
                  <option value="Select An Event">Select an Event</option>
                  <option value="Cafeteria Buffet Breakfast">
                    Cafeteria Buffet Breakfast
                  </option>
                  <option value="Cafeteria Buffet Lunch">
                    Cafeteria Buffet Lunch
                  </option>
                  <option value="Cafeteria Buffet Dinner">
                    Cafeteria Buffet Dinner
                  </option>
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
                  <option value="Complete Blood Profile (includes RBC, WBC, Hematocrit, Hemoglobin, etc.)">
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
                  <option value="Nutrition Group Presentation or Workshop">
                    Nutrition Group Presentation or Workshop
                  </option>
                  <option value="Individual Consultation">
                    Individual Consultation
                  </option>
                  <option value="Team Focus Session">Team Focus Session</option>
                  <option value="Mental Group Presentation or Workshop">
                    Mental Group Presentation or Workshop
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

                <div id="amountOfPeople" className="hidden-text">
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
            </div>
          );
        })}
      </div>
    );
  } else if (
    getSessionStorage("authenticated") === "true" &&
    getSessionStorage("campProgressType") === "Past Camp" &&
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

          return (
            <div>
              <h1>
                Camp Page {val.Team_Name} - {val.Camp_ID}
              </h1>

              <button
                onClick={() => {
                  navigate("/CampPage");
                }}
              >
                Home Camp Page
              </button>
              <button
                onClick={() => {
                  navigate("/CampPage/Roster");
                }}
              >
                Roster
              </button>
              <button
                onClick={() => {
                  navigate("/CampPage/Summary");
                }}
              >
                Summary
              </button>
              <button
                onClick={() => {
                  navigate("/CampPage/Billing");
                }}
              >
                Billing
              </button>

              <button onClick={backToCorrectHomePage}>
                Return To Home Page
              </button>

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
