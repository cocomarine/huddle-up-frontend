import React, { useEffect, useState } from "react";

import { useAuthContext } from "../../hooks/useAuthContext";
import Alert from "../Alert";
import AddEvent from "./AddEvent";
import { useNavigate } from "react-router-dom";
import "../../styles/create-event.css";

const CreateEvent = () => {
  const { user } = useAuthContext();

  const navigate = useNavigate();
  const initialState = {
    fields: {
      title: "",
      description: "",
      category: "",
      voting_finished: false,
      AdminId:"",
    },
    alert: {
      message: "",
      success: false,
    },
  };
  const [alert, setAlert] = useState(initialState.alert);

  const handleAddEvent = (event) => {
    event.preventDefault();
    AddEvent(initialState.fields, setAlert);
    // setAlert({
    //   message: "Event was created successfully",
    //   success: true
    // });
    navigate("/InviteFriends");
    console.log(alert);
  };
  const handleFieldChange = (e) => {
    e.preventDefault();
    if (initialState.fields.hasOwnProperty(e.target.id)) {
      initialState.fields[e.target.id] = e.target.value;
    }
    if (e.target.name === "categories") {
      initialState.fields[e.target.name] = e.target.value;
    }
    console.log(initialState.fields);
  };

  // add backbutton to go back to my events page?
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
          <option value="resturant"> Resturant </option>
          <option value="coffe">Coffe </option>
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
