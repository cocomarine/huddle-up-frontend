import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAuthContext } from "../../hooks/useAuthContext";
import Alert from "../Alert";
import AddEvent from "./AddEvent";
import "../../styles/create-event.css";

const CreateEvent = () => {
  const initialState = {
    fields: {
      title: "",
      description: "",
      total_votes: 0,
      category: "",
      AdminId: "",
    },
    alert: {
      message: "",
      success: false,
    },
  };

  const [fields, setFields] = useState(initialState.fields);
  const [alert, setAlert] = useState(initialState.alert);

  const { user } = useAuthContext();

  const navigate = useNavigate();

  const handleAddEvent = (e) => {
    e.preventDefault();
    AddEvent(fields, setAlert);
    console.log(alert);
    setAlert({ message: "", success: false });

    navigate("/invitefriends");
  };
  const handleFieldChange = (e) => {
    // if (initialState.fields.hasOwnProperty(e.target.id)) {
    //   initialState.fields[e.target.id] = e.target.value;
    // }
    fields.AdminId = user.id;

    // if (e.target.name === "category") {
    //   initialState.fields[e.target.name] = e.target.value;
    // }
    setFields({ ...fields, [e.target.name]: e.target.value });
    console.log(fields);
  };

  // add backbutton to go back to my events page?
  return (
    <div className="eventPgcontainer">
      <h1>Create Event</h1>
      <Alert message={alert.message} success={alert.success} />
      <form onSubmit={handleAddEvent}>
        <div className="eventForm">
          {/* <label htmlFor="title"> Event Title:</label> */}
          <div>
            <input
              type="text"
              placeholder="Enter your event title"
              id="title"
              value={fields.title}
              onChange={handleFieldChange}
              required
            />
          </div>
        </div>
        <div className="description">
          <label htmlFor="description"> Event Description:</label>
          <div>
            <input
              type="text"
              placeholder="Enter details and questions."
              id="description"
              value={fields.description}
              onChange={handleFieldChange}
              required
            />
          </div>
        </div>
        <br></br>
        <label className="categories" id="category" htmlFor="category">
          Event Category
        </label>

        <select
          value={fields.category}
          onChange={handleFieldChange} 
          name="category"
        >
          <option value="resturant"> Resturant </option>
          <option value="coffee">Coffee </option>
          <option value="park">Park </option>
          <option value="cinema">Cinema </option>
          <option value="softPlay">Soft Play</option>
        </select>

        <div className="createEvent">
          <button type="submit">Create Event</button>
        </div>
      </form>
    </div>
  );
};

export default CreateEvent;
