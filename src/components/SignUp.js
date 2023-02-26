import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/signUp.css";

const SignUp = () => {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <>
      <div className="container">
        <h1 className="title">Registraion</h1>
        <form className="signup-form" onSubmit={handleSubmit}>
          <div className="user-details">
            <div className="input-box-name">
              <label htmlFor="Fullname">Full Name</label>
              <span className="star"> * </span>
              <input
                type="name"
                id="Fullname"
                placeholder="Enter your full name"
                required
              ></input>
            </div>
            <div className="input-box">
              <label htmlFor="Username">User Name</label>
              <span className="star"> * </span>
              <input
                type="name"
                id="Username"
                placeholder="Your UserName"
                required
              ></input>
            </div>
            <div className="input-box-gender">
              <div className="gender-details">
                <label>Gender</label>
                <span className="star"> * </span>
                <input name="gender" type="radio" value="Male"></input>
                <label>Male</label>
                <input type="radio" name="gender" value="Female"></input>
                <label>Female</label>
                <input type="radio" name="gender" value="Female"></input>
                <label>Perfer not to say </label>
              </div>
            </div>
            <div className="input-box">
              <label htmlFor="email">Email </label>
              <span className="star"> * </span>
              <input
                type="email"
                id="email"
                placeholder="youremail@email.com"
                required
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
