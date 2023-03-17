import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./components/App";
import { AuthContextProvider } from "./contexts/AuthContext";
import { EventContextProvider } from "./contexts/EventContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <EventContextProvider>
        <App />
      </EventContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
