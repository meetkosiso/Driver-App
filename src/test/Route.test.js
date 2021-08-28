import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import ReactDOM from "react-dom";
import thunk from "redux-thunk";
import logger from "redux-logger";

import ProtectedRoute from "../Route/ProtectedRoute";
import rootReducer from "../rootReducer";

test("renders header without crashing", () => {
  const div = document.createElement("div");
  const store = createStore(rootReducer, applyMiddleware(thunk, logger));
  ReactDOM.render(
    <Provider store={store}>
      <ProtectedRoute isLoading={true} />
    </Provider>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});

test("Should show a spinner on loading", () => {
  const store = createStore(rootReducer, applyMiddleware(thunk, logger));
  const { container } = render(
    <Provider store={store}>
      <ProtectedRoute isAuthenticated={true} isLoading={true} />
    </Provider>
  );

  expect(container.firstChild).toHaveClass("main-container");
});
