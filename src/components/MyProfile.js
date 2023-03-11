import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/myprofile.css";
import Alert from "./Alert";
import { useAuthContext } from "../hooks/useAuthContext";

const MyProfile = () => {
  const initialState = {
    fields: {
      firstName: "",
      lastName: "",
      email: "",
      events: "",
      password: "",
    },
    events: {
      currentEvents: "",
    },
    password: {
      oldPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    },
    alert: {
      message: "",
      success: "",
    },
  };

  const [fields, setFields] = useState(initialState.fields);
  const [events, setEvents] = useState(initialState.events);
  const [password, setPassword] = useState(initialState.password);
  const [alert, setAlert] = useState(initialState.alert);
  const [readableOnly, setReadableOnly] = useState(true);

  const user = useAuthContext();

  useEffect(() => {
    axios
      .get(`http://localhost:4000/${user}`)
      .then(({ data }) => setFields(data[0]))
      .catch(() => {
        setAlert({
          message: "Server error, please try again",
          isSuccess: false,
        });
      });
  }, [user]);

  const handleEvent = (e) => {
    setFields({ ...fields, [e.target.name]: e.target.value });
  };

  const handlePassword = () => {
    if (password.newPassword === password.confirmNewPassword) {
      axios
        .post(`http://localhost:4000/auth/login`, {
          email: fields.email,
          password: password.oldPassword,
        })
        .then((res) => {
          if (res.data.accessToken) {
            localStorage.setItem("user", JSON.stringify(res.data));
          }
          console.log(res.data.accessToken);
          setAlert({
            message: `${res.data.message}`,
            success: true,
          });
          return res.data;
        })
        .catch((err) => {
          setAlert({
            message: `${err.response.data.message}`,
            success: false,
          });
        });
    }
  };
  const handleUserProfile = () => {
    axios
      .patch(`http://localhost:4000/auth/signup/:id`, {
        firstName: fields.firstName,
        lastName: fields.lastName,
        email: fields.email,
      })
      .then(() => {
        setReadableOnly(true);
      })
      .catch(() => {
        setAlert({
          message: "Server error, please try again",
          success: false,
        });
      });
    };
    return (
      <div className="container">
      <Alert message={alert.message} success={alert.success} />
      <div className="pageTitle">
        <h1>My Profile</h1>
      </div>
      <div className="inputBox">
        <label className="firstName" htmlFor="firstName">
          First Name :
        </label>
        <input
          type="text"
          id="firstName"
          value={fields.firstName}
          onChange={handleEvent}
          readOnly={readableOnly}
        ></input>
      </div>
      <div className="inputBox">
        <label htmlFor="lastName">Last Name:</label>
        <input
          type="text"
          id="lastname"
          value={fields.lastName}
          onChange={handleEvent}
          readOnly={readableOnly}
        ></input>
      </div>
      <div className="inputBox">
        <div className="email">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={fields.email}
            onChange={handleEvent}
            readOnly={readableOnly}
          ></input>
        </div>
      </div>
      <div className="inputBox">
        <div className="event">
          <label className="currentEvent" htmlFor="currentEvent">
            Current Events :
          </label>
          <input
            type="text"
            id="currentEvent"
            value={events.currentEvents}
            readOnly={readableOnly}
          ></input>
        </div>
      </div>
      <div className="inputBox">
        <div className="password">
          <label htmlFor="oldPassword">Old Password:</label>
          <input
            type="oldPassword"
            id="oldPassword"
            placeholder="********"
            required
            readOnly={setReadableOnly}
            onChange={(e) =>
              setPassword({ ...password, [e.target.name]: e.target.value })
            }
            value={password.oldPassword}
          ></input>
        </div>
      </div>

      <div className="inputBox">
        <div className="password">
          <label htmlFor="newPassword">New Password:</label>
          <input
            type="newPassword"
            id="newPassword"
            placeholder="********"
            required
            readOnly={setReadableOnly}
            onChange={(e) =>
              setPassword({ ...password, [e.target.name]: e.target.value })
            }
            value={password.newPassword}
          ></input>
        </div>
      </div>

      <div className="inputBox">
        <div className="confirmPass">
        <label htmlFor="confirmNewPassword">Confirm New Password:</label>
        <input
          type="confirmNewPassword"
          id="confirmNewPassword"
          placeholder="********"
          required
          readOnly={setReadableOnly}
          onChange={(e) =>
            setPassword({ ...password, [e.target.name]: e.target.value })
          }
          value={password.confirmNewPassword}
        ></input>
        </div>
        
      </div>
      <div className="submitButton">
        <button type="submit" onClick={handleUserProfile}>
          Update Password
        </button>
      </div>
    </div>
  );
};

export default MyProfile;
