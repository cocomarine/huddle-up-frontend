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
  const [votedToggle, setVotedToggle] = useState(false);
  let [voteCount, setVoteCount] = useState(null);
  let [totalEventVotes, setTotalEventVotes] = useState(null);

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
  }, []);

  const updateTotalEventVotes = async (id) => {
    await axios
      .get(`http://localhost:4000/events/${id}`)
      .then((res) => {
        const sugs = res.data.Suggestions;
        const totalEventVotes = sugs.reduce((prev, current) => 
          prev + current.votes, 0,
        );
        console.log(totalEventVotes)
      axios
        .patch(`http://localhost:4000/events/${id}`, { total_votes: totalEventVotes });
      
      setTotalEventVotes(totalEventVotes);
    });
  };

  const handleVote = (e) => {
    setVotedToggle((prev) => !prev);
    const votedSugId = e.target.value;
    
    axios
      .get(`http://localhost:4000/suggestions/${votedSugId}`)
      .then((res) => {
        setVoteCount(res.data.votes); 
        console.log(res.data.votes)
        console.log(voteCount)
        const eventId = res.data.EventId;
        const votedUserId = user.id;

        axios
          .get(`http://localhost:4000/userevents`)
          .then((res) => {
            const filteredUserEvent = res.data.filter((userevent) => (userevent.EventId === eventId && userevent.UserId === votedUserId));
            console.log(filteredUserEvent)

            if (filteredUserEvent) {
              axios
                .patch(`http://localhost:4000/userevents/${filteredUserEvent[0].id}`, { votes_cast: votedToggle });

              console.log(votedToggle)
              if (votedToggle) {
                setVoteCount(voteCount ++);
              } else {
                setVoteCount(voteCount > 0 ? voteCount -- : voteCount);
              }

              axios
                .patch(`http://localhost:4000/suggestions/${votedSugId}`, { votes: voteCount });

              console.log(voteCount)
              updateTotalEventVotes(id);
            }
          });
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
                    className="suggestion__item" 
                    value={item.id}
                    onClick={(e) => {
                      handleVote(e)}}
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
