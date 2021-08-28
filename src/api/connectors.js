import axios from "axios";

import { edrvBase } from "../static";

const connectors = {
  getConnector: (id) =>
    axios
      .get(`${edrvBase}/connectors/${id}`)
      .then((response) => response.data.result)
      .catch((err) => new Error(err)),
};

export default connectors;
