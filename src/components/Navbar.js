import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { MdReorder } from "react-icons/md";
import { ImCross } from "react-icons/im";
import { GrLogout } from "react-icons/gr";

import { useAuthContext } from "../hooks/useAuthContext";
import logo from "../img/huddleup_logo.jpeg";
import "../styles/navbar.css";

const Navbar = () => {
  const [showLinks, setShowLinks] = useState(false);

  const { user, dispatch } = useAuthContext();

  const navigate = useNavigate();

  const changeLocation = (redirect) => {
    navigate(redirect, { replace: true });
    window.location.reload();
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    dispatch({ type: "LOGOUT " });
    changeLocation("/");
  };

  return (
    <div className="navbar">
      <div className="leftSide">
        <img
          className="l"
          alt={"logo"}
          src={logo}
          style={{ width: "100px", display: "flex" }}
        />
        {user && <div className="hi-user-msg">Hi, {user.first_name}!</div>}
      </div>
      <div className="rightside" id={showLinks ? "hidden" : ""}>
        <Link to="/">Home</Link>
        {!user && <Link to="/login">Login</Link>}
        {!user && <Link to="/signup">Sign up</Link>}
        {user && <Link to="/myprofile"> My Profile</Link>}
        {user && <Link to="/joinevents"> Join Events</Link>}
        {user && <Link to="/myevents"> My Events</Link>}
        {user && (
          <button className="logout-btn" onClick={handleLogout}>
            <GrLogout />&nbsp;Logout
          </button>
        )}
      </div>
      <div className="icons">
        <div className="closingIcon" onClick={() => setShowLinks(!showLinks)}>
          {showLinks && <ImCross />}
        </div>
        <div className="navIcon" onClick={() => setShowLinks(!showLinks)}>
          {!showLinks && <MdReorder size="2.5rem" color="rgb(246, 73, 73)" />}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
