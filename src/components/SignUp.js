import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/sign-up.css";
import Alert from "./Alert";

const SignUp = () => {
  const initialState = {
    signUp: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      cofirmPassword: "",
    },
    alert: {
      msg: "",
      isSuccess: true,
    },
  };

  const [signUp, setSignUp] = useState(initialState.signUp);
  const [alert, setAlert] = useState(initialState.alert);

  const navigate = useNavigate();

  const handleSignUp = (e) => {
    e.preventDefault();
    setAlert({ message: "", isSuccess: false });
    if (signUp.password === signUp.cofirmPassword) {
      axios
        .post(`http://localhost:4000/auth/signup`, signUp)
        .then(() => {
          setAlert({
            message: `Welcome ${signUp.firstName} ${signUp.lastName}`,
            isSuccess: true,
          });
          navigate("/myevents");
        })
        .catch((err) => {
          setAlert({
            message: `${err.response.data.message}`,
            isSuccess: false,
          });
        });
    }
    setAlert({
      message: "Passwords do not match",
      isSuccess: false,
    });
  };
  const handleSignUpChange = (event) => {
    setSignUp({
      ...signUp,
      [event.target.name]: event.target.value,
    });
  };
  return (
    <>
      <div className="container">
        <h1 className="title">Sign Up</h1>
        <form className="signup-form" onSubmit={handleSignUp}>
          <div className="user-details">
            <div className="input-box-name">
              <label htmlFor="firstName">First Name</label>
              <span className="star"> * </span>
              <input
                type="name"
                id="firstName"
                value={signUp.firstName}
                placeholder="Enter your first name"
                required
                onChange={handleSignUpChange}
              ></input>
              <label htmlFor="lastName">Last Name</label>
              <span className="star"> * </span>
              <input
                type="name"
                id="lastname"
                value={signUp.lastName}
                placeholder="Enter your last name"
                required
                onChange={handleSignUpChange}
              ></input>
            </div>

            <div className="input-box">
              <label htmlFor="email">Email </label>
              <span className="star"> * </span>
              <input
                type="email"
                id="email"
                placeholder="youremail@email.com"
                required
                value={signUp.email}
                onChange={handleSignUpChange}
              ></input>
            </div>
            <div className="input-box">
              <label htmlFor="password">Password </label>
              <span className="star"> * </span>
              <input
                type="password"
                id="password"
                value={signUp.password}
                placeholder="*******"
                required
                onChange={handleSignUpChange}
              ></input>
            </div>
            <div className="input-box">
              <label htmlFor="password"> Confirm Password </label>
              <span className="star"> * </span>
              <input
                type="password"
                id="cornfirmPassword"
                value={signUp.confirmPassword}
                placeholder="confirm Password"
                required
                onChange={handleSignUpChange}
              ></input>
            </div>
            <div>
              <button
                onClick={() => {
                  navigate("/myevents");
                }}
                type="submit"
                className="sumbit-btn"
              >
                Submit
              </button>
            </div>
            <Alert message={alert.message} success={alert.isSuccess} />
            <div>
              <button
                className="Login-btn"
                onClick={() => {
                  navigate("/login");
                }}
              >
                Already have an account? Login Here
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default SignUp;