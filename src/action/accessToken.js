import axios from "axios";

function authHeader(token) {
  if (token !== null) {
    axios.defaults.headers.common.authorization = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common.authorization;
  }
}

export const onAccessTokenFetch = (accessToken) => async () => {
  authHeader(accessToken);
};
