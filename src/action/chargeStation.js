import api from "../api/chargeStation";
import {
  FETCH_CHARGESTATION_SUCCESSFUL,
  FETCH_CHARGESTATION_FAILED,
} from "../types/chargeStation";

export const fetchedChargeStationSuccess = (data) => ({
  type: FETCH_CHARGESTATION_SUCCESSFUL,
  payload: data,
});

export const fetchChargeStationFailed = () => ({
  type: FETCH_CHARGESTATION_FAILED,
});

export const getChargeStation = (id) => async (dispatch) => {
  const chargeStationInstance = await api
    .getChargeStation(id)
    .catch((err) => err);

  if (chargeStationInstance instanceof Error) {
    dispatch(fetchChargeStationFailed());
  }

  dispatch(fetchedChargeStationSuccess(chargeStationInstance));
};
