import React from "react";
import { render, cleanup } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Logout from "../components/Logout";
import { AuthContextProvider } from "../contexts/AuthContext";

beforeEach(() => {
  render(
    <BrowserRouter>
      <AuthContextProvider>
        <Logout />
      </AuthContextProvider>
    </BrowserRouter>
  );
});

afterEach(cleanup);

describe("Logout", () => {
  const { asFragment } = render(
    <BrowserRouter>
      <AuthContextProvider>
        <Logout />
      </AuthContextProvider>
    </BrowserRouter>
  );
  it("renders correctly", () => {
    expect(asFragment()).toMatchSnapshot();
  });

  xit("when clicked, takes you to login page", () => {});
});
