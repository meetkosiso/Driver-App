import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

function Login() {
  const { loginWithRedirect } = useAuth0();

  return (
    <div className="main-container">
      <div className="content">
        <div className="welcome-title">
          <h1>Welcome to Driver App.</h1>
          <h4 className="content-header">
            Please login to continue on Driver App
          </h4>
          <button onClick={loginWithRedirect} className="action-button">
            Login
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
