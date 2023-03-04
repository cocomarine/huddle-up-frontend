import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/home.css";

const Home = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="homeBody">
        <h1 className="title">Huddle Up</h1>
        <div className="homeText">
          <p>
            Join us and plan your events and activities!
          </p>
        </div>
        <div className="btns">
          <button
            className="loginBtn"
            onClick={() => {
              navigate("/login");
            }}
          >
            Login
          </button>

          <button
            className="signUpBtn"
            onClick={() => {
              navigate("/signup");
            }}
          >
            Sign up
          </button>
        </div>
      </div>
    </>
  );
};

export default Home;