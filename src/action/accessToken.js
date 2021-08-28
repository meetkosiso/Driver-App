import axios from "axios";
import api from "../api/accessToken";

function authHeader(token) {
  if (token !== null) {
    axios.defaults.headers.common.authorization = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common.authorization;
  }
}

export const onAccessTokenFetch = (data) => async () => {
  const token = await api.Token.getToken(data).catch((err) => err);

  if (token instanceof Error) {
    authHeader(null);
    return;
  }

  authHeader(token.access_token);
};
