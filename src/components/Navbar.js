import React, { useState } from "react";
import { MdReorder } from "react-icons/md";
import { Link } from "react-router-dom";
import { ImCross } from "react-icons/im";
import { useAuthContext } from "../hooks/useAuthContext";
import "../styles/navbar.css";
import logo from "../img/AdobeStock_375037420.jpeg";

const Navbar = () => {
  const [showLinks, setShowLinks] = useState(false);
  const { user } = useAuthContext();
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
          {!user && <Link to="/login">Login</Link>}
          {user && <Link to="/logout">Logout</Link>}
          {user && <Link to="/myprofile"> My Profile</Link>}
          {!user && <Link to="/signup">Sign up</Link>}
          {user && <Link to="/joinevents"> Join Events</Link>}
          {user && <Link to="/myevents"> My Events</Link>}
        </div>
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
