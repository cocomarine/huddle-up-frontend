import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/home.css";

const Home = () => {
  const navigate = useNavigate();

  return (
    <>
      <body>
        <h1 className="title">Huddle Up</h1>
      </body>
      <p>
        Lorem ipsum dolor sit amet. Est nobis nostrum aut ullam illo qui
        provident autem. Eos repudiandae repellendus quo ipsa natus et itaque
        consequuntur aut iste minima nam dolore incidunt. Eum quia voluptates ut
        recusandae cupiditate sit velit autem eos iure doloribus 33 dolor eaque
        At nostrum atque. Id suscipit assumenda sit asperiores incidunt sit
        nulla nisi et odit repudiandae.
      </p>
      <div className="buttons">
      <button
        className="loginBtn"
        onClick={() => {
          navigate("/login") ;
        }} 
        >
        Login
      </button>
      </div>
      <div>
      <button
        className="signUpBtn"
        onClick={() => {
          navigate("/signup");
        }}
        >
        Sign up
      </button>
      </div>
    </>
  );
};

export default Home;
