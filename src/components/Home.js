import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";

import "../styles/common/titles.css";
import "../styles/common/page.css";
import "../styles/common/buttons.css";
import "../styles/home.css";

const Home = () => {

  const { user } = useAuthContext();
  
  const navigate = useNavigate();

  const changeLocation = (redirect) => {
    navigate(redirect, { replace: true });
    // window.location.reload();
  };

  return (
    <>
      <div className="homeBody">
        <h1 className="home-title">
          <font color="#ED2643">h</font>
            uddle
          <font color="#2284B5">U</font>
            p
          </h1>
        {user ? <>
          <div className="homeText subtitle">
          Let's plan and get together!
          </div>
          <div className="btns logged-in">
            <button
              className="myEventsBtn link-button"
              onClick={() => {
                changeLocation("/myevents");
              }}
            >
              My Events
            </button>
            <button
              className="createEventBtn link-button"
              onClick={() => {
                changeLocation("/createevent");
              }}
            >
              Create Event
            </button>
            <button
              className="joinEventBtn link-button"
              onClick={() => {
                changeLocation("/joinevents");
              }}
            >
              Join Event
            </button>
          </div> 
        </> :<>
          <div className="homeText subtitle">
          Join us and plan your events and activities!
          </div>
          <div className="btns logged-out">
            <button
              className="loginBtn link-button"
              onClick={() => {
                changeLocation("/login");
              }}
            >
              Login
            </button>

            <button
              className="signUpBtn link-button"
              onClick={() => {
                changeLocation("/signup");
              }}
            >
              Sign up
            </button>
          </div>
        </>}
      </div>
    </>
  );
};

export default Home;