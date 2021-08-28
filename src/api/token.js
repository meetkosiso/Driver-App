import axios from "axios";

import { edrvBase } from "../static";

const userAPI = {
  createToken: (data) =>
    axios
      .post(`${edrvBase}/tokens`, data)
      .then((response) => response.data.result)
      .catch((err) => new Error(err)),
};

export default userAPI;
