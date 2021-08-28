import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useAlert } from "react-alert";

import Header from "../Common/Header";

function DashBoard({
  authUser,
  getConnector,
  connectors,
  getChargeStation,
  remoteStart,
  remoteStop,
  getTransaction,
  transaction,
  chargestations,
}) {
  const { logout } = useAuth0();
  const alert = useAlert();

  const [connector, setConnector] = useState("Processing...");
  const [chargestation, setChargestation] = useState("Processing...");
  const [user, setUser] = useState("");
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(false);
  const [online, setOnline] = useState("Processing...");
  const [kwh, setKWH] = useState("0.00");
  const [timeSpent, setTimeSpent] = useState("0:0");
  const [cost, setCost] = useState("0");
  const [chargingStatus, setChargingStatus] = useState("No");

  useEffect(() => {
    onGetConnector();
    onGetChargeStation();
    onGetTransaction();
    getUser();
    getMetric();
  });

  const onGetConnector = async () => {
    if (connectors.fetched === false || connectors.fetched === undefined) {
      await getConnector(process.env.REACT_APP_CONNECTOR);
    }

    if (connectors.data !== undefined && connectors.data.status !== undefined) {
      setConnector(connectors.data.status);
    }
  };

  const onGetChargeStation = async () => {
    if (
      chargestations.fetched === false ||
      chargestations.fetched === undefined
    ) {
      await getChargeStation(process.env.REACT_APP_CHARGE_STATIONS);
    }

    if (
      chargestations.data !== undefined &&
      chargestations.data.endpoint !== undefined
    ) {
      setChargestation(chargestations.data.endpoint);
    }

    if (
      chargestations.data !== undefined &&
      chargestations.data.online !== undefined
    ) {
      if (chargestations.data.online === true) {
        setOnline("Yes");
      } else {
        setOnline("No");
      }
    }
  };

  const getUser = () => {
    setLoading(true);

    if (authUser.data !== undefined && authUser.data._id !== undefined) {
      setUser(authUser.data._id);
      setToken(authUser.data.tokens[0]);

      setLoading(false);
    }
  };

  const onGetTransaction = async () => {
    if (transaction.fetched === false || transaction.fetched === undefined) {
      await getTransaction(user);
    }
  };

  const getMetric = () => {
    let costMetric = "0";
    if (transaction.data !== undefined) {
      if (transaction.data.status !== undefined) {
        const timeSpentMetric = transaction.data.metrics.timeSpentCharging.toFixed(
          2
        );
        const kwhMetric = transaction.data.metrics.wattHoursConsumed / 1000;

        setTimeSpent(timeSpentMetric);
        setKWH(kwhMetric);

        if (transaction.data.cost !== undefined) {
          costMetric = `${transaction.data.cost.amount.toFixed(2)} ${
            transaction.data.cost.currency
          }`;
        }

        setCost(costMetric);
      }

      if (transaction.data.status === "Started") {
        setChargingStatus("Yes");
      }

      if (transaction.data.status === "Ended") {
        setChargingStatus("No");
      }
    }
  };

  const onRemoteStart = async () => {
    const connectorID = process.env.REACT_APP_CONNECTOR;
    const chargestationID = process.env.REACT_APP_CHARGE_STATIONS;

    setLoading(true);

    const started = await remoteStart({
      chargestation: chargestationID,
      connector: connectorID,
      user,
      token,
    }).catch((err) => err);

    if (started !== null && started.command !== undefined) {
      // show success message to user
      alert.show("Remote start command was issued successfully");
      // get active transition
      await getTransaction(user);
      await getConnector(process.env.REACT_APP_CONNECTOR);

      setLoading(false);
      return;
    }

    alert.show(`An error occurred: ${started}`);

    setLoading(false);
  };

  const onremoteStop = async () => {
    const chargestationID = process.env.REACT_APP_CHARGE_STATIONS;

    if (transaction.data === undefined) {
      alert.show("No valid transaction");
      return;
    }

    setLoading(true);
    const stopped = await remoteStop({
      chargestation: chargestationID,
      user,
      transaction: transaction.data._id,
    }).catch((err) => err);

    if (stopped !== null && stopped.command !== undefined) {
      // show success message to user
      alert.show("Remote stop command was issued successfully");
      // get active transition
      await getTransaction(user);
      await getConnector(process.env.REACT_APP_CONNECTOR);

      setLoading(false);
      return;
    }

    alert.show(`An error occurred: ${stopped}`);
    setLoading(false);
  };

  return (
    <div className="main-container">
      <Header logout={logout} />
      <div className="content">
        <div className="display-content">
          <div className="display-item">
            <h4>CSID</h4>
            <p>{chargestation}</p>
          </div>
          <div className="display-item">
            <h4>Online</h4>
            <p>{online}</p>
          </div>
          <div className="display-item">
            <h4>Connector</h4>
            <p>{connector}</p>
          </div>

          <div className="display-item">
            <h4>Charging</h4>
            <p>{chargingStatus}</p>
          </div>

          <div className="display-item">
            <h4>Energy KWH</h4>
            <p>{kwh}</p>
          </div>
          <div className="display-item">
            <h4>Time</h4>
            <p>{timeSpent}</p>
          </div>
          <div className="display-item">
            <h4>Cost</h4>
            <p>{cost}</p>
          </div>
        </div>
        <div className="charge-button-content">
          <button
            className="charge-button"
            disabled={loading}
            onClick={onRemoteStart}
          >
            {loading === true ? "Processing" : "Start"}
          </button>
          <button
            disabled={loading}
            onClick={onremoteStop}
            className="charge-button"
          >
            {loading === true ? "Processing" : "Stop"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default DashBoard;
