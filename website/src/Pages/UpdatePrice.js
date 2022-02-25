import React, { useState, useEffect } from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import { authCheckAdmin } from "../Components/UserInfoAndAuth";

function App() {
  // Set default value for navigate
  let navigate = useNavigate();

  // array for holding all camps information
  const [priceList, setPriceList] = useState([]);

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
      {priceList.map((val) => {
        return (
          <div key={val.Camp_ID}>
            <p>{val.Hotel_Nov_Dec}</p>
          </div>
        );
      })}
    </div>
  );
}

export default App;
