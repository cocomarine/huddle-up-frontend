import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ScrollToTop from "react-scroll-to-top";
import { IoIosArrowUp } from "react-icons/io";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {  faAngleLeft } from "@fortawesome/free-solid-svg-icons";

import { useAuthContext } from "../../hooks/useAuthContext";
import Alert from "../Alert";
import AddEvent from "./AddEvent";

import "../../styles/common/titles.css";
import "../../styles/common/buttons.css";
import "../../styles/create-event.css";

const CreateEvent = () => {
  const { user } = useAuthContext();

  const navigate = useNavigate();

  const initialState = {
    fields: {
      title: "",
      description: "",
      total_votes: 0,
      date: "",
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
      <h3 className="eventPgtitle page-title">Create Event</h3>
      <Alert message={alert.message} success={alert.success} />
      <form onSubmit={handleAddEvent}>
        <div className="eventForm">
          <label htmlFor="title" className="eventtitle-label subtitle"> 
            Event Title
          </label>
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
          <label htmlFor="description" className="description-label subtitle"> 
          Event Description
          </label>
          <div>
            <textarea 
              name="description" 
              id="description" 
              cols="43" 
              rows="10"
              placeholder="Enter the details of the event"
              onChange={handleFieldChange}
              required
            />
          </div>
        </div>
        <div className="date">
          <label htmlFor="date" className="date-label subtitle"> 
            Event Date
          </label>
          <div>
            <input
              type="date"
              id="date"
              onChange={handleFieldChange}
              required
            ></input>
          </div>
        </div>
        <div className="catetory">
          <label className="category-label subtitle" id="category" htmlFor="categories">
            Event Category
          </label>
          <div>
            <select className="category-options" onChange={handleFieldChange} name="category">
              <option value="restaurant"> Restaurant </option>
              <option value="coffee-tea">Coffee / Tea </option>
              <option value="drinks">Drinks </option>
              <option value="outdoor">Outdoor </option>
              <option value="cinema-show">Cinema / Show </option>
              <option value="playdate">Playdate</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>

        <div className="createEvent">
          <button className="createEvent-Btn link-button" type="submit">Create Event</button>
        </div>
      </form>
      <button
        className="backto-myEvents-Btn link-button"
        onClick={() => {
          changeLocation("/myevents");
        }}
      >
        <FontAwesomeIcon
          icon={faAngleLeft}
          className="back-icon"
          data-testid="back-icon"
        />
        &nbsp; Back to My Events
      </button>
      <ScrollToTop smooth component={<IoIosArrowUp />} />
    </div>
  );
};

export default CreateEvent;