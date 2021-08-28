import axios from "axios";

import { edrvBase } from "../static";

const userAPI = {
  createUser: (data) =>
    axios
      .post(`${edrvBase}/users`, data)
      .then((response) => response.data.result)
      .catch((err) => new Error(err)),
  getUsers: () =>
    axios
      .get(`${edrvBase}/users`)
      .then((response) => response.data.result)
      .catch((err) => new Error(err)),
};

export default userAPI;
