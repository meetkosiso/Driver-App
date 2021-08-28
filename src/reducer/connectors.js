import {
  FETCH_CONNECTOR_SUCCESSFUL,
  FETCH_CONNECTOR_FAILED,
} from "../types/connectors";

export default function Connectors(states = {}, action = {}) {
  switch (action.type) {
    case FETCH_CONNECTOR_SUCCESSFUL:
      if (action.payload === undefined) {
        return { fetched: false };
      }
      return { fetched: true, data: action.payload };
    case FETCH_CONNECTOR_FAILED:
      return { fetched: false };
    default:
      return states;
  }
}
