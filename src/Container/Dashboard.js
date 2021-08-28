import React from "react";
import { connect } from "react-redux";

import DashBoardComponent from "../Component/Dashboard";
import { getConnector } from "../action/connectors";
import { getChargeStation } from "../action/chargeStation";
import { remoteStart, remoteStop, getTransaction } from "../action/command";

function DashBoard({
  authUser,
  getConnector,
  connectors,
  remoteStart,
  remoteStop,
  getChargeStation,
  getTransaction,
  chargestations,
  transaction,
}) {
  return (
    <DashBoardComponent
      authUser={authUser}
      getConnector={getConnector}
      connectors={connectors}
      getChargeStation={getChargeStation}
      chargestations={chargestations}
      remoteStop={remoteStop}
      remoteStart={remoteStart}
      getTransaction={getTransaction}
      transaction={transaction}
    />
  );
}

function mapStateToProps(state) {
  return {
    authUser: state.UserReducer,
    connectors: state.ConnectorReducer,
    chargestations: state.ChargeStationReducer,
    transaction: state.TransactionReducer,
  };
}

export default connect(mapStateToProps, {
  getConnector,
  getChargeStation,
  remoteStart,
  remoteStop,
  getTransaction,
})(DashBoard);
