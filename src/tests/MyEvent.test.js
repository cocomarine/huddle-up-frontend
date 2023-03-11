import React from "react";
import renderer from "react-test-renderer";
import { AuthContextProvider } from "../contexts/AuthContext";
import MyEvents from "../components/MyEvents";

describe("MyEvents", () => {
  it("renders correctly", () => {
    const rendered = renderer.create(
      <AuthContextProvider>
        <MyEvents />
      </AuthContextProvider>
    );
    expect(rendered).toMatchSnapshot();
  });
});