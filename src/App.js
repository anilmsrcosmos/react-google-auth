import React, { useState, useEffect } from "react";
import GoogleAuth from "react-google-login";
import config from "./config";
import "./App.css";

function App() {
  const [state, setState] = useState({
    isAuthenticated: false,
    user: null,
    token: ""
  });

  const logout = () => {
    setState({ isAuthenticated: false, user: null, token: "" });
  };

  const onError = e => {
    alert("auth failed");
  };

  const googelResponse = e => {};

  useEffect(() => {
    // : TODO implement popup
  }, []);
  const content = () =>
    state.isAuthenticated ? (
      <div>{state.user.name}</div>
    ) : (
      <div>
        <GoogleAuth
          onFailure={googelResponse}
          onSuccess={googelResponse}
          buttonText="Login"
          clientId={config.GOOGLE_CLIENT_ID}
        />
      </div>
    );

  return <div className="App">{content()}</div>;
}

export default App;
