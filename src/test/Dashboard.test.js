import ReactDOM from "react-dom";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import { transitions, positions, Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";
import thunk from "redux-thunk";
import logger from "redux-logger";

import { getConnector } from "../action/connectors";
import { getChargeStation } from "../action/chargeStation";
import { remoteStart, remoteStop, getTransaction } from "../action/command";

import rootReducer from "../rootReducer";

import DashboardContainer from "../Container/Dashboard";
import DashBoardComponent from "../Component/Dashboard";

// optional configuration
const options = {
  // you can also just use 'bottom center'
  position: positions.BOTTOM_CENTER,
  timeout: 5000,
  offset: "30px",
  // you can also just use 'scale'
  transition: transitions.SCALE,
};

const connectors = { fetched: true, data: { status: "Available" } };

const authUser = { fetched: true, data: {} };

const chargestations = {
  fetched: true,
  data: { endpoint: "test-01" },
};

const transaction = {
  fetched: true,
  data: {
    metrics: { wattHoursConsumed: 10000, timeSpentCharging: 2000 },
    status: "Ended",
    cost: { amount: 3000 },
  },
};

test("renders dashboard container without crashing", () => {
  const div = document.createElement("div");
  const store = createStore(rootReducer, applyMiddleware(thunk, logger));

  ReactDOM.render(
    <Provider store={store}>
      <AlertProvider template={AlertTemplate} {...options}>
        <DashboardContainer />
      </AlertProvider>
    </Provider>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});

test("renders dashboard component without crashing", () => {
  const div = document.createElement("div");

  ReactDOM.render(
    <AlertProvider template={AlertTemplate} {...options}>
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
    </AlertProvider>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});

test("expect csid to show successfully", async () => {
  render(
    <AlertProvider template={AlertTemplate} {...options}>
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
    </AlertProvider>
  );
  expect(await screen.findByText(/test-01/i)).toBeInTheDocument();
});

test("expect connector status to show successfully", async () => {
  render(
    <AlertProvider template={AlertTemplate} {...options}>
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
    </AlertProvider>
  );
  expect(await screen.findByText(/Available/i)).toBeInTheDocument();
});

test("expect enery kwh to show successfully", async () => {
  render(
    <AlertProvider template={AlertTemplate} {...options}>
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
    </AlertProvider>
  );
  expect(await screen.findByText(/10/i)).toBeInTheDocument();
});

test("expect charging status to show successfully", async () => {
  render(
    <AlertProvider template={AlertTemplate} {...options}>
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
    </AlertProvider>
  );
  expect(await screen.findByText(/No/i)).toBeInTheDocument();
});

test("expect time spent to show successfully", async () => {
  render(
    <AlertProvider template={AlertTemplate} {...options}>
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
    </AlertProvider>
  );
  expect(await screen.findByText(/2000/i)).toBeInTheDocument();
});

test("expect cost to show successfully", async () => {
  render(
    <AlertProvider template={AlertTemplate} {...options}>
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
    </AlertProvider>
  );
  expect(await screen.findByText(/3000/i)).toBeInTheDocument();
});
