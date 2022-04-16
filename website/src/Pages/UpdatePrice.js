import React, { useState, useEffect } from "react";
import Axios from "axios";
import { Auth } from "aws-amplify";
import { useNavigate } from "react-router-dom";
import { authCheckAdmin } from "../Components/UserInfoAndAuth";
import "../Style pages/dashBoard.css";
import SignInImage from "../Style pages/Images/SignInLogo.png";

function App() {
  // Set default value for navigate
  let navigate = useNavigate();
  const [didLoad, setDidLoad] = useState(false);

  function sendNewPrice() {
    Axios.post("http://localhost:3001/sendPrice", {
      newPrice: newPrice,
      colName: colName,
    }).then(() => {
      console.log("Success");
    });
  }
  // array for holding all camps information
  const [priceList, setPriceList] = useState([]);
  let [colName, setColName] = useState("");
  const [price, setPrice] = useState(0);
  const [newPrice, setNewPrice] = useState(0);

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

  useEffect(() => {
    if (!didLoad) {
      // checking if admin is the user trying to access this page
      if (authCheckAdmin(navigate)) {
        // get all camp information
        getPrice();
        setDidLoad(true);
      }
    }
  }, [navigate, didLoad]);

  const getPrice = () => {
    Axios.get("http://localhost:3001/Prices").then((response) => {
      // put information into getUserCampsList array
      setPriceList(response.data);
    });
  };

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
          Sign Out
        </button>
      </div>
      <div class="rightContent">
        <div class="update">
          <h1>Update Prices</h1>
          <p>Update Price of Services</p>
          <select
            id="updateBilling"
            name="updateBilling"
            onChange={(event) => {
              setColName(event.target.value);
              setPrice(priceList[0][event.target.value]);
            }}
          >
            <option value="Select Price Point">Select Price</option>
            <option value="Hotel_Jan_Apr">Hotel_Jan_Apr</option>
            <option value="Hotel_May_Oct">Hotel_May_Oct</option>
            <option value="Hotel_Nov_Dec">Hotel_Nov_Dec</option>
            <option value="Extended_Hotel_Jan_Apr_Studio">
              Extended_Hotel_Jan_Apr_Studio
            </option>
            <option value="Extended_Hotel_Jan_Apr_2Bed">
              Extended_Hotel_Jan_Apr_2Bed
            </option>
            <option value="Extended_Hotel_May_Studio">
              Extended_Hotel_May_Studio
            </option>
            <option value="Extended_Hotel_May_2Bed">
              Extended_Hotel_May_2Bed
            </option>
            <option value="Extended_Hotel_June_July_Studio">
              Extended_Hotel_June_July_Studio
            </option>
            <option value="Extended_Hotel_June_July_2Bed">
              Extended_Hotel_June_July_2Bed
            </option>
            <option value="Extended_Hotel_Aug_Sep_Studio">
              Extended_Hotel_Aug_Sep_Studio
            </option>
            <option value="Extended_Hotel_Aug_Sep_2Bed">
              Extended_Hotel_Aug_Sep_2Bed
            </option>
            <option value="Extended_Hotel_Oct_Dec_Studio">
              Extended_Hotel_Oct_Dec_Studio
            </option>
            <option value="Extended_Hotel_Oct_Dec_2Bed">
              Extended_Hotel_Oct_Dec_2Bed
            </option>
            <option value="University_Cafeteria_Breakfast">
              University_Cafeteria_Breakfast
            </option>
            <option value="University_Cafeteria_Lunch">
              University_Cafeteria_Lunch
            </option>
            <option value="University_Cafeteria_Dinner">
              University_Cafeteria_Dinner
            </option>
            <option value="Catering_Sport_Ten_Less">
              Catering_Sport_Ten_Less
            </option>
            <option value="Catering_Sport_11_15">Catering_Sport_11_15</option>
            <option value="Catering_Sport_16_20">Catering_Sport_16_20</option>
            <option value="Catering_Sport_21_26">Catering_Sport_21_26</option>
            <option value="Catering_Sport_27">Catering_Sport_27</option>
            <option value="Charter_12">Charter_12</option>
            <option value="Charter_50">Charter_50</option>
            <option value="Individual_Shuttle">Individual_Shuttle</option>
            <option value="Rental_Vehicle">Rental_Vehicle</option>
            <option value="University_Parking">University_Parking</option>
            <option value="Aquatic_Center_LC">Aquatic_Center_LC</option>
            <option value="Aquatic_Center_SC">Aquatic_Center_SC</option>
            <option value="Outdoor_Track">Outdoor_Track</option>
            <option value="University_Gym">University_Gym</option>
            <option value="Hypo2_Gym">Hypo2_Gym</option>
            <option value="Outdoor_Fields">Outdoor_Fields</option>
            <option value="High_Speed_Treadmill">High_Speed_Treadmill</option>
            <option value="Massage_Therapy_1_10">Massage_Therapy_1_10</option>
            <option value="Massage_Therapy_10">Massage_Therapy_10</option>
            <option value="Physio_Chiro">Physio_Chiro</option>
            <option value="Strength_Conditioning_Coach">
              Strength_Conditioning_Coach
            </option>
            <option value="Orthopaedic_Care">Orthopaedic_Care</option>
            <option value="Primary_Medical_Care">Primary_Medical_Care</option>
            <option value="Hemoglobin_Mass_Testing">
              Hemoglobin_Mass_Testing
            </option>
            <option value="Metabolic_Profile">Metabolic_Profile</option>
            <option value="Ferritin_Iron_Binding_Capacity">
              Ferritin_Iron_Binding_Capacity
            </option>
            <option value="Other_Testing">Other_Testing</option>
            <option value="Supplemental_O2">Supplemental_O2</option>
            <option value="Integrated_Training_Dietary_Analysis">
              Integrated_Training_Dietary_Analysis
            </option>
            <option value="Group_Presentation_Workshop_Nutrition">
              Group_Presentation_Workshop_Nutrition
            </option>
            <option value="Group_Presentation_Workshop_Psychology">
              Group_Presentation_Workshop_Psychology
            </option>
            <option value="Tax">Tax</option>
          </select>
          <p class="currentPrice">Current Price: ${price}</p>
          <span className="info-block">
            <p>New Price: </p>
            <input
              type="number"
              name="name"
              onChange={(event) => {
                setNewPrice(event.target.value);
              }}
            />
          </span>
          <button
            onClick={() => {
              sendNewPrice();
            }}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
