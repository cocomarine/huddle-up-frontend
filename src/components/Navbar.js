import React, { useState } from "react";
import { MdReorder } from "react-icons/md";
import { Link } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import "../styles/navbar.css";

const Navbar = () => {
  const [showLinks, setShowLinks] = useState(false);

  const { user } = useAuthContext();

  return (
    <div className="navbar">
      <div className="rightSide">
        <div className="links" id={showLinks ? "hidden" : ""}>
          <Link to="/">Home</Link>
          {!user && <Link to="/login">Login</Link>}
          {user && <Link to="/logout">Logout</Link>}
          {user && <Link to="/myprofile"> My Profile</Link>}
          {!user && <Link to="/signup">Sign up</Link>}
          {user && <Link to="/joinevents"> Join Events</Link>}
          {user && <Link to="/myevents"> My Events</Link>}
        </div>
        <div className="nav-button" onClick={() => setShowLinks(!showLinks)}>
          <MdReorder size="2.5rem" color="white" />
        </div>
      </div>
      <div className="leftSide">
        {/* <input type="text" placeholder="Search..."></input>
        <button>Search</button> */}
        {/* <h1 className="title">HuddleUp</h1> */}
      </div>
    </div>
  );
};

export default Navbar;