import React, { useState } from "react";
import { MdReorder } from "react-icons/md";
import { ImCross } from "react-icons/im";
import { Link } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import "../styles/navbar.css";
import logo from "../img/AdobeStock_375037420.jpeg";

const Navbar = () => {
  const [showLinks, setShowLinks] = useState(false);

  const { user } = useAuthContext();

  return (
    <nav>
      <div>
        <img
          className="l"
          alt={"logo"}
          src={logo}
          style={{ width: "70px", display: "flex" }}
        />

        <div>
          <ul className="navbarList">
            <li>
              <Link to="/">Home</Link>
            </li>

            <li> {!user && <Link to="/login">Login</Link>} </li>
            <li> {user && <Link to="/logout">Logout</Link>}</li>
            <li>{user && <Link to="/myprofile"> My Profile</Link>}</li>
            <li>{!user && <Link to="/signup">Sign up</Link>}</li>
            <li>{user && <Link to="/joinevents"> Join Events</Link>}</li>
            <li>{user && <Link to="/myevents"> My Events</Link>}</li>
          </ul>
        </div>
        <div className="icons">
          <div className="closingIcon" onClick={() => setShowLinks(!showLinks)}>
            {showLinks && <ImCross />}
          </div>
          <div className="navIcon" onClick={() => setShowLinks(!showLinks)}>
            {!showLinks && <MdReorder />}
          </div>
        </div>
      </div>
    </nav>
  );
};


