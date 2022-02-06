import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Intake from "./Pages/Intake";
import SignIn from "./Pages/SignIn";
import StaffProfile from "./Pages/Profile Pages/StaffProfile";
import AdminProfile from "./Pages/Profile Pages/AdminProfile";
import ClientProfile from "./Pages/Profile Pages/ClientProfile";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/Intake" element={<Intake />} />
        <Route path="/StaffProfile" element={<StaffProfile />} />
        <Route path="/AdminProfile" element={<AdminProfile />} />
        <Route path="/ClientProfile" element={<ClientProfile />} />
      </Routes>
    </Router>
  );
}

export default App;
