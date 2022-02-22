import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Intake from "./Pages/Intake";
import SignIn from "./Pages/SignIn";
import StaffProfile from "./Pages/Profile Pages/StaffProfile";
import AdminProfile from "./Pages/Profile Pages/AdminProfile";
import ClientProfile from "./Pages/Profile Pages/ClientProfile";
import Summary from "./Pages/Summary";
import Camp from "./Pages/Camp";

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
        <Route path="/AdminProfile" element={<AdminProfile />} />
        <Route path="/StaffProfile" element={<StaffProfile />} />
        <Route path="/CampPage" element={<Camp />} />
      </Routes>
    </Router>
  );
}

export default App;
