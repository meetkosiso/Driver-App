import axios from "axios";

import { edrvBase } from "../static";

const chargestation = {
  getChargeStation: (id) =>
    axios
      .get(`${edrvBase}/chargestations/${id}`)
      .then((response) => response.data.result)
      .catch((err) => new Error(err)),
};

export default chargestation;
