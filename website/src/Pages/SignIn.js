import React from "react";
import Signup from "../Components/SignIn/Signup";
import Login from "../Components/SignIn/Login";
import Status from "../Components/SignIn/Status";
import { Account } from "../Components/SignIn/Accounts";

function App() {
  return (
    <Account>
      <br />

      <Status />
      <br />

      <Signup />
      <br />

      <Login />
    </Account>
  );
}

export default App;
