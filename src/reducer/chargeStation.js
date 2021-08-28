import {
  FETCH_CHARGESTATION_SUCCESSFUL,
  FETCH_CHARGESTATION_FAILED,
} from "../types/chargeStation";

export default function CHARGESTATION(states = {}, action = {}) {
  switch (action.type) {
    case FETCH_CHARGESTATION_SUCCESSFUL:
      if (action.payload === undefined) {
        return { fetched: false };
      }
      return { fetched: true, data: action.payload };
    case FETCH_CHARGESTATION_FAILED:
      return { fetched: false };
    default:
      return states;
  }
}
