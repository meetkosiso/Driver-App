import { FETCH_USER_SUCCESSFUL, FETCH_USER_FAILED } from "../../types/user";
import { fetchedUserSuccess, fetchUserFailed } from "../../action/user";

test("Return charge station successfully on FETCH_USER_SUCCESSFUL", () => {
  const payload = {};
  const expectedAction = {
    type: FETCH_USER_SUCCESSFUL,
    payload,
  };
  expect(fetchedUserSuccess(payload)).toEqual(expectedAction);
});

test("Return charge station successfully on FETCH_USER_FAILED", () => {
  const expectedAction = {
    type: FETCH_USER_FAILED,
  };
  expect(fetchUserFailed()).toEqual(expectedAction);
});
