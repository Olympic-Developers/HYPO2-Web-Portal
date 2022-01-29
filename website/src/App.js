import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Intake from "./Pages/Intake";
import SignIn from "./Pages/SignIn";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/Intake" element={<Intake />} />
      </Routes>
    </Router>
  );
}

export default App;
