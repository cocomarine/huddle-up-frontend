import React, { useState, useEffect } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { useAuthContext } from "../../hooks/useAuthContext";
import Alert from "../Alert";
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
  const [adminFirstName, setAdminFirstName] = useState(""); // admin for the event
  const [suggestions, setSuggestions] = useState([]); //all the sugs of the event
  const [totalEventVotes, setTotalEventVotes] = useState(); //total votes for the event
  const [votedSugId, setVotedSugId] = useState(); //VotedSugId in userevent table
  // const [filteredEvent, setFilteredEvent] = useState({})
  const [userSuggestion, setUserSuggestion] = useState({}); //sug that the user put forward for this event
  const [voteCount, setVoteCount] = useState(); //number of votes for a suggestion
  // const [sugVotes, setSugVotes] = useState({}); // storing votes for each suggestion of the event
  const [sugSelected, setSugSelected] = useState(false); // boolean for selected or not for this user and for this suggestion
  const [newSuggestion, setNewSuggestion] = useState("");
  const [alert, setAlert] = useState({
    message: "",
    isSuccess: false,
  }); 

  const { user } = useAuthContext();

  const getAdminName = (event) => {
    const adminID = event.AdminId;
    const eventUsers = event.Users;
    const adminData = eventUsers.find(
      (eventUser) => eventUser.id === adminID
    );

    return adminData.first_name;
  };

  // 1. get admin name and do setAdminFirstName
  // 2. get suggestions list and do setSuggestions
  // 2_1. add up votes for each suggestion and update.
  // (unless it was done upon handlevote)
  // 3. add up votes of suggestions and do setTotalEventVotes
  // 4. update total_votes of event table
  // 5. get userevent and filter them down to a userevent that matches eventid and userid
  // 6. do setVotedSugId
  // 7. get votes from a suggestion and do setVoteCount <-- how??
  // 8. if user selected a sug, setSugSelected
  // 9. find if user already has put forward suggestion for this event and do setUserSuggestion
  useEffect(() => {
    axios
      .get(`http://localhost:4000/events/${id}`)
      .then((res) => {
        // 1. setAdminFirstName
        setAdminFirstName(getAdminName(res.data));
        
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

        // 2. get suggestions list and do setSuggestions
        setSuggestions(sugs);

        // 3. add up votes of suggestions and do setTotalEventVotes
        const totalVotes = sugs.reduce((prev, current) => 
          prev + current.votes, 0,
        );
        setTotalEventVotes(totalVotes);

        // 4. update total_votes of event
        axios
          .patch(`http://localhost:4000/events/${id}`, { total_votes: totalVotes })

        // 5. get userevent and filter them down to a userevent that matches eventid and userid
        axios
          .get(`http://localhost:4000/userevents`)
          .then((res) => {
            const filteredUserEvent = res.data.find((userevent) => (userevent.EventId === id && userevent.UserId === user.id));

            // 6. do setVotedSugId
            setVotedSugId(filteredUserEvent.voted_suggestionId);
            
            // 8. if user selected a sug, setSugSelected
            if (filteredUserEvent.voted_suggestionId) {
              axios
                .get(`http://localhost:4000/suggestions/${filteredUserEvent.voted_suggestionId}`)
                .then((res) => {
                  // setVoteCount(res.data.votes);
                  // console.log("voteCount:", res.data.votes)
                  setSugSelected(true);
                });
              } else {
                setSugSelected(false);
              }
          });

        // 9. find if user already has put forward suggestion for this event and do setUserSuggestion
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
    // need to refractor this
    if (selected) {
      sugVotes ++;
    } else {
      if (voteCount > 0) {
        sugVotes --;
      } else {
        sugVotes = 0;
      }
    }

    console.log("updateSugVotes sugVotes after update:", sugVotes)
    
    axios
      .patch(`http://localhost:4000/suggestions/${sugId}`, { votes: sugVotes});

    // setVoteCount(sugVotes);
  };

  const updateVotedSug = (eventId, userId, suggestionId) => {
    axios
      .get(`http://localhost:4000/userevents`)
      .then((res) => {
        const filteredUserEvent = res.data.filter((userevent) => (userevent.EventId === eventId && userevent.UserId === userId));
        console.log("updateVotedSug params:", filteredUserEvent[0].id, suggestionId)
      
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

  // const getVoteCount = (sugId) => {
  //   axios
  //     .get(`http://localhost:4000/suggestions/${sugId}`)
  //     .then((res) => {
  //       console.log(res.data.votes)
  //       return res.data.votes;
  //     })
  // }

  // 1. save value to a variable (suggestion id)
  // 2. do setSugSelected to change sugSelected boolean
  // 3. do setVotedSugId: if previously null, put sug id. if not null, put null 
  // 4. update votecount and update votes of suggestion table
  // 5. update voted_suggestionId of userevent table
  // 6. update totalEventVotes and total_votes in event table

  const handleVote = (e) => {
    e.preventDefault();
    console.log("sugSelected:", sugSelected)
    let voteToggle = !sugSelected;
    console.log("voteToggle:", voteToggle)
    setSugSelected(voteToggle)
    const clickedSugId = e.target.value;

    axios
      .get(`http://localhost:4000/suggestions/${clickedSugId}`)
      .then((res) => {
        console.log(res.data.votes)
        const sugVotes = res.data.votes;
        console.log("sugVotes:", sugVotes)
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
        <div className="event-card__admin">Creater: {adminFirstName}</div>
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
                      >
                        {item.suggestion} &nbsp;&nbsp; {item.votes} &#47; {totalEventVotes}
                  </button>
            })}
          </div> : <div className="no-sug-msg">No suggestions yet</div> }
          {/* {only if user hasn't made any suggestion, 
        show suggestion input form}  */}
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
                className="suggestion__button" 
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
  category: PropTypes.string.isRequired,
};

export default EventCard;
