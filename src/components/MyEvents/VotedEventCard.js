import React, { useState, useEffect } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";

import { getCategoryIcon } from "../../utils/icons";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useEventContext } from "../../hooks/useEventContext";

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
  const [event, setEvent] = useState({});
  const [votedSuggestion, setVotedSuggestion] = useState("");

  const { user } = useAuthContext();
  const { dispatch } = useEventContext();

  const navigate = useNavigate();

  const changeLocation = (redirect) => {
    navigate(redirect, { replace: true });
  };

  useEffect(() => {
    axios
      .get(`http://localhost:4000/events/${id}`)
      .then((res) => {
        const event = res.data;
        setEvent(event);

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
            className="voted-card__map-button"
            onClick={() => {
              dispatch({type: "EVENT_MOST_VOTED_SUG", payload: event });
              changeLocation("/mapplaces");
            }}
          >
            <FontAwesomeIcon icon={faLocationDot} />
        </button>
        <div className="voted-card__title heading1">
          <FontAwesomeIcon
            size="lg"
            icon={getCategoryIcon(category)}
            className="event-icon"
            data-testid="event-icon"
          />
          &nbsp; {title}
        </div>
        <div className="voted-card__description">{description}</div>
        <div className="voted-card__voted-suggestion">{votedSuggestion.suggestion}</div>
        <div className="voted-card__date">Event Date: {date}</div>
        <div className="voted-card__participants">With: {participants}</div>
      </div>
    </div>
  );
};

VotedEventCard.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
};

export default VotedEventCard;
