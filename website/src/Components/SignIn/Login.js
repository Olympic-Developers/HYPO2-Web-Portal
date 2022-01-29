import React, { useState, useContext } from "react";
import { AccountContext } from "./Accounts";

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { authenticate } = useContext(AccountContext);

  const onSubmit = (event) => {
    event.preventDefault();

    authenticate(email, password)
      .then((data) => {
        console.log("Logged in!", data);
      })
      .catch((err) => {
        console.log("Failed to login!", err);
      });
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <div>
          <label>Email:</label>
          <input
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>

        <div>
          <label>Password:</label>
          <input
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>

        <button type="submit"> Login </button>
      </form>
    </div>
  );
}

export default App;
