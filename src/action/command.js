import api from "../api/command";

import {
  FETCH_COMMAND_SUCCESSFUL,
  FETCH_COMMAND_FAILED,
} from "../types/command";

export const fetchedCommandSuccess = (data) => ({
  type: FETCH_COMMAND_SUCCESSFUL,
  payload: data,
});

export const fetchCommandFailed = () => ({
  type: FETCH_COMMAND_FAILED,
});

export const remoteStart = (data) => async () => {
  const started = await api.start(data).catch((err) => err);

  if (started instanceof Error) {
    return started;
  }

  return started;
};

export const remoteStop = (data) => async () => {
  const stopped = await api.stop(data).catch((err) => err);

  if (stopped instanceof Error) {
    return stopped;
  }

  return stopped;
};

export const getTransaction = (user) => async (dispatch) => {
  const transactions = await api.getTransaction().catch((err) => err);

  if (transactions instanceof Error) {
    dispatch(fetchCommandFailed());
    return;
  }

  const currentTransaction = transactions[0];

  dispatch(fetchedCommandSuccess(currentTransaction));
};
