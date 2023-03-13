import React from "react";
import renderer from "react-test-renderer";
import { MemoryRouter } from "react-router-dom";
import { AuthContextProvider } from "../contexts/AuthContext";
import CreateEvent from "../components/CreateEvent/CreateEvent";

describe("CreateEvent", () => {
  it("renders correctly", () => {
    const rendered = renderer.create(
      <AuthContextProvider>
        <MemoryRouter>
          <CreateEvent />
        </MemoryRouter>
      </AuthContextProvider>
    );
    expect(rendered).toMatchSnapshot();
  });
});