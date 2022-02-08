import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Intake from "./Pages/Intake";
import SignIn from "./Pages/SignIn";
import StaffProfile from "./Pages/Profile Pages/StaffProfile";
import AdminProfile from "./Pages/Profile Pages/AdminProfile";
import ClientProfile from "./Pages/Profile Pages/ClientProfile";

function App() {
  // Set default value for authenticated and navigate
  window.sessionStorage.setItem("authenticated", "false");
  window.sessionStorage.setItem("username", "nouser");
  window.sessionStorage.setItem("classification", "nouserclassification");

  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/ClientProfile">
          <Route index={true} element={<ClientProfile />} />
          <Route index={false} path="Intake" element={<Intake />} />
        </Route>
        <Route path="/AdminProfile" element={<AdminProfile />} />
        <Route path="/StaffProfile" element={<StaffProfile />} />
      </Routes>
    </Router>
  );
}

export default App;
