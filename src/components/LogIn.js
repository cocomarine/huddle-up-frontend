import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/logIn.css";

const LogIn = () => {
  const navigate = useNavigate();

  return (
    <div className="page">
      <h1 className="titleSignin"> Login</h1>
      <form className="form">
        <label htmlFor="email">Email </label>
        <input
          type="email"
          id="email"
          placeholder="youremail@email.com"
          required
        ></input>
        <label htmlFor="password">Password </label>
        <input
          type="password"
          id="password"
          placeholder="*******"
          required
        ></input>
        <button type="submit">Sign In</button>
      </form>
      <div>
        <p> Don't have an account?</p>
        <button
          onClick={() => {
            navigate("/signUp");
          }}
        >
          Sign up Here
        </button>
      </div>
      </div>
  );
};

export default LogIn;
