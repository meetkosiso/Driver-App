import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

import ProtectedRoute from "./Route/ProtectedRoute";
import AnonymouseRoute from "./Route/AnonymouseRoute";
import Login from "./Container/Login";
import DashBoard from "./Container/Dashboard";

import "./App.css";

function App() {
  const { isAuthenticated, isLoading, user } = useAuth0();
  return (
    <div className="App">
      <AnonymouseRoute
        isAuthenticated={isAuthenticated}
        path="/"
        exact
        component={Login}
      />
      <ProtectedRoute
        isAuthenticated={isAuthenticated}
        isLoading={isLoading}
        path="/dashBoard"
        user={user}
        exact
        component={DashBoard}
      />
    </div>
  );
}

export default App;
