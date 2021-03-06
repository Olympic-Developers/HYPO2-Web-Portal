import React, { useState, useEffect } from "react";
import "../Style pages/IntakeStyle.css";
import Axios from "axios";
import { authCheckClient } from "../Components/UserInfoAndAuth";
import { useNavigate } from "react-router-dom";
import { getSessionStorage } from "../Components/UserInfoAndAuth";
import "../Style pages/dashBoard.css";
import SignInImage from "../Style pages/Images/SignInLogo.png";

function Intake() {
  // Set default value for navigate
  let navigate = useNavigate();

  useEffect(() => {
    // checking if client is the user trying to access this page
    authCheckClient(navigate);
  });

  // function for hiding information blocks for check boxes
  function checkBoxUpdate(event) {
    // get input
    let Input = document.getElementById(
      event.currentTarget.dataset.id + "Input"
    );

    // checking if element is shown
    if (Input.style.display === "block") {
      // hide element
      Input.style.display = "none";
    }
    // element is hidden
    else {
      // show element
      Input.style.display = "block";
    }
  }

  // GeneralIntake Table Declarations
  const [teamName, setTeamName] = useState("");
  const [startDate, setStartDate] = useState({
    varOne: new Date(),
  });
  const [endDate, setEndDate] = useState({
    varTwo: new Date(),
  });
  const [numPerson, setNumPerson] = useState("");
  const [country, setCountry] = useState("");
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [onSiteName, setOnSiteName] = useState("");
  const [onSiteEmail, setOnSiteEmail] = useState("");
  const [onSitePhone, setOnSitePhone] = useState("");

  // CampCoreNeeds Table Declarations
  const [hotelAccom, setHotelAccom] = useState(false);
  const [hotelAccomInfo, setHotelAccomInfo] = useState("");
  const [condoAccom, setCondoAccom] = useState(0);
  const [condoAccomInfo, setCondoAccomInfo] = useState("");
  const [condoAmountInfo, setCondoAmountInfo] = useState();
  const [univCafeteria, setUnivCafeteria] = useState(false);
  const [univCafeteriaInfo, setunivCafeteriaInfo] = useState("");
  const [catering, setCatering] = useState(false);
  const [cateringInfo, setCateringInfo] = useState("");
  const [charterTransport, setCharterTransport] = useState(false);
  const [charterTransportInfo, setCharterTransportInfo] = useState("");
  const [indivShuttle, setIndivShuttle] = useState(false);
  const [indivShuttleInfo, setIndivShuttleInfo] = useState("");
  const [rental, setRental] = useState(false);
  const [rentalInfo, setRentalInfo] = useState("");
  const [permit, setPermit] = useState(false);
  const [permitInfo, setPermitInfo] = useState("");
  const [pool50M, setPool50M] = useState(0);
  const [track400M, setTrack400M] = useState(false);
  const [track400Info, setTrack400Info] = useState("");
  const [track300M, setTrack300M] = useState(false);
  const [track300Info, setTrack300Info] = useState("");
  const [gym, setGym] = useState(false);
  const [gymInfo, setGymInfo] = useState("");
  const [outdoorFieldGrass, setOutdoorFieldGrass] = useState(false);
  const [OFGInfo, setOFGInfo] = useState("");
  const [outdoorFieldTurf, setOutdoorFieldTurf] = useState(false);
  const [OFTInfo, setOFTInfo] = useState("");
  const [indoorFieldTurf, setIndoorFieldTurf] = useState(false);
  const [IFTInfo, setIFTInfo] = useState("");
  const [courtSpace, setCourtSpace] = useState(false);
  const [courtUsage, setCourtUsage] = useState(0);
  const [antiGravTread, setAntiGravTread] = useState(false);
  const [AGTInfo, setAGTInfo] = useState("");

  // AdditionalServices table Declarations
  const [massageTherapy, setMassageTherapy] = useState(false);
  const [massageInfo, setMassageInfo] = useState("");
  const [physioTherapy, setPhysioTherapy] = useState(false);
  const [physioInfo, setPhysioInfo] = useState("");
  const [strengthCond, setStrengthCond] = useState(false);
  const [strengthInfo, setStrengthInfo] = useState("");
  const [orthoCare, setOrthoCare] = useState(false);
  const [orthoInfo, setOrthoInfo] = useState("");
  const [primMedCare, setPrimMedCare] = useState(false);
  const [primMedInfo, setPrimMedInfo] = useState("");
  const [hemoTest, setHemoTest] = useState(false);
  const [hemoInfo, setHemoInfo] = useState("");
  const [compBloodProf, setCompBloodProf] = useState(false);
  const [compBloodInfo, setcompBloodInfo] = useState("");
  const [metaPanel, setMetaPanel] = useState(false);
  const [metaInfo, setMetaInfo] = useState("");
  const [TBIC, setTBIC] = useState(false);
  const [TBICInfo, setTBICInfo] = useState("");
  const [creatineKinase, setCreatineKinase] = useState(false);
  const [creatineKinaseInfo, setCreatineKinaseInfo] = useState("");
  const [VO2Lactate, setVO2Lactate] = useState(false);
  const [VO2LactateInfo, setVO2LactateInfo] = useState("");
  const [VO2Thresh, setVO2Thresh] = useState(false);
  const [VO2ThreshInfo, setVO2ThreshInfo] = useState("");
  const [LactateThresh, setLactateThresh] = useState(false);
  const [LactateThreshInfo, setLactateThreshInfo] = useState("");
  const [suppO2, setSuppO2] = useState(false);
  const [suppO2Info, setsuppO2Info] = useState("");
  const [intTrainDietAnalysis, setIntTrainDietAnalysis] = useState(false);
  const [dietAnalysisInfo, setdietAnalysisInfo] = useState("");
  const [nutritionGroupPresWS, setNutritionGroupPresWS] = useState(false);
  const [nutritionWSInfo, setNutritionWSInfo] = useState("");
  const [individualPyschConsult, setIndividualPyschConsult] = useState(false);
  const [psychConsultInfo, setPsychConsultInfo] = useState("");
  const [pyschGroupPresWS, setPyschGroupPresWS] = useState(false);
  const [psychWSInfo, setPsychWSInfo] = useState("");
  const [focusSession, setFocusSession] = useState(false);
  const [focusInfo, setFocusInfo] = useState("");
  const [meetingSpace, setMeetingSpace] = useState(false);
  const [meetingInfo, setMeetingInfo] = useState("");
  const [equipStored, setEquipStored] = useState(false);
  const [equipInfo, setEquipInfo] = useState("");
  const [dayTripExcur, setDayTripExcur] = useState(false);
  const [dayTripInfo, setDayTripInfo] = useState("");
  const [teamBuildExcer, setTeamBuildExcer] = useState(false);
  const [teamBuildInfo, setTeamBuildInfo] = useState("");
  const [otherInfo, setOtherInfo] = useState(false);
  const [otherInfoText, setOtherInfoText] = useState("");
  const [other, setOther] = useState(false);
  const [otherText, setOtherText] = useState("");
  const [status, setStatus] = useState("");

  // for submitting form and uploading form information to database
  const submit = () => {
    // checking if required values are entered
    if (
      teamName !== "" &&
      // I know this looks weird but when the value is not set it is not undefined
      // however when it is undefined
      startDate.varOne === undefined &&
      endDate.varTwo === undefined &&
      numPerson !== "" &&
      country !== "" &&
      contactName !== "" &&
      contactEmail !== "" &&
      contactPhone !== ""
    ) {
      // push info to database
      Axios.post("http://localhost:3001/intake", {
        // GeneralIntake Table Posts
        teamName: teamName,
        startDate: startDate,
        endDate: endDate,
        numPerson: numPerson,
        country: country,
        contactName: contactName,
        contactEmail: contactEmail,
        contactPhone: contactPhone,
        onSiteName: onSiteName,
        onSiteEmail: onSiteEmail,
        onSitePhone: onSitePhone,

        // CoreCampNeeds Table Posts
        hotelAccom: hotelAccom,
        condoAccom: condoAccom,
        univCafeteria: univCafeteria,
        catering: catering,
        charterTransport: charterTransport,
        indivShuttle: indivShuttle,
        rental: rental,
        permit: permit,
        pool50M: pool50M,
        track400M: track400M,
        track300M: track300M,
        gym: gym,
        outdoorFieldGrass: outdoorFieldGrass,
        outdoorFieldTurf: outdoorFieldTurf,
        indoorFieldTurf: indoorFieldTurf,
        courtSpace: courtSpace,
        courtUsage: courtUsage,
        antiGravTread: antiGravTread,

        // AdditionalServices Table Posts
        massageTherapy: massageTherapy,
        physioTherapy: physioTherapy,
        strengthCond: strengthCond,
        orthoCare: orthoCare,
        primMedCare: primMedCare,
        hemoTest: hemoTest,
        compBloodProf: compBloodProf,
        metaPanel: metaPanel,
        TBIC: TBIC,
        creatineKinase: creatineKinase,
        VO2Lactate: VO2Lactate,
        VO2Thresh: VO2Thresh,
        LactateThresh: LactateThresh,
        suppO2: suppO2,
        intTrainDietAnalysis: intTrainDietAnalysis,
        nutritionGroupPresWS: nutritionGroupPresWS,
        individualPyschConsult: individualPyschConsult,
        pyschGroupPresWS: pyschGroupPresWS,
        focusSession: focusSession,
        meetingSpace: meetingSpace,
        equipStored: equipStored,
        dayTripExcur: dayTripExcur,
        teamBuildExcer: teamBuildExcer,
        otherInfo: otherInfo,
        other: other,
        status: status,

        //Info
        hotelAccomInfo: hotelAccomInfo,
        condoAccomInfo: condoAccomInfo,
        condoAmountInfo: condoAmountInfo,
        univCafeteriaInfo: univCafeteriaInfo,
        cateringInfo: cateringInfo,
        charterTransportInfo: charterTransportInfo,
        indivShuttleInfo: indivShuttleInfo,
        rentalInfo: rentalInfo,
        permitInfo: permitInfo,
        track400Info: track400Info,
        track300Info: track300Info,
        gymInfo: gymInfo,
        OFGInfo: OFGInfo,
        OFTInfo: OFTInfo,
        IFTInfo: IFTInfo,
        AGTInfo: AGTInfo,
        massageInfo: massageInfo,
        physioInfo: physioInfo,
        strengthInfo: strengthInfo,
        orthoInfo: orthoInfo,
        primMedInfo: primMedInfo,
        hemoInfo: hemoInfo,
        compBloodInfo: compBloodInfo,
        metaInfo: metaInfo,
        TBICInfo: TBICInfo,
        creatineKinaseInfo: creatineKinaseInfo,
        VO2LactateInfo: VO2LactateInfo,
        VO2ThreshInfo: VO2ThreshInfo,
        LactateThreshInfo: LactateThreshInfo,
        suppO2Info: suppO2Info,
        dietAnalysisInfo: dietAnalysisInfo,
        nutritionWSInfo: nutritionWSInfo,
        psychConsultInfo: psychConsultInfo,
        psychWSInfo: psychWSInfo,
        focusInfo: focusInfo,
        meetingInfo: meetingInfo,
        equipInfo: equipInfo,
        dayTripInfo: dayTripInfo,
        teamBuildInfo: teamBuildInfo,
        otherText: otherText,
        otherInfoText: otherInfoText,
      }).then(() => {
        navigate("/ClientProfile/Summary");
        console.log("Success");
      });
    } else {
      // let user know they are missing important information
      alert("You are missing one of the required values");
    }
  };

  // checking for proper user
  if (
    getSessionStorage("authenticated") === "true" &&
    getSessionStorage("classification").toLowerCase() === "client"
  ) {
    return (
      <div>
        <div class="navbar">
          <img src={SignInImage} alt="HYPO2 Logo"></img>
          <button onClick={submit}>Submit</button>
          <button
            onClick={() => {
              navigate("/ClientProfile");
            }}
          >
            Back to Profile Page
          </button>
        </div>
        <div class="rightContent">
          <div class="general">
            <h1 class="intakeHeader">General Information</h1>

            <span className="info-block">
              <h2>Team Name: {getSessionStorage("username").toLowerCase()}</h2>
            </span>

            <span className="info-block">
              <label class="intakeLabel">Start Date:</label>
              <input
                type="date"
                name="name"
                onChange={(event) => {
                  setStartDate(event.target.value);
                  setTeamName(getSessionStorage("username").toLowerCase());
                  setStatus("Pending Camp Confirmation Needed");
                }}
              />
            </span>

            <span className="info-block">
              <label class="intakeLabel">End Date: </label>
              <input
                type="date"
                name="name"
                onChange={(event) => {
                  setEndDate(event.target.value);
                }}
              />
            </span>

            <span className="info-block">
              <label class="intakeLabel">Number of Personnel: </label>
              <input
                type="number"
                name="name"
                onChange={(event) => {
                  setNumPerson(event.target.value);
                }}
              />
            </span>

            <span className="info-block">
              <label class="intakeLabel">Home Country </label>
              <select
                id="country"
                name="country"
                onChange={(event) => {
                  setCountry(event.target.value);
                }}
              >
                <option value="Afghanistan">Afghanistan</option>
                <option value="Albania">Albania</option>
                <option value="Algeria">Algeria</option>
                <option value="American Samoa">American Samoa</option>
                <option value="Andorra">Andorra</option>
                <option value="Angola">Angola</option>
                <option value="Anguilla">Anguilla</option>
                <option value="Antigua & Barbuda">Antigua & Barbuda</option>
                <option value="Argentina">Argentina</option>
                <option value="Armenia">Armenia</option>
                <option value="Aruba">Aruba</option>
                <option value="Australia">Australia</option>
                <option value="Austria">Austria</option>
                <option value="Azerbaijan">Azerbaijan</option>
                <option value="Bahamas">Bahamas</option>
                <option value="Bahrain">Bahrain</option>
                <option value="Bangladesh">Bangladesh</option>
                <option value="Barbados">Barbados</option>
                <option value="Belarus">Belarus</option>
                <option value="Belgium">Belgium</option>
                <option value="Belize">Belize</option>
                <option value="Benin">Benin</option>
                <option value="Bermuda">Bermuda</option>
                <option value="Bhutan">Bhutan</option>
                <option value="Bolivia">Bolivia</option>
                <option value="Bonaire">Bonaire</option>
                <option value="Bosnia & Herzegovina">
                  Bosnia & Herzegovina
                </option>
                <option value="Botswana">Botswana</option>
                <option value="Brazil">Brazil</option>
                <option value="British Indian Ocean Ter">
                  British Indian Ocean Ter
                </option>
                <option value="Brunei">Brunei</option>
                <option value="Bulgaria">Bulgaria</option>
                <option value="Burkina Faso">Burkina Faso</option>
                <option value="Burundi">Burundi</option>
                <option value="Cambodia">Cambodia</option>
                <option value="Cameroon">Cameroon</option>
                <option value="Canada">Canada</option>
                <option value="Canary Islands">Canary Islands</option>
                <option value="Cape Verde">Cape Verde</option>
                <option value="Cayman Islands">Cayman Islands</option>
                <option value="Central African Republic">
                  Central African Republic
                </option>
                <option value="Chad">Chad</option>
                <option value="Channel Islands">Channel Islands</option>
                <option value="Chile">Chile</option>
                <option value="China">China</option>
                <option value="Christmas Island">Christmas Island</option>
                <option value="Cocos Island">Cocos Island</option>
                <option value="Colombia">Colombia</option>
                <option value="Comoros">Comoros</option>
                <option value="Congo">Congo</option>
                <option value="Cook Islands">Cook Islands</option>
                <option value="Costa Rica">Costa Rica</option>
                <option value="Cote DIvoire">Cote DIvoire</option>
                <option value="Croatia">Croatia</option>
                <option value="Cuba">Cuba</option>
                <option value="Curacao">Curacao</option>
                <option value="Cyprus">Cyprus</option>
                <option value="Czech Republic">Czech Republic</option>
                <option value="Denmark">Denmark</option>
                <option value="Djibouti">Djibouti</option>
                <option value="Dominica">Dominica</option>
                <option value="Dominican Republic">Dominican Republic</option>
                <option value="East Timor">East Timor</option>
                <option value="Ecuador">Ecuador</option>
                <option value="Egypt">Egypt</option>
                <option value="El Salvador">El Salvador</option>
                <option value="Equatorial Guinea">Equatorial Guinea</option>
                <option value="Eritrea">Eritrea</option>
                <option value="Estonia">Estonia</option>
                <option value="Ethiopia">Ethiopia</option>
                <option value="Falkland Islands">Falkland Islands</option>
                <option value="Faroe Islands">Faroe Islands</option>
                <option value="Fiji">Fiji</option>
                <option value="Finland">Finland</option>
                <option value="France">France</option>
                <option value="French Guiana">French Guiana</option>
                <option value="French Polynesia">French Polynesia</option>
                <option value="French Southern Ter">French Southern Ter</option>
                <option value="Gabon">Gabon</option>
                <option value="Gambia">Gambia</option>
                <option value="Georgia">Georgia</option>
                <option value="Germany">Germany</option>
                <option value="Ghana">Ghana</option>
                <option value="Gibraltar">Gibraltar</option>
                <option value="Great Britain">Great Britain</option>
                <option value="Greece">Greece</option>
                <option value="Greenland">Greenland</option>
                <option value="Grenada">Grenada</option>
                <option value="Guadeloupe">Guadeloupe</option>
                <option value="Guam">Guam</option>
                <option value="Guatemala">Guatemala</option>
                <option value="Guinea">Guinea</option>
                <option value="Guyana">Guyana</option>
                <option value="Haiti">Haiti</option>
                <option value="Hawaii">Hawaii</option>
                <option value="Honduras">Honduras</option>
                <option value="Hong Kong">Hong Kong</option>
                <option value="Hungary">Hungary</option>
                <option value="Iceland">Iceland</option>
                <option value="Indonesia">Indonesia</option>
                <option value="India">India</option>
                <option value="Iran">Iran</option>
                <option value="Iraq">Iraq</option>
                <option value="Ireland">Ireland</option>
                <option value="Isle of Man">Isle of Man</option>
                <option value="Israel">Israel</option>
                <option value="Italy">Italy</option>
                <option value="Jamaica">Jamaica</option>
                <option value="Japan">Japan</option>
                <option value="Jordan">Jordan</option>
                <option value="Kazakhstan">Kazakhstan</option>
                <option value="Kenya">Kenya</option>
                <option value="Kiribati">Kiribati</option>
                <option value="Korea North">Korea North</option>
                <option value="Korea Sout">Korea South</option>
                <option value="Kuwait">Kuwait</option>
                <option value="Kyrgyzstan">Kyrgyzstan</option>
                <option value="Laos">Laos</option>
                <option value="Latvia">Latvia</option>
                <option value="Lebanon">Lebanon</option>
                <option value="Lesotho">Lesotho</option>
                <option value="Liberia">Liberia</option>
                <option value="Libya">Libya</option>
                <option value="Liechtenstein">Liechtenstein</option>
                <option value="Lithuania">Lithuania</option>
                <option value="Luxembourg">Luxembourg</option>
                <option value="Macau">Macau</option>
                <option value="Macedonia">Macedonia</option>
                <option value="Madagascar">Madagascar</option>
                <option value="Malaysia">Malaysia</option>
                <option value="Malawi">Malawi</option>
                <option value="Maldives">Maldives</option>
                <option value="Mali">Mali</option>
                <option value="Malta">Malta</option>
                <option value="Marshall Islands">Marshall Islands</option>
                <option value="Martinique">Martinique</option>
                <option value="Mauritania">Mauritania</option>
                <option value="Mauritius">Mauritius</option>
                <option value="Mayotte">Mayotte</option>
                <option value="Mexico">Mexico</option>
                <option value="Midway Islands">Midway Islands</option>
                <option value="Moldova">Moldova</option>
                <option value="Monaco">Monaco</option>
                <option value="Mongolia">Mongolia</option>
                <option value="Montserrat">Montserrat</option>
                <option value="Morocco">Morocco</option>
                <option value="Mozambique">Mozambique</option>
                <option value="Myanmar">Myanmar</option>
                <option value="Nambia">Nambia</option>
                <option value="Nauru">Nauru</option>
                <option value="Nepal">Nepal</option>
                <option value="Netherland Antilles">Netherland Antilles</option>
                <option value="Netherlands">
                  Netherlands (Holland, Europe)
                </option>
                <option value="Nevis">Nevis</option>
                <option value="New Caledonia">New Caledonia</option>
                <option value="New Zealand">New Zealand</option>
                <option value="Nicaragua">Nicaragua</option>
                <option value="Niger">Niger</option>
                <option value="Nigeria">Nigeria</option>
                <option value="Niue">Niue</option>
                <option value="Norfolk Island">Norfolk Island</option>
                <option value="Norway">Norway</option>
                <option value="Oman">Oman</option>
                <option value="Pakistan">Pakistan</option>
                <option value="Palau Island">Palau Island</option>
                <option value="Palestine">Palestine</option>
                <option value="Panama">Panama</option>
                <option value="Papua New Guinea">Papua New Guinea</option>
                <option value="Paraguay">Paraguay</option>
                <option value="Peru">Peru</option>
                <option value="Philippines">Philippines</option>
                <option value="Pitcairn Island">Pitcairn Island</option>
                <option value="Poland">Poland</option>
                <option value="Portugal">Portugal</option>
                <option value="Puerto Rico">Puerto Rico</option>
                <option value="Qatar">Qatar</option>
                <option value="Republic of Montenegro">
                  Republic of Montenegro
                </option>
                <option value="Republic of Serbia">Republic of Serbia</option>
                <option value="Reunion">Reunion</option>
                <option value="Romania">Romania</option>
                <option value="Russia">Russia</option>
                <option value="Rwanda">Rwanda</option>
                <option value="St Barthelemy">St Barthelemy</option>
                <option value="St Eustatius">St Eustatius</option>
                <option value="St Helena">St Helena</option>
                <option value="St Kitts-Nevis">St Kitts-Nevis</option>
                <option value="St Lucia">St Lucia</option>
                <option value="St Maarten">St Maarten</option>
                <option value="St Pierre & Miquelon">
                  St Pierre & Miquelon
                </option>
                <option value="St Vincent & Grenadines">
                  St Vincent & Grenadines
                </option>
                <option value="Saipan">Saipan</option>
                <option value="Samoa">Samoa</option>
                <option value="Samoa American">Samoa American</option>
                <option value="San Marino">San Marino</option>
                <option value="Sao Tome & Principe">Sao Tome & Principe</option>
                <option value="Saudi Arabia">Saudi Arabia</option>
                <option value="Senegal">Senegal</option>
                <option value="Seychelles">Seychelles</option>
                <option value="Sierra Leone">Sierra Leone</option>
                <option value="Singapore">Singapore</option>
                <option value="Slovakia">Slovakia</option>
                <option value="Slovenia">Slovenia</option>
                <option value="Solomon Islands">Solomon Islands</option>
                <option value="Somalia">Somalia</option>
                <option value="South Africa">South Africa</option>
                <option value="Spain">Spain</option>
                <option value="Sri Lanka">Sri Lanka</option>
                <option value="Sudan">Sudan</option>
                <option value="Suriname">Suriname</option>
                <option value="Swaziland">Swaziland</option>
                <option value="Sweden">Sweden</option>
                <option value="Switzerland">Switzerland</option>
                <option value="Syria">Syria</option>
                <option value="Tahiti">Tahiti</option>
                <option value="Taiwan">Taiwan</option>
                <option value="Tajikistan">Tajikistan</option>
                <option value="Tanzania">Tanzania</option>
                <option value="Thailand">Thailand</option>
                <option value="Togo">Togo</option>
                <option value="Tokelau">Tokelau</option>
                <option value="Tonga">Tonga</option>
                <option value="Trinidad & Tobago">Trinidad & Tobago</option>
                <option value="Tunisia">Tunisia</option>
                <option value="Turkey">Turkey</option>
                <option value="Turkmenistan">Turkmenistan</option>
                <option value="Turks & Caicos Is">Turks & Caicos Is</option>
                <option value="Tuvalu">Tuvalu</option>
                <option value="Uganda">Uganda</option>
                <option value="United Kingdom">United Kingdom</option>
                <option value="Ukraine">Ukraine</option>
                <option value="United Arab Erimates">
                  United Arab Emirates
                </option>
                <option value="United States of America">
                  United States of America
                </option>
                <option value="Uraguay">Uruguay</option>
                <option value="Uzbekistan">Uzbekistan</option>
                <option value="Vanuatu">Vanuatu</option>
                <option value="Vatican City State">Vatican City State</option>
                <option value="Venezuela">Venezuela</option>
                <option value="Vietnam">Vietnam</option>
                <option value="Virgin Islands (Brit)">
                  Virgin Islands (Brit)
                </option>
                <option value="Virgin Islands (USA)">
                  Virgin Islands (USA)
                </option>
                <option value="Wake Island">Wake Island</option>
                <option value="Wallis & Futana Is">Wallis & Futana Is</option>
                <option value="Yemen">Yemen</option>
                <option value="Zaire">Zaire</option>
                <option value="Zambia">Zambia</option>
                <option value="Zimbabwe">Zimbabwe</option>
              </select>
            </span>

            <span className="info-block">
              <label class="intakeLabel">Name of Main Contact Person: </label>
              <input
                type="text"
                name="name"
                onChange={(event) => {
                  setContactName(event.target.value);
                }}
              />
            </span>

            <span className="info-block">
              <label class="intakeLabel">Main Contact Person E-mail:</label>
              <input
                type="text"
                name="name"
                onChange={(event) => {
                  setContactEmail(event.target.value);
                }}
              />
            </span>

            <span className="info-block">
              <label class="intakeLabel">Main Contact Person Phone:</label>
              <input
                type="tel"
                name="name"
                onChange={(event) => {
                  setContactPhone(event.target.value);
                }}
              />
            </span>

            <span className="info-block">
              <label class="intakeLabel">
                Name of On-site Contact Person (if different than above):
              </label>
              <input
                type="text"
                name="name"
                onChange={(event) => {
                  setOnSiteName(event.target.value);
                }}
              />
            </span>

            <span className="info-block">
              <label class="intakeLabel">On-site Contact Person E-mail: </label>
              <input
                type="text"
                name="name"
                onChange={(event) => {
                  setOnSiteEmail(event.target.value);
                }}
              />
            </span>

            <span className="info-block">
              <label class="intakeLabel">
                On-site Contact Person Mobile Number:{" "}
              </label>
              <input
                type="text"
                name="name"
                onChange={(event) => {
                  setOnSitePhone(event.target.value);
                }}
              />
            </span>

            <h1 className="head-section-header" class="intakeHeader">
              Core Training Camp Needs
            </h1>
            <p className="sub-section-para">
              (please check all desired training camp options)
            </p>
          </div>
          <div class="core">
            <h3>Accommodations</h3>

            <span className="info-block">
              <input
                type="checkbox"
                onClick={checkBoxUpdate}
                data-id={"hotelCheckBox"}
                onChange={(event) => {
                  setHotelAccom(event.target.checked);
                }}
              />
              <label>
                Hotel-style with full amenities (Located within walking distance
                to university training venues)
              </label>

              <div
                id="hotelCheckBoxInput"
                className="hidden-text details-block"
              >
                <label>details if needed:</label>
                <input
                  type="text"
                  placeholder="How Many Units (each unit sleeps 2-3)"
                  onChange={(event) => {
                    setHotelAccomInfo(event.target.value);
                  }}
                />
              </div>
            </span>

            <span className="info-block">
              <input
                type="checkbox"
                onClick={checkBoxUpdate}
                data-id={"condoCheckBox"}
                onChange={(event) => {
                  setCondoAccom(event.target.checked);
                }}
              />
              <label>
                Condo/House with kitchen (NOT located within walking distance to
                university training venues)
              </label>

              <div
                id="condoCheckBoxInput"
                className="hidden-text details-block"
              >
                <label>details if needed:</label>
                <select
                  id="country"
                  name="country"
                  onChange={(event) => {
                    setCondoAccomInfo(event.target.value);
                  }}
                >
                  <option value="select type"> Select A Condo Type</option>
                  <option value="2 Bedroom"> 2 Bedroom</option>
                  <option value="studio"> Studio</option>
                </select>
                <label>Condo Amount:</label>
                <input
                  type="number"
                  onChange={(event) => {
                    setCondoAmountInfo(event.target.value);
                  }}
                />
              </div>
            </span>

            <h3>Food/ Dining Services</h3>

            <span className="info-block">
              <input
                type="checkbox"
                onClick={checkBoxUpdate}
                data-id={"cafeCheckBox"}
                onChange={(event) => {
                  setUnivCafeteria(event.target.checked);
                }}
              />
              <label>University cafeteria (all-you-can-eat buffet)</label>

              <div id="cafeCheckBoxInput" className="hidden-text details-block">
                <label>details if needed:</label>
                <input
                  type="text"
                  onChange={(event) => {
                    setunivCafeteriaInfo(event.target.value);
                  }}
                />
              </div>
            </span>

            <span className="info-block">
              <input
                type="checkbox"
                onClick={checkBoxUpdate}
                data-id={"cateringCheckBox"}
                onChange={(event) => {
                  setCatering(event.target.checked);
                }}
              />
              <label>
                Catering with sport-nutrition-specific menu (formulated in
                consultation with team nutritionist)
              </label>

              <div
                id="cateringCheckBoxInput"
                className="hidden-text details-block"
              >
                <label>details if needed:</label>
                <input
                  type="text"
                  onChange={(event) => {
                    setCateringInfo(event.target.value);
                  }}
                />
              </div>
            </span>

            <h3>Ground Transportation</h3>

            <span className="info-block">
              <input
                type="checkbox"
                onClick={checkBoxUpdate}
                data-id={"charterCheckBox"}
                onChange={(event) => {
                  setCharterTransport(event.target.checked);
                }}
              />
              <label>
                Charter Transport from Phoenix or Flagstaff Airport (private
                charter with unlimited capacity)
              </label>

              <div
                id="charterCheckBoxInput"
                className="hidden-text details-block"
              >
                <label>details if needed:</label>
                <input
                  type="text"
                  onChange={(event) => {
                    setCharterTransportInfo(event.target.value);
                  }}
                />
              </div>
            </span>

            <span className="info-block">
              <input
                type="checkbox"
                onClick={checkBoxUpdate}
                data-id={"shuttleCheckBox"}
                onChange={(event) => {
                  setIndivShuttle(event.target.checked);
                }}
              />
              <label>
                Individual shuttle Transport from Phoenix or Flagstaff Airport
                (Max capacity 14 people/shuttle)
              </label>

              <div
                id="shuttleCheckBoxInput"
                className="hidden-text details-block"
              >
                <label>details if needed:</label>
                <input
                  type="text"
                  onChange={(event) => {
                    setIndivShuttleInfo(event.target.value);
                  }}
                />
              </div>
            </span>

            <span className="info-block">
              <input
                type="checkbox"
                onClick={checkBoxUpdate}
                data-id={"rentalCheckBox"}
                onChange={(event) => {
                  setRental(event.target.checked);
                }}
              />
              <label>Rental vehicles</label>

              <div
                id="rentalCheckBoxInput"
                className="hidden-text details-block"
              >
                <label>details if needed:</label>
                <input
                  type="text"
                  onChange={(event) => {
                    setRentalInfo(event.target.value);
                  }}
                />
              </div>
            </span>

            <span className="info-block">
              <input
                type="checkbox"
                onClick={checkBoxUpdate}
                data-id={"uniParkingCheckBox"}
                onChange={(event) => {
                  setPermit(event.target.checked);
                }}
              />
              <label>
                University Parking Permit (required for any rental vehicles
                parked on campus)
              </label>

              <div
                id="uniParkingCheckBoxInput"
                className="hidden-text details-block"
              >
                <label>details if needed:</label>
                <input
                  type="text"
                  onChange={(event) => {
                    setPermitInfo(event.target.value);
                  }}
                />
              </div>
            </span>

            <h3>Training Venues & Tools</h3>

            <span className="info-block">
              <input
                type="checkbox"
                onClick={checkBoxUpdate}
                data-id={"pool50MCheckBox"}
              />
              <label>50m Aquatic Center (10-lane LC pool)</label>

              <div
                id="pool50MCheckBoxInput"
                className="hidden-text details-block"
              >
                <label>Number of Lanes Needed?</label>
                <input
                  type="number"
                  onChange={(event) => {
                    setPool50M(event.target.value);
                  }}
                />
              </div>
            </span>

            <span className="info-block">
              <input
                type="checkbox"
                onClick={checkBoxUpdate}
                data-id={"track300MCheckBox"}
                onChange={(event) => {
                  setTrack300M(event.target.checked);
                }}
              />
              <label>300m Indoor Track (6-lane)</label>

              <div
                id="track300MCheckBoxInput"
                className="hidden-text details-block"
              >
                <label>Amount of Usage Anticipated?</label>
                <input
                  type="text"
                  onChange={(event) => {
                    setTrack300Info(event.target.value);
                  }}
                />
              </div>
            </span>

            <span className="info-block">
              <input
                type="checkbox"
                onClick={checkBoxUpdate}
                data-id={"track400MCheckBox"}
                onChange={(event) => {
                  setTrack400M(event.target.checked);
                }}
              />
              <label>400m Outdoor Track (8-lane)</label>

              <div
                id="track400MCheckBoxInput"
                className="hidden-text details-block"
              >
                <label>Amount of Usage Anticipated?</label>
                <input
                  type="text"
                  onChange={(event) => {
                    setTrack400Info(event.target.value);
                  }}
                />
              </div>
            </span>

            <span className="info-block">
              <input
                type="checkbox"
                onClick={checkBoxUpdate}
                data-id={"gymCheckBox"}
                onChange={(event) => {
                  setGym(event.target.checked);
                }}
              />
              <label>Gym (strength training/ cross training)</label>

              <div id="gymCheckBoxInput" className="hidden-text details-block">
                <label>Amount of Usage Anticipated?</label>
                <input
                  type="text"
                  onChange={(event) => {
                    setGymInfo(event.target.value);
                  }}
                />
              </div>
            </span>

            <span className="info-block">
              <input
                type="checkbox"
                onClick={checkBoxUpdate}
                data-id={"outdoorFieldGrassCheckBox"}
                onChange={(event) => {
                  setOutdoorFieldGrass(event.target.checked);
                }}
              />
              <label>Outdoor Fields (grass)</label>

              <div
                id="outdoorFieldGrassCheckBoxInput"
                className="hidden-text details-block"
              >
                <label>details if needed:</label>
                <input
                  type="text"
                  onChange={(event) => {
                    setOFGInfo(event.target.value);
                  }}
                />
              </div>
            </span>

            <span className="info-block">
              <input
                type="checkbox"
                onClick={checkBoxUpdate}
                data-id={"outdoorFieldTurfCheckBox"}
                onChange={(event) => {
                  setOutdoorFieldTurf(event.target.checked);
                }}
              />
              <label>Outdoor Fields (artificial turf)</label>
              <div
                id="outdoorFieldTurfCheckBoxInput"
                className="hidden-text details-block"
              >
                <label>details if needed:</label>
                <input
                  type="text"
                  onChange={(event) => {
                    setOFTInfo(event.target.value);
                  }}
                />
              </div>
            </span>

            <span className="info-block">
              <input
                type="checkbox"
                onClick={checkBoxUpdate}
                data-id={"indoorFieldTurfCheckBox"}
                onChange={(event) => {
                  setIndoorFieldTurf(event.target.checked);
                }}
              />
              <label>Indoor Fields (artificial turf only)</label>
              <div
                id="indoorFieldTurfCheckBoxInput"
                className="hidden-text details-block"
              >
                <label>details if needed:</label>
                <input
                  type="text"
                  onChange={(event) => {
                    setIFTInfo(event.target.value);
                  }}
                />
              </div>
            </span>

            <span className="info-block">
              <input
                type="checkbox"
                onClick={checkBoxUpdate}
                data-id={"courtSpaceCheckBox"}
                onChange={(event) => {
                  setCourtSpace(event.target.checked);
                }}
              />
              <label>Court Space (sport-specific)</label>
              <div
                id="courtSpaceCheckBoxInput"
                className="hidden-text details-block"
              >
                <label>Number of Courts Needed?</label>
                <input
                  type="number"
                  onChange={(event) => {
                    setCourtUsage(event.target.value);
                  }}
                />
              </div>
            </span>

            <span className="info-block">
              <input
                type="checkbox"
                onClick={checkBoxUpdate}
                data-id={"antiGravTreadCheckBox"}
                onChange={(event) => {
                  setAntiGravTread(event.target.checked);
                }}
              />
              <label>Alter G Anti-Gravity Treadmill</label>
              <div
                id="antiGravTreadCheckBoxInput"
                className="hidden-text details-block"
              >
                <label>details if needed:</label>
                <input
                  type="text"
                  onChange={(event) => {
                    setAGTInfo(event.target.value);
                  }}
                />
              </div>
            </span>
          </div>
          <div class="additional">
            <h1 className="head-section-header" class="intakeHeader">
              Additional High Performance Services
            </h1>

            <p className="sub-section-para">
              (please check all desired training camp options)
            </p>

            <h3>Sports Med Services</h3>

            <span className="info-block">
              <input
                type="checkbox"
                onClick={checkBoxUpdate}
                data-id={"massageCheckBox"}
                onChange={(event) => {
                  setMassageTherapy(event.target.checked);
                }}
              />
              <label>Massage Therapy</label>

              <div
                id="massageCheckBoxInput"
                className="hidden-text details-block"
              >
                <label>details if needed:</label>
                <input
                  type="text"
                  onChange={(event) => {
                    setMassageInfo(event.target.value);
                  }}
                />
              </div>
            </span>

            <span className="info-block">
              <input
                type="checkbox"
                onClick={checkBoxUpdate}
                data-id={"physiotherapyCheckBox"}
                onChange={(event) => {
                  setPhysioTherapy(event.target.checked);
                }}
              />
              <label>Physiotherapy/Chiropractic Rehab/Prehab</label>

              <div
                id="physiotherapyCheckBoxInput"
                className="hidden-text details-block"
              >
                <label>details if needed:</label>
                <input
                  type="text"
                  onChange={(event) => {
                    setPhysioInfo(event.target.value);
                  }}
                />
              </div>
            </span>

            <span className="info-block">
              <input
                type="checkbox"
                onClick={checkBoxUpdate}
                data-id={"strengthCoachCheckBox"}
                onChange={(event) => {
                  setStrengthCond(event.target.checked);
                }}
              />
              <label>Strength & Conditioning Coaching (Sport-Specific)</label>

              <div
                id="strengthCoachCheckBoxInput"
                className="hidden-text details-block"
              >
                <label>details if needed:</label>
                <input
                  type="text"
                  onChange={(event) => {
                    setStrengthInfo(event.target.value);
                  }}
                />
              </div>
            </span>

            <span className="info-block">
              <input
                type="checkbox"
                onClick={checkBoxUpdate}
                data-id={"orthopaedicCheckBox"}
                onChange={(event) => {
                  setOrthoCare(event.target.checked);
                }}
              />
              <label>Orthopaedic Care</label>

              <div
                id="orthopaedicCheckBoxInput"
                className="hidden-text details-block"
              >
                <label>details if needed:</label>
                <input
                  type="text"
                  onChange={(event) => {
                    setOrthoInfo(event.target.value);
                  }}
                />
              </div>
            </span>

            <span className="info-block">
              <input
                type="checkbox"
                onClick={checkBoxUpdate}
                data-id={"primaryMedicalCheckBox"}
                onChange={(event) => {
                  setPrimMedCare(event.target.checked);
                }}
              />
              <label>Primary Medical Care</label>

              <div
                id="primaryMedicalCheckBoxInput"
                className="hidden-text details-block"
              >
                <label>details if needed:</label>
                <input
                  type="text"
                  onChange={(event) => {
                    setPrimMedInfo(event.target.value);
                  }}
                />
              </div>
            </span>

            <h3>Blood Testing / Biomarkers</h3>

            <span className="info-block">
              <input
                type="checkbox"
                onClick={checkBoxUpdate}
                data-id={"hemoglobinCheckBox"}
                onChange={(event) => {
                  setHemoTest(event.target.checked);
                }}
              />
              <label>
                Total Hemoglobin Mass Testing (via CO Rebreathing method)
              </label>

              <div
                id="hemoglobinCheckBoxInput"
                className="hidden-text details-block"
              >
                <label>details if needed:</label>
                <input
                  type="text"
                  onChange={(event) => {
                    setHemoInfo(event.target.value);
                  }}
                />
              </div>
            </span>

            <span className="info-block">
              <input
                type="checkbox"
                onClick={checkBoxUpdate}
                data-id={"compBloodProfCheckBox"}
                onChange={(event) => {
                  setCompBloodProf(event.target.checked);
                }}
              />
              <label>
                Complete Blood Profile (includes RBC, WBC, Hematocrit,
                Hemoglobin, etc.)
              </label>

              <div
                id="compBloodProfCheckBoxInput"
                className="hidden-text details-block"
              >
                <label>details if needed:</label>
                <input
                  type="text"
                  onChange={(event) => {
                    setcompBloodInfo(event.target.value);
                  }}
                />
              </div>
            </span>

            <span className="info-block">
              <input
                type="checkbox"
                onClick={checkBoxUpdate}
                data-id={"metabolicCheckBox"}
                onChange={(event) => {
                  setMetaPanel(event.target.checked);
                }}
              />
              <label>
                Comprehensive Metabolic Panel (includes Albumin, Alkaline
                Phosphatase, ALT (SGPT), AST (SGOT), BUN, Calcium, Carbon
                Dioxide, Creatinine, Glucose, Potassium, Total Protein, Sodium,
                etc)
              </label>

              <div
                id="metabolicCheckBoxInput"
                className="hidden-text details-block"
              >
                <label>details if needed:</label>
                <input
                  type="text"
                  onChange={(event) => {
                    setMetaInfo(event.target.value);
                  }}
                />
              </div>
            </span>

            <span className="info-block">
              <input
                type="checkbox"
                onClick={checkBoxUpdate}
                data-id={"ferritinCheckBox"}
                onChange={(event) => {
                  setTBIC(event.target.checked);
                }}
              />
              <label>Ferritin/Iron/Total iron Binding Capacity (TIBC)</label>

              <div
                id="ferritinCheckBoxInput"
                className="hidden-text details-block"
              >
                <label>details if needed:</label>
                <input
                  type="text"
                  onChange={(event) => {
                    setTBICInfo(event.target.value);
                  }}
                />
              </div>
            </span>

            <span className="info-block">
              <input
                type="checkbox"
                onClick={checkBoxUpdate}
                data-id={"creatineCheckBox"}
                onChange={(event) => {
                  setCreatineKinase(event.target.checked);
                }}
              />
              <label>Creatine Kinase (CK/CPK)</label>

              <div
                id="creatineCheckBoxInput"
                className="hidden-text details-block"
              >
                <label>details if needed:</label>
                <input
                  type="text"
                  onChange={(event) => {
                    setCreatineKinaseInfo(event.target.value);
                  }}
                />
              </div>
            </span>

            <span className="info-block">
              <input
                type="checkbox"
                onClick={checkBoxUpdate}
                data-id={"otherBloodCheckBox"}
                onChange={(event) => {
                  setOther(event.target.checked);
                }}
              />
              <label>Other - Please specify</label>

              <div
                id="otherBloodCheckBoxInput"
                className="hidden-text details-block"
              >
                <label>details if needed:</label>
                <input
                  type="text"
                  onChange={(event) => {
                    setOtherText(event.target.value);
                  }}
                />
              </div>
            </span>

            <h3>Physiological Testing</h3>

            <span className="info-block">
              <input
                type="checkbox"
                onClick={checkBoxUpdate}
                data-id={"VO2LactateCheckBox"}
                onChange={(event) => {
                  setVO2Lactate(event.target.checked);
                }}
              />
              <label>VO2 & Lactate Combined</label>

              <div
                id="VO2LactateCheckBoxInput"
                className="hidden-text details-block"
              >
                <label>details if needed:</label>
                <input
                  type="text"
                  onChange={(event) => {
                    setVO2LactateInfo(event.target.value);
                  }}
                />
              </div>
            </span>

            <span className="info-block">
              <input
                type="checkbox"
                onClick={checkBoxUpdate}
                data-id={"VO2CheckBox"}
                onChange={(event) => {
                  setVO2Thresh(event.target.checked);
                }}
              />
              <label>VO2 Threshold</label>

              <div id="VO2CheckBoxInput" className="hidden-text details-block">
                <label>details if needed:</label>
                <input
                  type="text"
                  onChange={(event) => {
                    setVO2ThreshInfo(event.target.value);
                  }}
                />
              </div>
            </span>

            <span className="info-block">
              <input
                type="checkbox"
                onClick={checkBoxUpdate}
                data-id={"lactateCheckBox"}
                onChange={(event) => {
                  setLactateThresh(event.target.checked);
                }}
              />
              <label>Lactate Threshold</label>

              <div
                id="lactateCheckBoxInput"
                className="hidden-text details-block"
              >
                <label>details if needed:</label>
                <input
                  type="text"
                  onChange={(event) => {
                    setLactateThreshInfo(event.target.value);
                  }}
                />
              </div>
            </span>

            <span className="info-block">
              <input
                type="checkbox"
                onClick={checkBoxUpdate}
                data-id={"supplementalCheckBox"}
                onChange={(event) => {
                  setSuppO2(event.target.checked);
                }}
              />
              <label>Supplemental O2 for Training / Recovery</label>

              <div
                id="supplementalCheckBoxInput"
                className="hidden-text details-block"
              >
                <label>details if needed:</label>
                <input
                  type="text"
                  onChange={(event) => {
                    setsuppO2Info(event.target.value);
                  }}
                />
              </div>
            </span>

            <h3>Sport Nutrition</h3>

            <span className="info-block">
              <input
                type="checkbox"
                onClick={checkBoxUpdate}
                data-id={"integratedTrainingCheckBox"}
                onChange={(event) => {
                  setIntTrainDietAnalysis(event.target.checked);
                }}
              />
              <label>Integrated training and dietary analysis</label>

              <div
                id="integratedTrainingCheckBoxInput"
                className="hidden-text details-block"
              >
                <label>details if needed:</label>
                <input
                  type="text"
                  onChange={(event) => {
                    setdietAnalysisInfo(event.target.value);
                  }}
                />
              </div>
            </span>

            <span className="info-block">
              <input
                type="checkbox"
                onClick={checkBoxUpdate}
                data-id={"nutritionWorkshopCheckBox"}
                onChange={(event) => {
                  setNutritionGroupPresWS(event.target.checked);
                }}
              />
              <label>
                Nutrition WorkshopCheckBoxGroup Presentation or Workshop
              </label>

              <div
                id="nutritionWorkshopCheckBoxInput"
                className="hidden-text details-block"
              >
                <label>details if needed:</label>
                <input
                  type="text"
                  onChange={(event) => {
                    setNutritionWSInfo(event.target.value);
                  }}
                />
              </div>
            </span>

            <h3>Sport Psychology / Mental Performance</h3>

            <span className="info-block">
              <input
                type="checkbox"
                onClick={checkBoxUpdate}
                data-id={"individualConsultationCheckBox"}
                onChange={(event) => {
                  setIndividualPyschConsult(event.target.checked);
                }}
              />
              <label>Individual Consultation</label>

              <div
                id="individualConsultationCheckBoxInput"
                className="hidden-text details-block"
              >
                <label>details if needed:</label>
                <input
                  type="text"
                  onChange={(event) => {
                    setPsychConsultInfo(event.target.value);
                  }}
                />
              </div>
            </span>

            <span className="info-block">
              <input
                type="checkbox"
                onClick={checkBoxUpdate}
                data-id={"mentalWorkshopCheckBox"}
                onChange={(event) => {
                  setPyschGroupPresWS(event.target.checked);
                }}
              />
              <label>Mental Group Presentation or Workshop</label>

              <div
                id="mentalWorkshopCheckBoxInput"
                className="hidden-text details-block"
              >
                <label>details if needed:</label>
                <input
                  type="text"
                  onChange={(event) => {
                    setPsychWSInfo(event.target.value);
                  }}
                />
              </div>
            </span>

            <span className="info-block">
              <input
                type="checkbox"
                onClick={checkBoxUpdate}
                data-id={"focusSessionCheckBox"}
                onChange={(event) => {
                  setFocusSession(event.target.checked);
                }}
              />
              <label>Team Focus Session</label>

              <div
                id="focusSessionCheckBoxInput"
                className="hidden-text details-block"
              >
                <label>details if needed:</label>
                <input
                  type="text"
                  onChange={(event) => {
                    setFocusInfo(event.target.value);
                  }}
                />
              </div>
            </span>

            <h3>Miscellaneous Needs</h3>

            <span className="info-block">
              <input
                type="checkbox"
                onClick={checkBoxUpdate}
                data-id={"meetingRoomCheckBox"}
                onChange={(event) => {
                  setMeetingSpace(event.target.checked);
                }}
              />
              <label>
                Meeting room Space (for team meetings, on-site physio, etc.)
              </label>

              <div
                id="meetingRoomCheckBoxInput"
                className="hidden-text details-block"
              >
                <label>details if needed:</label>
                <input
                  type="text"
                  onChange={(event) => {
                    setMeetingInfo(event.target.value);
                  }}
                />
              </div>
            </span>

            <span className="info-block">
              <input
                type="checkbox"
                onClick={checkBoxUpdate}
                data-id={"equipmentStoredCheckBox"}
                onChange={(event) => {
                  setEquipStored(event.target.checked);
                }}
              />
              <label>
                Equipment stored with Hypo2 (from previous training camp)
              </label>

              <div
                id="equipmentStoredCheckBoxInput"
                className="hidden-text details-block"
              >
                <label>details if needed:</label>
                <input
                  type="text"
                  onChange={(event) => {
                    setEquipInfo(event.target.value);
                  }}
                />
              </div>
            </span>

            <span className="info-block">
              <input
                type="checkbox"
                onClick={checkBoxUpdate}
                data-id={"dayTripCheckBox"}
                onChange={(event) => {
                  setDayTripExcur(event.target.checked);
                }}
              />
              <label>Day Trips / Excursions</label>

              <div
                id="dayTripCheckBoxInput"
                className="hidden-text details-block"
              >
                <label>details if needed:</label>
                <input
                  type="text"
                  onChange={(event) => {
                    setDayTripInfo(event.target.value);
                  }}
                />
              </div>
            </span>

            <span className="info-block">
              <input
                type="checkbox"
                onClick={checkBoxUpdate}
                data-id={"teamExercisesCheckBox"}
                onChange={(event) => {
                  setTeamBuildExcer(event.target.checked);
                }}
              />
              <label>Team Building Exercises</label>

              <div
                id="teamExercisesCheckBoxInput"
                className="hidden-text details-block"
              >
                <label>details if needed:</label>
                <input
                  type="text"
                  onChange={(event) => {
                    setTeamBuildInfo(event.target.value);
                  }}
                />
              </div>
            </span>

            <span className="info-block">
              <input
                type="checkbox"
                onClick={checkBoxUpdate}
                data-id={"miscOtherCheckBox"}
                onChange={(event) => {
                  setOtherInfo(event.target.checked);
                }}
              />
              <label>Other (please specify)</label>

              <div
                id="miscOtherCheckBoxInput"
                className="hidden-text details-block"
              >
                <label>details if needed:</label>
                <input
                  type="text"
                  onChange={(event) => {
                    setOtherInfoText(event.target.value);
                  }}
                />
              </div>
            </span>
          </div>
        </div>
      </div>
    );
  }
  // not a proper user display nothing
  else {
    return null;
  }
}

export default Intake;
