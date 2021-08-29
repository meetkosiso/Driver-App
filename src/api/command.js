import axios from "axios";

import { edrvBase } from "../static";

const commands = {
  getTransaction: () =>
    axios
      .get(`${edrvBase}/transactions`)
      .then((response) => response.data.result)
      .catch((err) => new Error(err)),
  start: (data) =>
    axios
      .post(`${edrvBase}/commands/remotestart`, data)
      .then((response) => response.data.result)
      .catch((err) => err),
  stop: (data) =>
    axios
      .post(`${edrvBase}/commands/remotestop`, data)
      .then((response) => response.data.result)
      .catch((err) => new Error(err)),
};

export default commands;
