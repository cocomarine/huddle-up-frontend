import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";

import "../styles/home.css";

const Home = () => {

  const { user } = useAuthContext();
  
  const navigate = useNavigate();

  const changeLocation = (redirect) => {
    navigate(redirect, { replace: true });
    window.location.reload();
  };

  return (
    <>
      <div className="homeBody">
        <h1 className="title">Huddle Up</h1>
        <div className="homeText">
          <h3 style={{ fontWeight: 200 }}>
            Join us and plan your events and activities!
          </h3>
        </div>
        {user ? <div className="btns logged-in">
          <button
            className="myEventsBtn"
            onClick={() => {
              changeLocation("/myevents");
            }}
          >
            My Events
          </button>
          <button
            className="creatEeventBtn"
            onClick={() => {
              changeLocation("/createevent");
            }}
          >
            Create Event
          </button>
        </div> :
        <div className="btns logged-out">
        <button
          className="loginBtn"
          onClick={() => {
            changeLocation("/login");
          }}
        >
          Login
        </button>

        <button
          className="signUpBtn"
          onClick={() => {
            changeLocation("/signup");
          }}
        >
          Sign up
        </button>
      </div>}
      </div>
    </>
  );
};

export default Home;