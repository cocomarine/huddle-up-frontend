import React, { useState, useEffect } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { useAuthContext } from "../../hooks/useAuthContext";
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

import "../../styles/common/titles.css";
import "../../styles/voted-event-card.css";

const VotedEventCard = ({
  id,
  title,
  date,
  description,
  participants,
  total_votes,
  category,
  AdminId,
}) => {
  const [adminFirstName, setAdminFirstName] = useState("");
  const [votedSuggestion, setVotedSuggestion] = useState("");

  const { user } = useAuthContext();

  const getAdminName = (event) => {
    const adminID = event.AdminId;
    const eventUsers = event.Users;
    const adminData = eventUsers.find(
      (eventUser) => eventUser.id === adminID
    );

    return adminData.first_name;
  };

  useEffect(() => {
    axios
      .get(`http://localhost:4000/events/${id}`)
      .then((res) => {

        setAdminFirstName(getAdminName(res.data));

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
        <div className="voted-card__title heading1">
          <FontAwesomeIcon
            size="lg"
            icon={iconSelector(category)}
            className="event-icon"
            data-testid="event-icon"
          />
          &nbsp; {title}
        </div>
        <div className="voted-card__description">{description}</div>
        <div className="voted-card__voted-suggestion">{votedSuggestion.suggestion}</div>
        <div className="voted-card__date">Event Date: {date}</div>
        <div className="voted-card__admin">Creator: {adminFirstName}</div>
      </div>
    </div>
  );
};

VotedEventCard.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  date: PropTypes.instanceOf(Date).isRequired,
  category: PropTypes.string.isRequired,
};

export default VotedEventCard;
