import {
  FETCH_CONNECTOR_SUCCESSFUL,
  FETCH_CONNECTOR_FAILED,
} from "../../types/connectors";
import {
  fetchedConnectorSuccess,
  fetchConnectorFailed,
} from "../../action/connectors";

test("Return charge station successfully on FETCH_CONNECTOR_SUCCESSFUL", () => {
  const payload = {};
  const expectedAction = {
    type: FETCH_CONNECTOR_SUCCESSFUL,
    payload,
  };
  expect(fetchedConnectorSuccess(payload)).toEqual(expectedAction);
});

test("Return charge station successfully on FETCH_CONNECTOR_FAILED", () => {
  const expectedAction = {
    type: FETCH_CONNECTOR_FAILED,
  };
  expect(fetchConnectorFailed()).toEqual(expectedAction);
});
