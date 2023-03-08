import React, { useState, useEffect } from "react";
import axios from "axios";
import { IoIosCloseCircleOutline } from "react-icons/io";

import "../styles/voted-event-card.css";

const VotedEventCard = ({
  id,
  title,
  description,
  voting_finished,
  AdminId,
}) => {
  const [adminFirstName, setAdminFirstName] = useState("");
  const [votedSuggestion, setVotedSuggestion] = useState("");

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

        const sugs = res.data.Suggestions;
        const mostVoted = sugs.reduce((prev, current) => {
          return prev.votes > current.votes ? prev: current;
        })

        setVotedSuggestion(mostVoted);
      })
  }, []);

  return (
    <div className="voted-card">
      <div className="voted-card-container">
      <button 
          className="voted-card__close-button"
          onClick={() => {}}
        >
          <IoIosCloseCircleOutline />
        </button>
        <div className="voted-card__title">{title}</div>
        <div className="voted-card__description">{description}</div>
        <div className="voted-card__voted-suggestion">{votedSuggestion.suggestion}</div>
        <div className="voted-card__admin">Creator: {adminFirstName}</div>
      </div>
    </div>
  );
};

export default VotedEventCard;