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
import CampSummary from "./Pages/CampSummary";
import NeedsAssistanceCamps from "./Pages/NeedsAssistanceCamps";
import Roster from "./Pages/Roster";
import PastCamps from "./Pages/PastCamp";
import Billing from "./Pages/Billing";
import AdminPermissions from "./Pages/AdminPermissions";

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
          <Route
            index={false}
            path="NeedsAssistance"
            element={<NeedsAssistanceCamps />}
          />
          <Route index={false} path="PastCamps" element={<PastCamps />} />
        </Route>
        <Route path="/StaffProfile" element={<StaffProfile />} />
        <Route path="/CampPage">
          <Route index={true} element={<Camp />} />
          <Route index={false} path="Event" element={<Event />} />
          <Route index={false} path="Summary" element={<CampSummary />} />
          <Route index={false} path="Roster" element={<Roster />} />
          <Route index={false} path="Billing" element={<Billing />} />
          <Route
            index={false}
            path="AdminPermissions"
            element={<AdminPermissions />}
          />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
