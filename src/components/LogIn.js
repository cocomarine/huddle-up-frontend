import React, { useState } from "react";
import { useLogin } from "../hooks/useLogin";
import { useNavigate } from "react-router-dom";
// import axios from "axios";
import "../styles/login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const {login, error, isLoading} = useLogin();

  const navigate = useNavigate();

  const handleSignin = async (e) => {
    e.preventDefault();

    await login(email, password)
    console.log(email, password)

    // try {
    //   await axios
    //     .post("http://localhost:4000/auth/signin", { email, password })
    //     .then((res) => {
    //       if (res.data === "exist") {
    //         navigate("/myevents", { state: { id: email } });
    //       } else if (res.data === "!exist") {
    //         alert("User have not sign up");
    //       }
    //     });
    // } catch (err) {
    //   alert("Please check your email and password are correct");
    //   console.log(err);
    // }
  };

  return (
    <div className="loginPage">
      <h1 className="titleSignin"> Login</h1>
      <div className="loginForm">
        <form onSubmit={handleSignin}>
          <div className="labels">
          <label className="email" htmlFor="email">Email </label>
          <input
            type="email"
            id="email"
            placeholder="youremail@email.com"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
          ></input>
          <label htmlFor="password">Password </label>
          <input
            type="password"
            id="password"
            placeholder="*******"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required
          ></input>
          </div>
          <button disabled={isLoading} type="submit">Log in</button>
          {error && <div className="error">{error}</div>}
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
