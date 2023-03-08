import React, { useState } from "react";
import { MdReorder } from "react-icons/md";
import { Link } from "react-router-dom";
import "../styles/navbar.css";

const Navbar = () => {
  const [showLinks, setShowLinks] = useState(false);

  return (
    <div className="navbar">
      <div className="rightSide">
        <div className="links" id={showLinks ? "hidden" : ""}>
          <Link to="/">Home</Link>
          <Link to="/login">Login</Link>
          <Link to="/myprofile"> My Profile</Link>
          <Link to="/signup">Sign up</Link>
          <Link to="/joinevents"> Join Events</Link>
          <Link to="/myevents"> My Events</Link>
        </div>
        <div className="nav-button" onClick={() => setShowLinks(!showLinks)}>
          <MdReorder size="2.5rem" color="white" />
        </div>
      </div>
      <div className="leftSide">
        {/* <h2>HuddleUp</h2> */}
        {/* <input type="text" placeholder="Search..."></input>
        <button>Search</button> */}
        {/* <h1 className="title">HuddleUp</h1> */}
      </div>
    </div>
  );
};

export default Navbar;