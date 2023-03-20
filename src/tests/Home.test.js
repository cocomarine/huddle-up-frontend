import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Home from "../components/Home";
import { AuthContextProvider } from "../contexts/AuthContext";

const validProps = {
  onClick: jest.fn(),
  onSubmit: jest.fn(),
};

beforeEach(() => {
  render(
    <BrowserRouter>
      <AuthContextProvider>
        <Home onClick={validProps.onClick} onSubmit={validProps.onSubmit} />
      </AuthContextProvider>
    </BrowserRouter>
  );
});

describe("Home", () => {
  const { asFragment } = render(
    <BrowserRouter>
      <AuthContextProvider>
        <Home />
      </AuthContextProvider>
    </BrowserRouter>
  );
  it("renders correctly", () => {
    expect(asFragment()).toMatchSnapshot();
  });
  it("renders the button Log In correctly", () => {
    const button = screen.getAllByRole("button");

    const loginButton = screen.getByText(/Login/i);
    expect(loginButton).toBeInstanceOf(HTMLButtonElement);
  });

  it("redirects you upon logging in being successful", () => {
    const loginButton = screen.getByText(/sign up/i);
    fireEvent.click(loginButton);
  });
});
