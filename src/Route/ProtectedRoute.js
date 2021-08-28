import React, { useEffect } from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import ClipLoader from "react-spinners/ClipLoader";

import { onAccessTokenFetch } from "../action/accessToken";
import { createUser, getUser } from "../action/user";
import { createToken } from "../action/token";

function ProtectedRoute({
  isAuthenticated,
  onAccessTokenFetch,
  createUser,
  createToken,
  getUser,
  authUser,
  isLoading,
  user,
  component: Component,
  ...rest
}) {
  const initialized = async () => {
    if (isLoading === false && isAuthenticated === true) {
      // Request for Authentication token to EDRV
      await onAccessTokenFetch({
        grant_type: "client_credentials",
        client_id: process.env.REACT_APP_EDRV_CLIENT_ID,
        client_secret: process.env.REACT_APP_EDRV_CLIENT_SECRET,
        audience: "https://api.edrv.io",
      });

      const { email, sub, name } = user;

      // Get signed user detail from EDRV if none exist on store
      if (authUser.fetched === undefined) {
        await getUser(email);
      }

      // Check if user already exist, else create a new user on EDRV
      if (authUser.fetched === true && authUser.data === undefined) {
        const [firstName, lastName] = name.split(" ");

        const user = await createUser({
          active: true,
          source: "auth0",
          firstname: firstName || "NA",
          lastname: lastName || "NA",
          auth0_id: sub,
          email: email,
          active_organization: process.env.REACT_APP_EDRV_ORGANIZATION_ID,
        });

        await createToken({
          active: true,
          physicalId: "058A60D6F84000",
          type: "ISO1443",
          user: user._id,
          channel: "physical",
        });
      }
    }
  };

  useEffect(() => {
    initialized();
  });

  if (isLoading === true) {
    return (
      <div className="main-container">
        <ClipLoader color="brown" loading={isLoading} size={100} />
      </div>
    );
  }

  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated ? <Component {...props} /> : <Redirect to="/" />
      }
    />
  );
}

function mapStateToProps(state) {
  return { authUser: state.UserReducer };
}

export default connect(mapStateToProps, {
  onAccessTokenFetch,
  createUser,
  createToken,
  getUser,
})(ProtectedRoute);
