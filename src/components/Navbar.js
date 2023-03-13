import React, { useState } from "react";
import { MdReorder } from "react-icons/md";
import { Link } from "react-router-dom";
import { ImCross } from "react-icons/im";
import "../styles/navbar.css";
import logo from "../img/AdobeStock_375037420.jpeg";

const Navbar = () => {
  const [showLinks, setShowLinks] = useState(false);

  return (
    <div className="navbar">
      <div className="leftSide">
        <img
          className="l"
          alt={"logo"}
          src={logo}
          style={{ width: "100px", display: "flex" }}
        />
      </div>

      <div className="rightSide">
        <div className="links" id={showLinks ? "hidden" : ""}>
          <Link to="/">Home</Link>
          <Link to="/login">Login</Link>
          <Link to="/myprofile"> My Profile</Link>
          <Link to="/signup">Sign up</Link>
          <Link to="/joinevents"> Join Events</Link>
          <Link to="/myevents"> My Events</Link>
        </div>
      </div>
      <div className="icons">
      <div className="closingIcon" onClick={() => setShowLinks(!showLinks)}>
        {showLinks && <ImCross  />}
      </div>
      <div className="navIcon" onClick={() => setShowLinks(!showLinks)}>
        {!showLinks && <MdReorder size="2.5rem" color="rgb(246, 73, 73)" />}
      </div>
      </div>
    </div>
  );
};

export default Navbar;
