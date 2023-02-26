import React, { useState } from "react";
import "../styles/LogIn.css";

const LogIn = () => {
  return (
    <>
      <h1> Sign In</h1>
      <form>
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

      <button>Don't have an account? Sign up Here</button>
    </>
  );
};

export default LogIn;
