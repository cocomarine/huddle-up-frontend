import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAuthContext } from "../../hooks/useAuthContext";
import Alert from "../Alert";
import AddEvent from "./AddEvent";
import "../../styles/create-event.css";

const CreateEvent = () => {
  const { user } = useAuthContext();

  const navigate = useNavigate();

  const initialState = {
    fields: {
      title: "",
      description: "",
      total_votes: 0,
      category: "",
      AdminId:"",
    },
    alert: {
      message: "",
      success: false,
    },
  };
  const [alert, setAlert] = useState(initialState.alert);

  const changeLocation = (redirect) => {
    navigate(redirect, { replace: true });
    // window.location.reload();
  };

  const handleAddEvent = (event) => {
    event.preventDefault();
    AddEvent(initialState.fields, setAlert);
    changeLocation("/invitefriends");
    console.log(alert);
    setAlert({ message: "", success: false });

  };
  const handleFieldChange = (e) => {
    e.preventDefault();
    if (initialState.fields.hasOwnProperty(e.target.id)) {
      initialState.fields[e.target.id] = e.target.value;
    }
    if (e.target.name === "category") {
      initialState.fields[e.target.name] = e.target.value;
    }
    initialState.fields.AdminId = user.id;
    console.log(initialState.fields);
  };

  return (
    <div className="eventPgcontainer">
      <h1>Create Event</h1>
      <Alert message={alert.message} success={alert.success} />
      <form onSubmit={handleAddEvent}>
        <div className="eventForm">
          <label htmlFor="title"> Event Title:</label>
          <div>
            <input
              type="text"
              placeholder="Enter your event title"
              id="title"
              onChange={handleFieldChange}
              required
            ></input>
          </div>
        </div>
        <div className="description">
          <label htmlFor="description"> Event Description:</label>
          <div>
            <input
              type="text"
              placeholder="Enter the details of the event"
              id="description"
              onChange={handleFieldChange}
              required
            ></input>
          </div>
        </div>
        <br></br>
        <label className="category" id="category" htmlFor="categories">
          Event Category
        </label>

        <select onChange={handleFieldChange} name="category">
          <option value="restaurant"> Restaurant </option>
          <option value="coffee-tea">Coffee / Tea </option>
          <option value="drinks">Drinks </option>
          <option value="outdoor">Outdoor </option>
          <option value="cinema-show">Cinema / Show </option>
          <option value="playdate">Playdate</option>
          <option value="other">Other</option>
        </select>

        <div className="createEvent">
          <button type="submit">Create Event</button>
        </div>
      </form>
    </div>
  );
};

export default CreateEvent;