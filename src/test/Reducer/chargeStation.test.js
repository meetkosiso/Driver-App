import {
  FETCH_CHARGESTATION_SUCCESSFUL,
  FETCH_CHARGESTATION_FAILED,
} from "../../types/chargeStation";
import {
  fetchedChargeStationSuccess,
  fetchChargeStationFailed,
} from "../../action/chargeStation";

test("Return charge station successfully on FETCH_CHARGESTATION_SUCCESSFUL", () => {
  const payload = {};
  const expectedAction = {
    type: FETCH_CHARGESTATION_SUCCESSFUL,
    payload,
  };
  expect(fetchedChargeStationSuccess(payload)).toEqual(expectedAction);
});

test("Return charge station successfully on FETCH_CHARGESTATION_FAILED", () => {
  const expectedAction = {
    type: FETCH_CHARGESTATION_FAILED,
  };
  expect(fetchChargeStationFailed()).toEqual(expectedAction);
});
