import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios
        .post("http://localhost:4000/auth/signin", { email, password })
        .then((res) => {
          if (res.data === "exist") {
            navigate("/myevents", { state: { id: email } });
          } else if (res.data === "!exist") {
            alert("User have not sign up");
          }
        });
    } catch (err) {
      alert("Please check your email and password are correct");
      console.log(err);
    }
  };

  return (
    <div className="loginPage">
      <h1 className="titleSignin"> Login</h1>
      <div className="loginForm">
        <form onSubmit={handleSubmit}>
          <div className="labels">
          <label className="email" htmlFor="email">Email </label>
          <input
            type="email"
            id="email"
            placeholder="youremail@email.com"
            onChange={(e) => setEmail(e.target.value)}
            required
          ></input>
          <label htmlFor="password">Password </label>
          <input
            type="password"
            id="password"
            placeholder="*******"
            onChange={(e) => setPassword(e.target.value)}
            required
          ></input>
          </div>
          {/* <div className="loginButton"> */}
          <button  type="submit">Login</button>
          {/* </div> */}
        </form>
      </div>
      <div className="createNewAccount">
      <p>
        Don't have an account?{" "}
        <span className="signUpHere"
          onClick={() => {
            navigate("/signUp");
          }}
        >
          Sign Up Here
        </span>
      </p>
      </div>
    </div>
  );
};

export default Login;
