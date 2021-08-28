import { render } from "@testing-library/react";
import ReactDOM from "react-dom";
import "@testing-library/jest-dom";

import LoginComponent from "../Component/Login";
import LoginContainer from "../Container/Login";

test("renders login component without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<LoginComponent />, div);
  ReactDOM.unmountComponentAtNode(div);
});

test("renders login container without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<LoginContainer />, div);
  ReactDOM.unmountComponentAtNode(div);
});

test("Display title successfully", () => {
  const { container } = render(<LoginContainer />);

  expect(container.firstChild).toHaveClass("main-container");
});
