import React, { useState } from "react";
import { Amplify, Auth } from "aws-amplify";
import { useNavigate } from "react-router-dom";
import awsExports from "../aws-exports";
import { setSessionStorage } from "../Components/UserInfoAndAuth";
Amplify.configure(awsExports);

function App() {
  // set up use states for login information
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // Set default value for navigate
  let navigate = useNavigate();

  // Set default value for authenticated and navigate
  setSessionStorage("authenticated", "false");
  setSessionStorage("username", "nouser");
  setSessionStorage("classification", "nouserclassification");

  // Function for signing in users
  async function signIn() {
    try {
      // Getting user information
      const user = await Auth.signIn(username, password);

      // Storing information needed for user
      setSessionStorage("username", username);
      setSessionStorage("authenticated", "true");
      setSessionStorage(
        "classification",
        user.attributes["custom:Classification"]
      );

      // Checking for classification to redirecting user to correct profile page
      if (user.attributes["custom:Classification"] === "Staff") {
        navigate("/StaffProfile");
      } else if (user.attributes["custom:Classification"] === "Admin") {
        navigate("/AdminProfile");
      } else if (user.attributes["custom:Classification"] === "Client") {
        navigate("/ClientProfile");
      } else {
        console.log("This Classification of account does not existed");
      }
    } catch {
      console.log("error signing in");
    }
  }

  return (
    <div>
      <h1>Login Sign In To Your Account</h1>

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
