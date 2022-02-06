import React from "react";
import { Auth } from "aws-amplify";
import { useNavigate } from "react-router-dom";

function App() {
  let navigate = useNavigate();

  // Make this a components when I have a chance
  async function signOut() {
    try {
      await Auth.signOut();

      navigate("/");
    } catch (error) {
      console.log("error signing out: ", error);
    }
  }

  return (
    <div>
      <h1>Hello {Auth.user.username} welcome to your Staff page</h1>
      <button
        onClick={() => {
          signOut();
        }}
      >
        Sign out
      </button>
    </div>
  );
}

export default App;
