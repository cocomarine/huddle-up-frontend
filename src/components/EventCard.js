import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuthContext } from "../hooks/useAuthContext";
import { IoIosCloseCircleOutline } from "react-icons/io";

import "../styles/event-card.css";

const EventCard = ({
  id,
  title,
  description,
}) => {
  const [adminFirstName, setAdminFirstName] = useState(""); // admin for the event
  const [suggestions, setSuggestions] = useState([]); //all the sugs of the event
  const [totalEventVotes, setTotalEventVotes] = useState(); //total votes for the event
  const [isVoted, setIsVoted] = useState(false) //userevent votes_cast true or false
  const [filteredEvent, setFilteredEvent] = useState()
  // const [userSuggestions, setUserSuggestions] = useState([]); //sugs that the user put forward
  const [voteCount, setVoteCount] = useState(0); //number of votes for a suggestion

  const { user } = useAuthContext();

  const getAdminName = (event) => {
    const adminID = event.AdminId;
    const eventUsers = event.Users;
    const adminData = eventUsers.filter(
      (eventUser) => eventUser.id === adminID
    );

    return adminData[0].first_name;
  };

  const getUserEvent = (eventId, userId) => {
    axios
      .get(`http://localhost:4000/userevents`)
      .then((res) => {
        const filteredUserEvent = res.data.filter((userevent) => (userevent.EventId === eventId && userevent.UserId === userId));
        console.log(filteredUserEvent[0])

        // return filteredUserEvent[0];
        return setFilteredEvent(filteredUserEvent[0]);
        // console.log("after setFE:", filteredUserEvent[0])
        // console.log("filteredEvent:", filteredEvent)
      })
      .catch((err) => {
        console.log(err);
      })
  };

  // in every render, get suggestions list and setSuggestions and 
  // get admin name and setAdminFirstName.
  // also add up votes of suggestions and setTotalEventVotes
  useEffect(() => {
    axios
      .get(`http://localhost:4000/events/${id}`)
      .then((res) => {
        setSuggestions(res.data.Suggestions);
        setAdminFirstName(getAdminName(res.data));

        const sugs = res.data.Suggestions;
        const totalVotes = sugs.reduce((prev, current) => 
          prev + current.votes, 0,
        );
        setTotalEventVotes(totalVotes);
      });
  }, [id]);

  // in every render, filter and get useevent that matches user id and event id,
  // store boolean votes_cast using setIsVoted
  useEffect(()=> {
    console.log(id, user.id)
    getUserEvent(id, user.id);
    console.log(setFilteredEvent)
    setIsVoted(filteredEvent.votes_cast);
    console.log("isVoted", isVoted)
  }, [id, user.id, filteredEvent, isVoted]);

  const getVoteCount = (suggestionId) => {
    axios
      .get(`http://localhost:4000/suggestions/${suggestionId}`)
      .then((res) => {
        return res.data.votes;
    });
  };

  const updateSugVotes = (suggestionId, votesCast, voteCount) => {
    if (votesCast) {
      setVoteCount((prev) => prev ++);
    } else {
      setVoteCount((prev) => prev > 0 ? prev -- : prev);
    }

    axios
      .patch(`http://localhost:4000/suggestions/${suggestionId}`, { votes: voteCount});
  };

  const updateVotesCast = (eventId, userId) => {
    const userEvent = getUserEvent(eventId, userId);
    axios
      .patch(`http://localhost:4000/userevents/${userEvent.id}`, { votes_cast: isVoted })
  };

  const updateEventVotes = (eventId) => {
    axios
      .get(`http://localhost:4000/events/${eventId}`)
      .then((res) => {
        const sugs = res.data.Suggestions;
        const totalVotes = sugs.reduce((prev, current) => 
          prev + current.votes, 0,
        );
        setTotalEventVotes(totalVotes);

        axios
          .patch(`http://localhost:4000/events/${eventId}`, { total_votes: totalVotes })
      });
  };

  const handleVote = (e) => {
    e.preventDefault();
    const votedSugId = e.target.value;
    
    setIsVoted((prev) => !prev); // change isVoted boolean
    setVoteCount(getVoteCount(votedSugId)); // get prev vote count for sug and set as voteCount
    updateSugVotes(votedSugId, isVoted, voteCount); //update voteCount and sug votes
    updateVotesCast(id, user.id); // update userevent votes_cast
    updateEventVotes(id)// update total_votes in event and totalEventVotes
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
                    className={isVoted ? "suggestion__item-voted" : "suggestion__item"} 
                    // className="suggestion__item"
                    value={item.id}
                  >
                  {item.suggestion} &nbsp;&nbsp; {item.votes} &#47; {totalEventVotes}
                  </button>
                </p>
            })}
          </div> : <p>No suggestions yet</p> }
          {/* {wrap suggestions form in a conditional: only if user hasn't made any suggestion, 
        show the form or activate the submit button}  */}
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
