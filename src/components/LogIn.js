import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/logIn.css";
const LogIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios
        .post("http://localhost:4000/login", { email, password })
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
    <div className="page">
      <h1 className="titleSignin"> Login</h1>
      <form className="form" onSubmit={handleSubmit}>
        <label htmlFor="email">Email </label>
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
        <button type="submit">Login</button>
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
