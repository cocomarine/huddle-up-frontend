import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { useAuthContext } from "../hooks/useAuthContext";
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
    <div className="profile-container">
      <h2 className="pageTitle">My Profile</h2>
      <div className="inputBox">
        <label className="firstName" htmlFor="firstName">
          First Name :
        </label>
        <input
          type="text"
          id="firstName"
          value={firstName}
          readOnly
          // onChange={handleEvent}
          // readOnly={readableOnly}
        ></input>
      </div>
      <div className="inputBox">
        <label htmlFor="lastName">Last Name:</label>
        <input
          type="text"
          id="lastname"
          value={lastName}
          readOnly
          // onChange={handleEvent}
          // readOnly={readableOnly}
        ></input>
      </div>
      <div className="inputBox">
        <div className="email">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            readOnly
            // onChange={handleEvent}
            // readOnly={readableOnly}
          ></input>
        </div>
        <button
            className="goto-myEventsBtn"
            onClick={() => {
              changeLocation("/myevents");
            }}
          >
          Go to My Events
        </button>
      </div>
    </div>
  );
};

export default MyProfile;
