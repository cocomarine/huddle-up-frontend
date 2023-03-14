import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuthContext } from "../hooks/useAuthContext";
import Alert from "./Alert";

import "../styles/common/titles.css";
import "../styles/common/page.css";
import "../styles/common/buttons.css";
import "../styles/login.css";

const Login = () => {
  const [alert, setAlert] = useState({ message: "", isSuccess: false });

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { dispatch } = useAuthContext();

  const navigate = useNavigate();

  const changeLocation = (redirect) => {
    navigate(redirect, { replace: true });
    window.location.reload();
  };

  const handleSignin = async (e) => {
    e.preventDefault();

    setAlert({ message: "", isSuccess: false });

    axios
      .post("http://localhost:4000/auth/signin", { email, password })
      .then((res) => {
        setAlert({
          message: `${res.data.message}`,
          isSuccess: true,
        });
        localStorage.setItem("user", JSON.stringify(res.data));
        dispatch({ type: "LOGIN", payload: res.data });

        changeLocation("/myevents");
        return res.data;
      })
      .catch((err) => {
        setAlert({
          message: `${err.response.data.message}`,
          isSuccess: false,
        });
      });
  };

  return (
    <div className="loginPage">
      <h1 className="titleSignin"> Login</h1>
      <div className="loginForm">
        <form onSubmit={handleSignin}>
          <div className="labels">
            <label className="email" htmlFor="email">
              Email{" "}
            </label>
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
          <div className="login">
            <button type="submit">Log in</button>
          </div>
        </form>
      </div>
      <div className="createNewAccount">
        <p>
          Don't have an account?{" "}
          <span
            className="signUpHere"
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
