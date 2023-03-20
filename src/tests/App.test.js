import React from "react";
import { BrowserRouter } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import { AuthContextProvider } from "../contexts/AuthContext";
import App from "../components/App";

describe("App", () => {
  xit("renders App correctly", () => {
    render(
      <BrowserRouter>
        <AuthContextProvider>
          <App />
        </AuthContextProvider>
      </BrowserRouter>
    );
    const app = screen.getByText(/huddleUp/i);

    expect(app).toBeInTheDocument();
  });
});
