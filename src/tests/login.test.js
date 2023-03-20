import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Login from "../components/Login";
import { AuthContextProvider } from "../contexts/AuthContext";

const validProps = {
  onClick: jest.fn(),
  onSubmit: jest.fn(),
};

beforeEach(() => {
  render(
    <BrowserRouter>
      <AuthContextProvider>
        <Login onClick={validProps.onClick} onSubmit={validProps.onSubmit} />
      </AuthContextProvider>
    </BrowserRouter>
  );
});

describe("Login", () => {
  const { asFragment } = render(
    <BrowserRouter>
      <AuthContextProvider>
        <Login />
      </AuthContextProvider>
    </BrowserRouter>
  );
  it("renders correctly", () => {
    expect(asFragment()).toMatchSnapshot();
  });
  it("renders the button Log In correctly", () => {
    const button = screen.getAllByRole("button");

    const loginButton = screen.getByText(/Log in/i);
    expect(loginButton).toBeInstanceOf(HTMLButtonElement);
  });

  it("redirects you upon logging in being successful", () => {
    const loginButton = screen.getByText(/Log in/i);
    fireEvent.click(loginButton);
  });
});
