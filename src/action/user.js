import api from "../api/user";
import { FETCH_USER_SUCCESSFUL, FETCH_USER_FAILED } from "../types/user";

export const fetchedUserSuccess = (data) => ({
  type: FETCH_USER_SUCCESSFUL,
  payload: data,
});

export const fetchUserFailed = () => ({
  type: FETCH_USER_FAILED,
});

export const createUser = (data) => async () => {
  const userCreated = await api.createUser(data).catch((err) => err);

  if (userCreated instanceof Error) {
    return userCreated;
  }

  return userCreated;
};

export const getUser = (email) => async (dispatch) => {
  const usersFound = await api.getUsers().catch((err) => err);

  if (usersFound instanceof Error) {
    dispatch(fetchUserFailed());
    return;
  }

  const index = usersFound.findIndex((item) => item.email === email);

  dispatch(fetchedUserSuccess(usersFound[index]));
};
