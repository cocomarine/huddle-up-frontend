import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
// import "../styles/logout.css";

const Logout = () => {
  const { dispatch } = useAuthContext();

  const navigate = useNavigate();

  const changeLocation = (redirect) => {
    navigate(redirect, { replace: true });
    // window.location.reload();
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    dispatch({ type: "LOGOUT "});
    changeLocation("/");
  };

  return (
    <div className="logoutt">
      <button type="submit" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

export default Logout;
