import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuthContext } from "../hooks/useAuthContext";
import Alert from "./Alert";
import "../styles/sign-up.css";

const SignUp = () => {
  const [alert, setAlert] = useState({ message: "", isSuccess: false });

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("")

  const { dispatch } = useAuthContext();

  const navigate = useNavigate();
  const changeLocation = (redirect) => {
    navigate(redirect, { replace: true });
    window.location.reload();
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    
    setAlert({ message: "", isSuccess: false });

    if (password === passwordCheck) {
      axios
      .post('http://localhost:4000/auth/signup', { firstName, lastName, email, password })
        .then((res) => {
          setAlert({
            message: `Welcome to HuddleUp, ${firstName}!`,
            isSuccess: true,
          });
          localStorage.setItem("user", JSON.stringify(res.data));
          dispatch({type: "LOGIN", payload: res.data});

          changeLocation("/");
        })
        .catch((err) => {
          setAlert({
            message: `${err.response.data.message}`,
            isSuccess: false,
          });
        });
    } else {
      setAlert({
        message: "Passwords do not match",
        isSuccess: false,
      });
    }
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
                type="text"
                id="firstName"
                placeholder="Enter your first name"
                required
                onChange={(e) => setFirstName(e.target.value)}
                value={firstName}
              ></input>
              <label htmlFor="lastName">Last Name</label>
              <span className="star"> * </span>
              <input
                type="text"
                id="lastname"
                placeholder="Enter your last name"
                required
                onChange={(e) => setLastName(e.target.value)}
                value={lastName}
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
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              ></input>
            </div>
            <div className="input-box">
              <label htmlFor="password">Password </label>
              <span className="star"> * </span>
              <input
                type="password"
                id="password"
                placeholder="********"
                required
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              ></input>
            </div>
            <div className="input-box">
              <label htmlFor="password"> Confirm Password </label>
              <span className="star"> * </span>
              <input
                type="password"
                id="cornfirmPassword"
                placeholder="confirm Password"
                required
                onChange={(e) => setPasswordCheck(e.target.value)}
                value={passwordCheck}
              ></input>
            </div>
            <div>
              <button type="submit">Sign up</button>
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