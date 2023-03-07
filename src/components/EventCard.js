import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuthContext } from "../hooks/useAuthContext";
import { IoIosCloseCircleOutline } from "react-icons/io";

import "../styles/event-card.css";

const EventCard = ({
  id,
  title,
  description,
  voting_finished,
  AdminId,
}) => {
  const [suggestions, setSuggestions] = useState([]);
  const [adminFirstName, setAdminFirstName] = useState("");
  const [votedToggle, setVotedToggle] = useState(false);

  const { state } = useAuthContext();

  useEffect(() => {
    axios
      .get(`http://localhost:4000/events/${id}`)
      .then((res) => {
        setSuggestions(res.data.Suggestions);

        const adminID = res.data.AdminId;
        const eventUsers = res.data.Users;
        const adminData = eventUsers.filter(
          (eventUser) => eventUser.id === adminID
        );

        setAdminFirstName(adminData[0].first_name);
      })
  }, []);

  

  const handleVote = (e) => {
    setVotedToggle((prev) => !prev);
    const votedSugId = e.target.value;
    
    axios
      .get(`http://localhost:4000/suggestions/${votedSugId}`)
      .then((res) => {
        const eventId = res.data.EventId;
        // const votedUserId = state.user[0].id;
        const votedUserId = 3;

        axios
          .get(`http://localhost:4000/userevents`)
          .then((res) => {
            console.log(res.data)
            const filteredUserEvent = res.data.filter((userevent) => (userevent.EventId === eventId && userevent.UserId === votedUserId));
            console.log(filteredUserEvent)

            if (filteredUserEvent) {
              axios
                .patch(`http://localhost:4000/userevents/${filteredUserEvent[0].id}`, { votes_cast: votedToggle })
            }

          })

      })

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
        {/* <div className="event-card__suggestions">
          {suggestions.map((item) => {
            return <p>
                <button 
                  className="suggestion__item" 
                  key={item.id}
                  onClick={() => {}}
                >
                {item.suggestion}
                </button>
              </p>
          })}
        </div> */}
        <div className="event-card__suggestions__container">
          {suggestions[0] ? <div className="event-card__suggestions">
            {suggestions.map((item) => {
              return <p>
                  <button 
                    className="suggestion__item" 
                    key={item.id}
                    value={item.id}
                    onClick={(e) => {
                      console.log(e);
                      handleVote(e)}}
                  >
                  {item.suggestion}
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
