import React, { useState } from "react";
import { useSignUp } from "../hooks/useSignUp";
import { useNavigate } from "react-router-dom";
// import axios from "axios";
import "../styles/sign-up.css";

const SignUp = () => {
  const initialState = {
    signUp: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      cofirmPassword: "",
    },
  };

  const [signUp, setSignUp] = useState(initialState.signUp);

  const {firstName, lastName, email, password} = signUp;

  const {signup, error, isLoading} = useSignUp();

  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();

    // await signup(firstName, lastName, email, password)
    console.log(firstName, lastName, email, password)
  };

  const handleSignUpChange = (e) => {
    setSignUp({
      ...signUp,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="signupPage">
      <h1 className="titleSignup"> Signup</h1>
      <div className="signupForm">
        <form onSubmit={handleSignUp}>
          <div className="labels">
          <label className="email" htmlFor="email">Email </label>
          <input
            type="email"
            id="email"
            placeholder="youremail@email.com"
            onChange={handleSignUpChange}
            required
          ></input>
          <label htmlFor="password">Password </label>
          <input
            type="password"
            id="password"
            placeholder="********"
            onChange={handleSignUpChange}
            required
          ></input>
          </div>
          <button disabled={isLoading} type="submit">Sign up</button>
          {error && <div className="error">{error}</div>}
        </form>
      </div>
      <div className="to-login-page">
      <p>
      Already have an account? Login Here{" "}
        <span className="login-btn"
          onClick={() => {
            navigate("/login");
          }}
        >
          Sign Up Here
        </span>
      </p>
      </div>
    </div>
  );
};

export default SignUp;
