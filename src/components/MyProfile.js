import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { useAuthContext } from "../hooks/useAuthContext";

import "../styles/common/titles.css";
import "../styles/common/page.css";
import "../styles/common/buttons.css";
import "../styles/myprofile.css";

const MyProfile = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [alert, setAlert] = useState({
    message: "",
    isSuccess: false,
  }); 

  const { user } = useAuthContext();
  console.log(user)

  const navigate = useNavigate();

  const changeLocation = (redirect) => {
    navigate(redirect, { replace: true });
    window.location.reload();
  };

  useEffect(() => {
    let active = true;

    if (user) {
      axios
        .get(`http://localhost:4000/users/${user.id}`)
        .then((res) => {
          setFirstName(res.data.first_name);
          setLastName(res.data.last_name);
          setEmail(res.data.email);
        })
        .catch(() => {
          setAlert({
            message: "Server error, please try again",
            isSuccess: false,
          });
        });
    };
    return () => {active = false};
  },[user]);

  return (
    <div className="profile-container page">
      <h3 className="pageTitle page-title">My Profile</h3>
      <div className="inputBox">
        <label className="firstName subtitle" htmlFor="firstName">
          First Name :
        </label>
        <input
          type="text"
          id="firstName"
          value={firstName}
          disabled
        ></input>
      </div>
      <div className="inputBox">
        <label className="lastName subtitle" htmlFor="lastName">Last Name:</label>
        <input
          type="text"
          id="lastname"
          value={lastName}
          disabled
        ></input>
      </div>
      <div className="inputBox">
        {/* <div className="email"> */}
          <label className="email-input subtitle" htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            disabled
          ></input>
        </div>
        <button
            className="goto-myEventsBtn link-button"
            onClick={() => {
              changeLocation("/myevents");
            }}
          >
          Go to My Events
        </button>
    </div>
  );
};

export default MyProfile;
