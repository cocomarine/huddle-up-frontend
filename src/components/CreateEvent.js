import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ScrollToTop from "react-scroll-to-top";
import { IoIosArrowUp } from "react-icons/io";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {  faAngleLeft } from "@fortawesome/free-solid-svg-icons";

import { useAuthContext } from "../hooks/useAuthContext";
import { useEventContext } from "../hooks/useEventContext";
import Alert from "./Alert";

import "../styles/common/titles.css";
import "../styles/common/buttons.css";
import "../styles/create-event.css";

const CreateEvent = () => {
  const { user } = useAuthContext();
  const { dispatch } = useEventContext();

  const navigate = useNavigate();

  const initialState = {
    fields: {
      title: "",
      description: "",
      participants: "",
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

  const [fields, setFields] = useState(initialState.fields);
  const [alert, setAlert] = useState(initialState.alert);

  const changeLocation = (redirect) => {
    navigate(redirect, { replace: true });
    // window.location.reload();
  };

  const handleAddEvent = (event) => {
    event.preventDefault();

    axios
    .post("http://localhost:4000/events", fields)
    .then((res) => {
      const eventId = res.data.id;
      
      axios
        .post("http://localhost:4000/userevents", {
          voted__suggestionId: null,
          UserId: fields.AdminId,
          EventId: eventId,
        })
        .then((res) => {
          setAlert({
            message: "Event successfully created.",
            success: true,
          });
        });
      
      dispatch({type: "EVENT_CREATED", payload: res.data })
      changeLocation("/invitefriends");
    })
    .catch((err) => {
      setAlert({
        message: "Server error. Please try again later.",
        success: false,
      });
    });

    setAlert({ message: "", success: false });
  };
  
  const handleFieldChange = (e) => {
    fields.AdminId = user.id;
    setFields({ ...fields, [e.target.name]: e.target.value });
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
              name="title"
              placeholder="Enter your event title"
              id="title"
              value={fields.title}
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
              value={fields.description}
              onChange={handleFieldChange}
              required
            />
          </div>
        </div>

        <div className="participants">
          <label htmlFor="participants" className="participants-label subtitle"> 
            Participants
          </label>
          <div className="participants-container">
            <input
              type="text"
              name="participants"
              placeholder="Enter names"
              value={fields.participants}
              onChange={handleFieldChange}
            />
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
        <div className="date">
          <label htmlFor="date" className="date-label subtitle"> 
            Event Date
          </label>
          <div>
            <input
              value={fields.date}
              name="date"
              type="date"
              onChange={handleFieldChange}
              required
            ></input>
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