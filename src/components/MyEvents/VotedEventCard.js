import React, { useState, useEffect } from "react";
import axios from "axios";
import PropTypes from "prop-types";
// import { useAuthContext } from "../hooks/useAuthContext";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUtensils,
  faMugSaucer,
  faMartiniGlassCitrus,
  faMountainSun,
  faTicket,
  faChildReaching,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";

import "../../styles/voted-event-card.css";

const VotedEventCard = ({
  id,
  title,
  description,
  category,
  AdminId,
}) => {
  const [adminFirstName, setAdminFirstName] = useState("");
  const [votedSuggestion, setVotedSuggestion] = useState("");

  // const { user } = useAuthContext();

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

  const iconSelector = (category) => {
    switch (category) {
      case "restaurant":
        return faUtensils;
      case "coffee-tea":
        return faMugSaucer;
      case "drinks":
        return faMartiniGlassCitrus;
      case "outdoor":
        return faMountainSun;
      case "cinema-show":
        return faTicket;
      case "playdate":
        return faChildReaching;
      case "other":
        return faUsers;
      default:
        return faUsers;
    }
  };

  return (
    <div className="voted-card">
      <div className="voted-card-container">
      <button 
          className="voted-card__close-button"
          onClick={() => {}}
        >
          <IoIosCloseCircleOutline />
        </button>
        <div className="voted-card__title">
          <FontAwesomeIcon
            size="xl"
            icon={iconSelector(category)}
            className="event-icon"
            data-testid="event-icon"
          />
          &nbsp; {title}
        </div>
        <div className="voted-card__description">{description}</div>
        <div className="voted-card__voted-suggestion">{votedSuggestion.suggestion}</div>
        <div className="voted-card__admin">Creator: {adminFirstName}</div>
      </div>
    </div>
  );
};

VotedEventCard.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  AdminId: PropTypes.number,
};

export default VotedEventCard;
