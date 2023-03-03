import React, { useState, useEffect } from "react";
import axios from "axios";
import { IoIosCloseCircleOutline } from "react-icons/io";

import "../styles/event-card.css";

const EventCard = ({
  id,
  title,
  description,
  voting_finished,
  AdminId,
}) => {

  const [adminFirstName, setAdminFirstName] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:4000/events/${id}`)
      .then((res) => {
        const adminID = res.data.AdminId;
        const eventUsers = res.data.Users;
        const adminData = eventUsers.filter(
          (eventUser) => eventUser.id === adminID
        );

        setAdminFirstName(adminData[0].first_name);
        setSuggestions(res.data.Suggestions);
      })
  }, []);

  return (
    <div className="event-card">
      <div className="event-card-container">
      <button 
          className="event-card__close-button"
          onClick={() => {}}
        >
          <IoIosCloseCircleOutline />
        </button>
        <div className="event-card__title">{title}</div>
        <div className="event-card__description">{description}</div>
        <div className="event-card__suggestions">
          {/* {suggestions && suggestions.map((suggestion) => {
            <div className="voted-cards__item" key={suggestion.id}>
              {suggestion}
            </div>
          })} */}
        </div>
        <div className="event-card__admin">Creater: {adminFirstName}</div>
      </div>
    </div>
  );
};

export default EventCard;
