import { combineReducers } from "redux";

import UserReducer from "./reducer/user";
import ConnectorReducer from "./reducer/connectors";
import ChargeStationReducer from "./reducer/chargeStation";
import TransactionReducer from "./reducer/command";

export default combineReducers({
  UserReducer,
  ConnectorReducer,
  ChargeStationReducer,
  TransactionReducer,
});
