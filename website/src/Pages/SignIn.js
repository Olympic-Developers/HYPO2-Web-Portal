import React, { useState } from "react";
import { Amplify, Auth } from "aws-amplify";
import { useNavigate } from "react-router-dom";
import awsExports from "../aws-exports";
Amplify.configure(awsExports);

function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  let navigate = useNavigate();

  async function signIn() {
    try {
      const user = await Auth.signIn(username, password);

      console.log(user);

      if (user.attributes["custom:Classification"] === "Staff") {
        navigate("/StaffProfile");
      } else if (user.attributes["custom:Classification"] === "Admin") {
        navigate("/AdminProfile");
      } else if (user.attributes["custom:Classification"] === "Client") {
        navigate("/ClientProfile");
      } else {
        console.log("This Classification of account does not existed");
      }
    } catch (error) {
      console.log("error signing in", error);
    }
  }

  return (
    <div>
      <div>
        <input
          type="text"
          name="userName"
          placeholder="Username"
          onChange={(event) => {
            setUsername(event.target.value);
          }}
        />
      </div>

      <div>
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={(event) => {
            setPassword(event.target.value);
          }}
        />
      </div>

      <button onClick={signIn}>Log In</button>
    </div>
  );
}

export default App;
