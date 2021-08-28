import {
  FETCH_COMMAND_SUCCESSFUL,
  FETCH_COMMAND_FAILED,
} from "../../types/command";
import {
  fetchedCommandSuccess,
  fetchCommandFailed,
} from "../../action/command";

test("Return charge station successfully on FETCH_COMMAND_SUCCESSFUL", () => {
  const payload = {};
  const expectedAction = {
    type: FETCH_COMMAND_SUCCESSFUL,
    payload,
  };
  expect(fetchedCommandSuccess(payload)).toEqual(expectedAction);
});

test("Return charge station successfully on FETCH_COMMAND_FAILED", () => {
  const expectedAction = {
    type: FETCH_COMMAND_FAILED,
  };
  const action = fetchCommandFailed();
  expect(action).toEqual(expectedAction);
});
