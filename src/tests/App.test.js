import React from "react";
import { render } from "@testing-library/react";
import { AuthContextProvider } from "../contexts/AuthContext";
import App from "../components/App";

describe("App", () => {
  it("renders App correctly", () => {
    const { asFragment } = render(
      <AuthContextProvider>
        <App />
      </AuthContextProvider>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
