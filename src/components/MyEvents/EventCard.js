import React, { useState, useEffect } from "react";
import axios from "axios";
import PropTypes from "prop-types";
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

import { useAuthContext } from "../../hooks/useAuthContext";
import Alert from "../Alert";

import "../../styles/common/titles.css";
import "../../styles/event-card.css";

const EventCard = ({
  id,
  title,
  date,
  description,
  participants,
  total_votes,
  category,
  AdminId,
}) => {
  const [suggestions, setSuggestions] = useState([]); 
  const [totalEventVotes, setTotalEventVotes] = useState(); 
  const [votedSugId, setVotedSugId] = useState(); 
  const [userSuggestion, setUserSuggestion] = useState({}); 
  const [voteCount, setVoteCount] = useState(); 
  const [sugSelected, setSugSelected] = useState(false); 

  const [newSuggestion, setNewSuggestion] = useState("");
  const [alert, setAlert] = useState({
    message: "",
    isSuccess: false,
  }); 

  const { user } = useAuthContext();

  useEffect(() => {
    axios
      .get(`http://localhost:4000/events/${id}`)
      .then((res) => {
        const sugs = res.data.Suggestions;
        sugs.sort((a, b) => {
          if (a.suggestion < b.suggestion) {
            return -1;
          }
          if (a.suggestion > b.suggestion) {
            return 1;
          }
          return 0;
        });

        setSuggestions(sugs);

        const totalVotes = sugs.reduce((prev, current) => 
          prev + current.votes, 0,
        );
        setTotalEventVotes(totalVotes);

        // update total_votes of event
        axios
          .patch(`http://localhost:4000/events/${id}`, { total_votes: totalVotes })

        // get userevent and find a userevent that matches eventid and userid
        axios
          .get(`http://localhost:4000/userevents`)
          .then((res) => {
            const filteredUserEvent = res.data.find((userevent) => (userevent.EventId === id && userevent.UserId === user.id));

            // do setVotedSugId
            setVotedSugId(filteredUserEvent.voted_suggestionId);
            
            // if user selected a sug, setSugSelected
            if (filteredUserEvent.voted_suggestionId) {
              axios
                .get(`http://localhost:4000/suggestions/${filteredUserEvent.voted_suggestionId}`)
                .then((res) => {
                  setSugSelected(true);
                });
              } else {
                setSugSelected(false);
              }
          });

        // find if user already has put forward suggestion for this event and do setUserSuggestion
        axios
          .get(`http://localhost:4000/suggestions`)
          .then((res) => {
            const filteredUserSuggestion = res.data.find((sug) => (sug.EventId === id && sug.UserId === user.id));
            setUserSuggestion(filteredUserSuggestion);
        });
      })
      .catch(() => {
        setAlert({
          message: "Server error, please try again",
          isSuccess: false,
        });
      });
  }, [user, totalEventVotes, voteCount, votedSugId, sugSelected, newSuggestion]);

  const updateSugVotes = (sugId, selected, voteCount) => {
    let sugVotes = voteCount;
    console.log("updateSugVotes: selected and voteCount:", selected, voteCount)

    if (selected) {
      sugVotes ++;
    } else {
      if (voteCount > 0) {
        sugVotes --;
      } else {
        sugVotes = 0;
      }
    }
    
    axios
      .patch(`http://localhost:4000/suggestions/${sugId}`, { votes: sugVotes});
  };

  const updateVotedSug = (eventId, userId, suggestionId) => {
    axios
      .get(`http://localhost:4000/userevents`)
      .then((res) => {
        const filteredUserEvent = res.data.filter((userevent) => (userevent.EventId === eventId && userevent.UserId === userId));
      
        axios
          .patch(`http://localhost:4000/userevents/${filteredUserEvent[0].id}`, { voted_suggestionId: suggestionId })
    })
  };

  const updateEventVotes = (eventId) => {
    axios
      .get(`http://localhost:4000/events/${eventId}`)
      .then((res) => {
        const sugs = res.data.Suggestions;
        const totalVotes = sugs.reduce((prev, current) => 
          prev + current.votes, 0,
        );
        
        axios
          .patch(`http://localhost:4000/events/${eventId}`, { total_votes: totalVotes })
        
        setTotalEventVotes(totalVotes);
      });
  };

  const handleVote = (e) => {
    e.preventDefault();
    let voteToggle = !sugSelected;
    setSugSelected(voteToggle)
    const clickedSugId = e.target.value;

    axios
      .get(`http://localhost:4000/suggestions/${clickedSugId}`)
      .then((res) => {
        const sugVotes = res.data.votes;
        setVoteCount(sugVotes);

        if (voteToggle) {
          setVotedSugId(clickedSugId);
          updateSugVotes(clickedSugId, voteToggle, sugVotes);
          updateVotedSug(id, user.id, clickedSugId);
          updateEventVotes(id);
        } else {
          updateSugVotes(clickedSugId, voteToggle, sugVotes);
          updateVotedSug(id, user.id, null);
          updateEventVotes(id);
        }
      })
  };

  const handleSubmitSuggestion = (e) => {
    e.preventDefault();

    if (!newSuggestion) {
      setAlert({
        message: "Please enter new suggestion",
        isSuccess: false,
      });
      setNewSuggestion("");
      return;
    }

    axios
      .post(`http://localhost:4000/suggestions`, {
         suggestion: newSuggestion,
         votes: 0,
         UserId: user.id,
         EventId: id,
      })
      .then((res) => {
        console.log(res.config.data)
        setSuggestions([...suggestions, res.config.data]);
        setNewSuggestion("");
        setAlert({
          message: "Suggestion successfully added",
          isSuccess: true,
        });
      })
    setAlert({ message: "", isSuccess: false });
  };

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
    <div className="event-card">
      <div className="event-card-container">
        <div className="event-card__title heading1">
          <FontAwesomeIcon
            size="lg"
            pull="left"
            icon={iconSelector(category)}
            className="event-icon"
            data-testid="event-icon"
          />
          {title}
        </div>
        <div className="event-card__description">{description}</div>
        <div className="event-card__date">Event Date: {date}</div>
        <div className="event-card__participants">With: {participants}</div>
        <div className="event-card__suggestions__container">
          {suggestions[0] ? <div className="event-card__suggestions">
            {suggestions.map((item) => {
              return <button
                      key={`${item.suggestion}-${item.id}`}
                      onClick={(e) => {
                        handleVote(e);
                      }} 
                      className={`suggestion__item ${votedSugId === item.id ? "voted" : ""}`} 
                      value={item.id}
                      disabled={votedSugId && votedSugId !== item.id}
                      >
                        {item.suggestion} &nbsp;&nbsp; {item.votes} &#47; {totalEventVotes}
                  </button>
            })}
          </div> : <div className="no-sug-msg">No suggestions yet</div> }
          {!userSuggestion && <div className="suggestion-input-container">
            <form className="even-card__suggestions__form" onSubmit={handleSubmitSuggestion} >
              <Alert message={alert.message} success={alert.isSuccess} />
              <input 
                type="text" 
                className="suggestion__input"
                value={newSuggestion}
                onChange={(e) => setNewSuggestion(e.target.value)}
              />
              <button 
                type="submit" 
                className="suggestion__button link-button" 
              >
                Submit
              </button>
            </form>
          </div>}
        </div>
      </div>
    </div>
  );
};

EventCard.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  date: PropTypes.instanceOf(Date).isRequired,
  category: PropTypes.string.isRequired,
};

export default EventCard;
