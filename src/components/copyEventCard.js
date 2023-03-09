import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuthContext } from "../hooks/useAuthContext";
import { IoIosCloseCircleOutline } from "react-icons/io";

import "../styles/event-card.css";

const EventCard = ({
  id,
  title,
  description,
  total_votes,
  AdminId,
}) => {
  const [suggestions, setSuggestions] = useState([]);
  const [adminFirstName, setAdminFirstName] = useState("");
  const [votedToggle, setVotedToggle] = useState();
  const [voteCount, setVoteCount] = useState(0);
  const [totalEventVotes, setTotalEventVotes] = useState();


  const { user } = useAuthContext();

  const getAdminName = (event) => {
    const adminID = event.AdminId;
    const eventUsers = event.Users;
    const adminData = eventUsers.filter(
      (eventUser) => eventUser.id === adminID
    );

    return adminData[0].first_name;
  };

  useEffect(() => {
    axios
      .get(`http://localhost:4000/events/${id}`)
      .then((res) => {
        setSuggestions(res.data.Suggestions);
        setAdminFirstName(getAdminName(res.data));
      })
  }, [id]);

  const getVotesCast = (eventId, userId) => {
    axios
      .get(`http://localhost:4000/userevents`)
      .then((res) => {
        const filteredUserEvent = res.data.filter((userevent) => (userevent.EventId === eventId && userevent.UserId === userId));
        return filteredUserEvent.votes_cast;
      });
  };

  const updateVotesCast = (userEventId, votesCast) => {
    axios
      .patch(`http://localhost:4000/userevents/${userEventId}`, { votes_cast: votesCast });

    console.log(votesCast)

    if (votesCast) {
      setVoteCount((prev) => prev ++);
    } else {
      setVoteCount((prev) => prev > 0 ? prev -- : prev);
    }
  };

  const updateSugVotes = (suggestionId, votesCast, newVotes) => {
    if (votesCast) {
      setVoteCount((prev) => prev ++);
    } else {
      setVoteCount((prev) => prev > 0 ? prev -- : prev);
    }

    axios
      .patch(`http://localhost:4000/suggestions/${suggestionId}`, { votes: newVotes});
  };

  const getEventVotes = (eventId) => {
    axios
      .get(`http://localhost:4000/events/${eventId}`)
      .then((res) => {
        const sugs = res.data.Suggestions;
        const totalEventVotes = sugs.reduce((prev, current) => 
          prev + current.votes, 0,
        );

        return totalEventVotes;
    });
  };

  const updateEventVotes = (eventId, newVotes) => {
    axios
      .patch(`http://localhost:4000/events/${eventId}`, { total_votes: newVotes })
  };

  const handleVote = (e) => {
    e.preventDefault();
    const votedSugId = e.target.value;
    
    axios
      .get(`http://localhost:4000/suggestions/${votedSugId}`)
      .then((res) => {
        setVoteCount(res.data.votes); 
        console.log(res.data.votes)
        console.log(voteCount)

        const eventId = res.data.EventId;
        const votedUserId = user.id;

        const votesCast = getVotesCast(eventId, votedUserId);
        setVotedToggle(!votesCast);
        console.log(votesCast);

        updateSugVotes(votedSugId);
        updateVotesCast(votedUserId, votedToggle, voteCount);

        const totalVotes = getEventVotes(eventId);
        updateEventVotes(eventId, totalEventVotes);

        setTotalEventVotes(totalVotes);
      });
  };

  const handleSubmitSuggestion = (e) => {
    e.preventDefault();

  };

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
        <div className="event-card__admin">Creater: {adminFirstName}</div>
        <div className="event-card__suggestions__container">
          {suggestions[0] ? <div className="event-card__suggestions">
            {suggestions.map((item) => {
              return <p key={item.id}>
                  <button
                    onClick={(e) => {
                      handleVote(e)}} 
                    className={votedToggle ? "suggestion__item-voted" : "suggestion__item"} 
                    // className="suggestion__item"
                    value={item.id}
                  >
                  {item.suggestion} &nbsp;&nbsp; {totalEventVotes}
                  </button>
                </p>
            })}
          </div> : <p>No suggestions yet</p> }
          {/* {wrap suggestions form in a conditional: only if use hasn't made any suggestion, 
        the show the form or activate the submit button}  */}
          <form className="even-card__suggestions__form" onSubmit={() => {}} >
            <input 
              type="text" 
              className="suggestion__input"
              // value={test}
              onChange={() => {}}
            />
            <button 
              type="submit" 
              className="suggestion__button" 
              onSubmit={(e) => {handleSubmitSuggestion(e)}}
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
