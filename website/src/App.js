import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Intake from "./Pages/Intake";
import SignIn from "./Pages/SignIn";
import StaffProfile from "./Pages/Profile Pages/StaffProfile";
import AdminProfile from "./Pages/Profile Pages/AdminProfile";
import ClientProfile from "./Pages/Profile Pages/ClientProfile";
import Summary from "./Pages/Summary";
import Camp from "./Pages/Camp";
import PendingCamp from "./Pages/PendingCamps";
import Event from "./Pages/Event";
import UpdatePrices from "./Pages/UpdatePrice";
import ConfirmedCamps from "./Pages/ConfirmedCamps";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="*" element={<SignIn />} />
        <Route path="/ClientProfile">
          <Route index={true} element={<ClientProfile />} />
          <Route index={false} path="Intake" element={<Intake />} />
          <Route index={false} path="Summary" element={<Summary />} />
        </Route>
        <Route path="/AdminProfile">
          <Route index={true} element={<AdminProfile />} />
          <Route index={false} path="PendingCamps" element={<PendingCamp />} />
          <Route index={false} path="UpdatePrices" element={<UpdatePrices />} />
          <Route
            index={false}
            path="ConfirmedCamps"
            element={<ConfirmedCamps />}
          />
        </Route>
        <Route path="/StaffProfile" element={<StaffProfile />} />
        <Route path="/CampPage">
          <Route index={true} element={<Camp />} />
          <Route index={false} path="Event" element={<Event />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
