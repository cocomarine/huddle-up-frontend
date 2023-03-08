import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import "../styles/logout.css";

const LogOut = () => {
  const user = useAuthContext();

  const navigate = useNavigate();

  const changePage = (redirect) => {
    navigate(redirect, { replace: true });
    window.location.reload();

    const handleLogout = () => {
      localStorage.clear();
      sessionStorage.clear();
      user("");
      changePage("/");
    };

    return (
      <div className="logOut">
        <button type="submit" onClick={handleLogout}>
          Logout
        </button>
      </div>
    );
  };
};

export default LogOut;
