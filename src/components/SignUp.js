import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/signUp.css";

const SignUp = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confrimPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  // try {
  //   await axios
  //   .post("http://localhost:4000/signup", {firstName, lastName, email, password, confrimPassword})
  //   if (res.data === "exist"){
  //     alert("User already exist");
  //     }  catch (err) {
  //       alert("Please check your email and password are correct");
  //       console.log(err);
  //   }
  //   }

  const checkValidation = (e) => {
    setConfirmPassword(e.target.value);
    if (password !== e.target.value) {
      setError("Confirm Password shold match with password ");
    }
  };
  return (
    <>
      <div className="container">
        <h1 className="title">Sign Up</h1>
        <form className="signup-form" onSubmit={handleSubmit}>
          <div className="user-details">
            <div className="input-box-name">
              <label htmlFor="firstName">First Name</label>
              <span className="star"> * </span>
              <input
                type="name"
                id="firstName"
                placeholder="Enter your first name"
                required
                onChange={(e) => setFirstName(e.target.value)}
              ></input>
              <label htmlFor="lastName">Last Name</label>
              <span className="star"> * </span>
              <input
                type="name"
                id="lastname"
                placeholder="Enter your last name"
                required
                onChange={(e) => setLastName(e.target.value)}
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
              ></input>
            </div>
            <div className="input-box">
              <label htmlFor="password">Password </label>
              <span className="star"> * </span>
              <input
                type="password"
                id="password"
                placeholder="*******"
                required
                onChange={(e) => setPassword(e.target.value)}
              ></input>
            </div>
            <div className="input-box">
              <label htmlFor="password"> Confirm Password </label>
              <span className="star"> * </span>
              <input
                type="password"
                id="password"
                placeholder="*******"
                required
                onChange={(e) => checkValidation(e)}
              ></input>
            </div>
            <div>
              <button type="submit" className="sumbit-btn">
                Submit
              </button>
            </div>
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
