import { FETCH_USER_SUCCESSFUL, FETCH_USER_FAILED } from "../types/user";

export default function User(states = {}, action = {}) {
  switch (action.type) {
    case FETCH_USER_SUCCESSFUL:
      return { fetched: true, data: action.payload };
    case FETCH_USER_FAILED:
      return { fetched: false };
    default:
      return states;
  }
}
