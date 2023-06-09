import React from "react";
import renderer from "react-test-renderer";
import { MemoryRouter } from "react-router-dom";
import { AuthContextProvider } from "../contexts/AuthContext";
import MyEvents from "../components/MyEvents/MyEvents";

describe("MyEvents", () => {
  it("renders correctly", () => {
    const rendered = renderer.create(
      <AuthContextProvider>
        <MemoryRouter>
          <MyEvents />
        </MemoryRouter>
      </AuthContextProvider>
    );
    expect(rendered).toMatchSnapshot();
  });
});