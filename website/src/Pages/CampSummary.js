import React, { useState, useEffect } from "react";
import "../Style pages/IntakeStyle.css";
import Axios from "axios";
import { authCheckCamp } from "../Components/UserInfoAndAuth";
import { useNavigate } from "react-router-dom";
import { getSessionStorage } from "../Components/UserInfoAndAuth";
import "../Style pages/dashBoard.css";
import SignInImage from "../Style pages/Images/SignInLogo.png";
function App() {
  // Set default value for navigate
  let navigate = useNavigate();
  const [didLoad, setDidLoad] = useState(false);

  // array for holding summary information
  const [userInfo, setGetInfo] = useState([]);

  useEffect(() => {
    if (!didLoad) {
      // checking if admin is the user trying to access this page
      if (authCheckCamp(navigate)) {
        // get all user's camp information
        getInfo();
        setDidLoad(true);
      }
    }
  }, [navigate, didLoad]);

  function backToCorrectHomePage() {
    if (getSessionStorage("classification").toLowerCase() === "admin") {
      navigate("/AdminProfile");
    } else {
      navigate("/ClientProfile");
    }
  }

  // get summary information
  function getInfo() {
    Axios.get("/api/CampInfo", {
      params: { id: getSessionStorage("campNumber") },
    }).then((response) => {
      // put information into getUserCampsList array
      setGetInfo(response.data);
    });
  }

  // checking if it is the correct user
  if (
    getSessionStorage("authenticated") === "true" &&
    (getSessionStorage("classification").toLowerCase() === "client" ||
      getSessionStorage("classification").toLowerCase() === "admin")
  ) {
    return (
      <div>
        {userInfo.map((val) => {
          return (
            <div key={val.Camp_ID}>
              <div class="navbar">
                <img src={SignInImage} alt="HYPO2 Logo"></img>
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
                    "admin" &&
                  getSessionStorage("campProgressType") !== "Past Camp" ? (
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
              </div>
              <div class="rightContent">
                <h1>
                  Camp Page {val.Team_Name} - {val.Camp_ID}
                </h1>
                <div class="general">
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
                </div>
                <div class="core">
                  <h3>Core Camp Needs</h3>
                  {(() => {
                    if (val.Hotel_Accom === 1) {
                      return (
                        <div>
                          <div>Hotel Accommodations: True</div>
                          <div>
                            Hotel Accommodation Notes: {val.hotelAccomInfo}
                          </div>
                        </div>
                      );
                    } else {
                      return <div>Hotel Accommodations: False</div>;
                    }
                  })()}
                  {(() => {
                    if (val.Condo_Accom === 1) {
                      return (
                        <div>
                          <div>Condo Accommodations: True</div>
                          <div>
                            Condo Accommodation Notes: {val.condoAccomInfo}
                          </div>
                          <div>
                            Condo Accommodation Notes: {val.condoAmountInfo}
                          </div>
                        </div>
                      );
                    } else {
                      return <div>Condo Accommodations: False</div>;
                    }
                  })()}
                  {(() => {
                    if (val.Univ_Cafeteria === 1) {
                      return (
                        <div>
                          <div>University Cafeteria: True</div>
                          <div>
                            University Cafeteria Notes: {val.cafeteriaInfo}
                          </div>
                        </div>
                      );
                    } else {
                      return <div>University Cafeteria: False</div>;
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
                    } else {
                      return <div>Catering: False</div>;
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
                    } else {
                      return <div>Charter Transport: False</div>;
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
                    } else {
                      return <div>Individual Shuttle: False</div>;
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
                    } else {
                      return <div>Rental: False</div>;
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
                    } else {
                      return <div>University Paring Permit: False</div>;
                    }
                  })()}
                  <h4> Facilities</h4>
                  {/*Ask Camden if this is missing informatiosn*/}
                  <div>50M Aquatic Center Lanes: {val.Pool50M}</div>
                  {(() => {
                    if (val.Track400M === 1) {
                      return (
                        <div>
                          <div> Track 400M: True</div>
                          <div> Track 400M Notes: {val.track400Info}</div>
                        </div>
                      );
                    } else {
                      return <div>Track 400M: False</div>;
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
                    } else {
                      return <div>Track 300M: False</div>;
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
                    } else {
                      return <div>Gym: False</div>;
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
                    } else {
                      return <div>Outdoor Grass Field: False</div>;
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
                    } else {
                      return <div>Outdoor Turf Field: False</div>;
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
                    } else {
                      return <div>Indoor Turf Field: False</div>;
                    }
                  })()}
                  {(() => {
                    if (val.CourtSpace === 1) {
                      return <div>Court Space: True</div>;
                    } else {
                      return <div>Court Space: False</div>;
                    }
                  })()}
                  <div>Court Usage: {val.CourtUsage}</div>
                  {(() => {
                    if (val.AntiGravTread === 1) {
                      return (
                        <div>
                          <div> Anti Grav Treadmill: True</div>
                          <div> Anti Grav Treadmill Notes: {val.AGTInfo}</div>
                        </div>
                      );
                    } else {
                      return <div>Anti-gravity Treadmill: False</div>;
                    }
                  })()}
                </div>
                <div class="additional">
                  <h3> Additional Services </h3>
                  {(() => {
                    if (val.Massage_Therapy === 1) {
                      return (
                        <div>
                          <div> Massage Therapy: True</div>
                          <div> Massage Therapy Notes: {val.massageInfo}</div>
                        </div>
                      );
                    } else {
                      return <div>Massage Therapy: False</div>;
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
                    } else {
                      return <div>Physio Therapy: False</div>;
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
                    } else {
                      return <div>Strength and Conditioning: False</div>;
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
                    } else {
                      return <div>Orthopedic Care: False</div>;
                    }
                  })()}
                  {(() => {
                    if (val.Prim_Med_Care === 1) {
                      return (
                        <div>
                          <div> Primary Medical Care: True</div>
                          <div>
                            {" "}
                            Primary Medical Care Notes: {val.primMedInfo}
                          </div>
                        </div>
                      );
                    } else {
                      return <div>Primary Medical Care: False</div>;
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
                    } else {
                      return <div>Hemoglobin Test: False</div>;
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
                    } else {
                      return <div>Complete Blood Profile: False</div>;
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
                    } else {
                      return <div>Metabolism Panel: False</div>;
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
                    } else {
                      return <div>TIBC: False</div>;
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
                    } else {
                      return <div>Creatine Kinase Test: False</div>;
                    }
                  })()}
                  <div>Other Information: {val.other}</div>
                  <h4>Physiological Testing</h4>
                  {(() => {
                    if (val.VO2_Lactate === 1) {
                      return (
                        <div>
                          <div> VO2 Lactate Test: True</div>
                          <div>
                            {" "}
                            VO2 Lactate Test Notes: {val.VO2LactateInfo}
                          </div>
                        </div>
                      );
                    } else {
                      return <div>VO2 Lactate Test: False</div>;
                    }
                  })()}
                  {(() => {
                    if (val.VO2_Thresh === 1) {
                      return (
                        <div>
                          <div> VO2 Threshold Test: True</div>
                          <div>
                            {" "}
                            Vo2 Threshold Test Notes: {val.VO2ThreshInfo}
                          </div>
                        </div>
                      );
                    } else {
                      return <div>VO2 Threshold Test: False</div>;
                    }
                  })()}
                  {(() => {
                    if (val.Lactate_Thresh === 1) {
                      return (
                        <div>
                          <div> Lactate Threshold Test: True</div>
                          <div>
                            Lactate Threshold Test Notes:{" "}
                            {val.LactateThreshInfo}
                          </div>
                        </div>
                      );
                    } else {
                      return <div>Lactate Threshold Test: False</div>;
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
                    } else {
                      return <div>Supplemental O2: False</div>;
                    }
                  })()}
                  <h4>Sports Nutrition</h4>
                  {(() => {
                    if (val.Int_train_diet_analysis === 1) {
                      return (
                        <div>
                          <div>
                            {" "}
                            Integrated training and dietary analysis: True
                          </div>
                          <div>
                            Integrate training and dietary analysis Notes:
                            {val.dietAnalysisInfo}
                          </div>
                        </div>
                      );
                    } else {
                      return (
                        <div>
                          Integrated training and dietary analysis: False
                        </div>
                      );
                    }
                  })()}
                  {(() => {
                    if (val.Nutrition_Group_Pres_WS === 1) {
                      return (
                        <div>
                          <div>
                            {" "}
                            Nutrition Group Presentation Workshop: True
                          </div>
                          <div>
                            Nutrition Group Presentation Workshop Notes:
                            {val.nutritionWSInfo}
                          </div>
                        </div>
                      );
                    } else {
                      return (
                        <div>Nutrition Group Presentation Workshop: False</div>
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
                    } else {
                      return <div>Individual Psych Consultation: False</div>;
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
                    } else {
                      return (
                        <div>Psych Group Presentation Workshop: False</div>
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
                    } else {
                      return <div>Meeting Space: False</div>;
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
                    } else {
                      return <div>Equipment Storage: False</div>;
                    }
                  })()}
                  {(() => {
                    if (val.Day_Trip_Excur === 1) {
                      return (
                        <div>
                          <div> Day Trip Excursion: True</div>
                          <div>
                            {" "}
                            Day Trip Excursion Notes: {val.dayTripInfo}
                          </div>
                        </div>
                      );
                    } else {
                      return <div>Day Trip Excursion: False</div>;
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
                    } else {
                      return <div>Team Building Exercise: False</div>;
                    }
                  })()}
                  {(() => {
                    if (val.otherInfo === 1) {
                      return (
                        <div>
                          <div> Notes: {val.otherInfoText}</div>
                        </div>
                      );
                    } else {
                      return <div>Other Information: False</div>;
                    }
                  })()}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
  // not a proper user display nothing
  else {
    return null;
  }
}

export default App;
