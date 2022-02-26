import React, { useState, useEffect } from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import { authCheckAdmin } from "../Components/UserInfoAndAuth";

function App() {
  function currentPrice(colName) {
    if (colName === "Hotel_Jan_Apr") {
      colPrice = priceList[0].Hotel_Jan_Apr;
    }
    if (colName === "Hotel_May_Oct") {
      colPrice = priceList[0].Hotel_May_Oct;
    }
    if (colName === "Hotel_Nov_Dec") {
      colPrice = priceList[0].Hotel_Nov_Dec;
    }
    if (colName === "Extended_Hotel_Jan_Apr_Studio") {
      colPrice = priceList[0].Extended_Hotel_Jan_Apr_Studio;
    }
    if (colName === "Extended_Hotel_Jan_Apr_2Bed") {
      colPrice = priceList[0].Extended_Hotel_Jan_Apr_2Bed;
    }
    if (colName === "Extended_Hotel_May_Studio") {
      colPrice = priceList[0].Extended_Hotel_May_Studio;
    }
    if (colName === "Extended_Hotel_May_2Bed") {
      colPrice = priceList[0].Extended_Hotel_May_2Bed;
    }
    if (colName === "Extended_Hotel_June_July_Studio") {
      colPrice = priceList[0].Extended_Hotel_June_July_Studio;
    }
    if (colName === "Extended_Hotel_June_July_2Bed") {
      colPrice = priceList[0].Extended_Hotel_June_July_2Bed;
    }
    if (colName === "Extended_Hotel_Aug_Sep_Studio") {
      colPrice = priceList[0].Extended_Hotel_Aug_Sep_Studio;
    }
    if (colName === "Extended_Hotel_Aug_Sep_2Bed") {
      colPrice = priceList[0].Extended_Hotel_Aug_Sep_2Bed;
    }
    if (colName === "Extended_Hotel_Oct_Dec_Studio") {
      colPrice = priceList[0].Extended_Hotel_Oct_Dec_Studio;
    }
    if (colName === "Extended_Hotel_Oct_Dec_2Bed") {
      colPrice = priceList[0].Extended_Hotel_Oct_Dec_2Bed;
    }
    if (colName === "University_Cafeteria_Breakfast") {
      colPrice = priceList[0].University_Cafeteria_Breakfast;
    }
    if (colName === "University_Cafeteria_Lunch") {
      colPrice = priceList[0].University_Cafeteria_Lunch;
    }
    if (colName === "University_Cafeteria_Dinner") {
      colPrice = priceList[0].University_Cafeteria_Dinner;
    }
    if (colName === "Catering_Sport_Ten_Less") {
      colPrice = priceList[0].Catering_Sport_Ten_Less;
    }
    if (colName === "Catering_Sport_11_15") {
      colPrice = priceList[0].Catering_Sport_11_15;
    }
    if (colName === "Catering_Sport_16_20") {
      colPrice = priceList[0].Catering_Sport_16_20;
    }
    if (colName === "Catering_Sport_21_26") {
      colPrice = priceList[0].Catering_Sport_21_26;
    }
    if (colName === "Catering_Sport_27") {
      colPrice = priceList[0].Catering_Sport_27;
    }
    if (colName === "Charter_12") {
      colPrice = priceList[0].Charter_12;
    }
    if (colName === "Charter_50") {
      colPrice = priceList[0].Charter_50;
    }
    if (colName === "Individual_Shuttle") {
      colPrice = priceList[0].Individual_Shuttle;
    }
    if (colName === "Rental_Vehicle") {
      colPrice = priceList[0].Rental_Vehicle;
    }
    if (colName === "University_Parking") {
      colPrice = priceList[0].University_Parking;
    }
    if (colName === "Aquatic_Center_LC") {
      colPrice = priceList[0].Aquatic_Center_LC;
    }
    if (colName === "Aquatic_Center_SC") {
      colPrice = priceList[0].Aquatic_Center_SC;
    }
    if (colName === "Outdoor_Track") {
      colPrice = priceList[0].Outdoor_Track;
    }
    if (colName === "University_Gym") {
      colPrice = priceList[0].University_Gym;
    }
    if (colName === "Hypo2_Gym") {
      colPrice = priceList[0].Hypo2_Gym;
    }
    if (colName === "Outdoor_Fields") {
      colPrice = priceList[0].Outdoor_Fields;
    }
    if (colName === "High_Speed_Treadmill") {
      colPrice = priceList[0].High_Speed_Treadmill;
    }
    if (colName === "Massage_Therapy_1_10") {
      colPrice = priceList[0].Massage_Therapy_1_10;
    }
    if (colName === "Massage_Therapy_10") {
      colPrice = priceList[0].Massage_Therapy_10;
    }
    if (colName === "Physio_Chiro") {
      colPrice = priceList[0].Physio_Chiro;
    }
    if (colName === "Strength_Conditioning_Coach") {
      colPrice = priceList[0].Strength_Conditioning_Coach;
    }
    if (colName === "Orthopaedic_Care") {
      colPrice = priceList[0].Orthopaedic_Care;
    }
    if (colName === "Primary_Medical_Care") {
      colPrice = priceList[0].Primary_Medical_Care;
    }
    if (colName === "Hemoglobin_Mass_Testing") {
      colPrice = priceList[0].Hemoglobin_Mass_Testing;
    }
    if (colName === "Metabolic_Profile") {
      colPrice = priceList[0].Metabolic_Profile;
    }
    if (colName === "Ferritin_Iron_Binding_Capacity") {
      colPrice = priceList[0].Ferritin_Iron_Binding_Capacity;
    }
    if (colName === "Other_Testing") {
      colPrice = priceList[0].Other_Testing;
    }
    if (colName === "Supplemental_O2") {
      colPrice = priceList[0].Supplemental_O2;
    }
    if (colName === "Integrated_Training_Dietary_Analysis") {
      colPrice = priceList[0].Integrated_Training_Dietary_Analysis;
    }
    if (colName === "Group_Presentation_Workshop_Nutrition") {
      colPrice = priceList[0].Group_Presentation_Workshop_Nutrition;
    }
    if (colName === "Group_Presentation_Workshop_Psychology") {
      colPrice = priceList[0].Group_Presentation_Workshop_Psychology;
    }
    if (colName === "Tax") {
      colPrice = priceList[0].Tax;
    }

    setPrice(colPrice);
  }
  // Set default value for navigate
  let navigate = useNavigate();

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

  let colPrice = 0.0;
  let [colName, setColName] = useState("");
  const [price, setPrice] = useState(0);
  const [newPrice, setNewPrice] = useState(0);

  useEffect(() => {
    // checking if admin is the user trying to access this page
    if (authCheckAdmin(navigate)) {
      // get all camp information
      getPrice();
    }
  });

  const getPrice = () => {
    Axios.get("http://localhost:3001/Prices").then((response) => {
      // put information into getUserCampsList array
      setPriceList(response.data);
    });
  };

  return (
    <div>
      <p style={{ display: "inline", marginRight: "5px" }}>
        Update Price of Services
      </p>
      <select
        id="updateBilling"
        name="updateBilling"
        onChange={(event) => {
          setColName(event.target.value);
          console.log(event.target.value);
          currentPrice(event.target.value);
          // console.log(currentPrice(colName));
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
        <option value="Extended_Hotel_May_2Bed">Extended_Hotel_May_2Bed</option>
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
        <option value="Catering_Sport_Ten_Less">Catering_Sport_Ten_Less</option>
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
        <option value="Hemoglobin_Mass_Testing">Hemoglobin_Mass_Testing</option>
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
      <div>Current Price: ${price}</div>
      <span className="info-block">
        <p style={{ display: "inline", marginRight: "5px" }}>New Price: </p>
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
  );
}

export default App;
