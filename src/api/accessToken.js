import axios from "axios";

const accessTokenAPI = {
  Token: {
    getToken: (data) =>
      axios
        .post("https://auth.edrv.io/oauth/token", data)
        .then((response) => response.data)
        .catch((err) => new Error(err)),
  },
};

export default accessTokenAPI;
