import api from "../api/connectors";
import {
  FETCH_CONNECTOR_SUCCESSFUL,
  FETCH_CONNECTOR_FAILED,
} from "../types/connectors";

export const fetchedConnectorSuccess = (data) => ({
  type: FETCH_CONNECTOR_SUCCESSFUL,
  payload: data,
});

export const fetchConnectorFailed = () => ({
  type: FETCH_CONNECTOR_FAILED,
});

export const getConnector = (id) => async (dispatch) => {
  const connectorInstance = await api.getConnector(id).catch((err) => err);

  if (connectorInstance instanceof Error) {
    dispatch(fetchConnectorFailed());
  }

  dispatch(fetchedConnectorSuccess(connectorInstance));
};
