import { render, screen } from "@testing-library/react";
import ReactDOM from "react-dom";
import "@testing-library/jest-dom";

import Header from "../Common/Header";

test("renders header without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<Header />, div);
  ReactDOM.unmountComponentAtNode(div);
});

test("renders header correctly", () => {
  render(<Header />);
  const linkElement = screen.getByText(/Driver APP/i);
  expect(linkElement).toBeInTheDocument();
});
