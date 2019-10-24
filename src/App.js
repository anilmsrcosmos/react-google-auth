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

  const googleResponse = response => {
    const tokenBlob = new Blob(
      [JSON.stringify({ access_token: response.accessToken }, null, 2)],
      { type: "application/json" }
    );
    const options = {
      method: "POST",
      body: tokenBlob,
      mode: "cors",
      cache: "default"
    };
    fetch("http://localhost:4000/api/v1/google", options).then(res => {
      const token = res.headers.get("x-auth-token");
      res.json().then(user => {
        if (token) {
          setState({ ...state, isAuthenticated: true, user, token });
          console.log(user);
        }
      });
    });
  };

  useEffect(() => {
    // : TODO implement popup
  }, []);
  const content = () =>
    state.isAuthenticated ? (
      <div>{state.user.name}</div>
    ) : (
      <div>
        <GoogleAuth
          onFailure={googleResponse}
          onSuccess={googleResponse}
          buttonText="Login"
          clientId={config.GOOGLE_CLIENT_ID}
        />
      </div>
    );

  return <div className="App">{content()}</div>;
}

export default App;
