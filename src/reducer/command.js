import {
  FETCH_COMMAND_SUCCESSFUL,
  FETCH_COMMAND_FAILED,
} from "../types/command";

export default function COMMAND(states = {}, action = {}) {
  switch (action.type) {
    case FETCH_COMMAND_SUCCESSFUL:
      if (action.payload === undefined) {
        return { fetched: false };
      }
      return { fetched: true, data: action.payload };
    case FETCH_COMMAND_FAILED:
      return { fetched: false };
    default:
      return states;
  }
}
