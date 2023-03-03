import React, { useState, useEffect } from "react";
import AnchorLink from "react-anchor-link-smooth-scroll-v2";
import axios from "axios";
import EventCard from "./EventCard";
import VotedEventCard from "./VotedEventCard";
import "../styles/my-events.css";

const MyEvents = () => {
  const initialState = {
    votedEvents: [],
    pendingEvents: [],
  };

  const [votedEvents, setVotedEvents] = useState(initialState.votedEvents);
  const [pendingEvents, setPendingEvents] = useState(initialState.pendingEvents);
  const [alert, setAlert] = useState({ message: "" });
  // const [cardRemoved, setCardRemoved] = useState(false);

  const getVotedEvents = (event) => {
    const totalUsers = event.Users.length;
    const suggestionsList = event.Suggestions;
    const totalVotes = suggestionsList.reduce(
      (prev, current) => prev + current.votes, 0
    );
    return totalUsers - totalVotes;
  };

  useEffect(() => {
    axios
      .get("http://localhost:4000/events")
      .then((res) => {
        setVotedEvents(res.data.filter((event) => getVotedEvents(event) === 0));
        setPendingEvents(res.data.filter((event) => getVotedEvents(event) > 0));
      })
      .catch(() => {
        setAlert({
          message: "Server error. Please try again later.",
        });
      });
  }, []);

  return (
    <div className="events">
      <h3> My Events</h3>
      <div className="navigate-events">
        <AnchorLink href='#event-cards-voted'>
          <button>Voting finished</button>
        </AnchorLink>
        <AnchorLink href='#event-cards-pending'>
          <button>Voting in progress</button>
        </AnchorLink>
        <div className="join-create-buttons">
          <button>Join an event</button>
          <button>Create an event</button>
        </div>
      </div>
      <div className="event-cards">
        <div className="event-cards-voted" id="event-cards-voted">
          <h4>Voting Finished</h4>
          {votedEvents && votedEvents.map((votedEvent) => (
            <div className="voted-cards__item" key={votedEvent.id}>
              <VotedEventCard {...votedEvent} />
            </div>
          ))}
        </div>
        <div className="event-cards-pending" id="event-cards-pending">
          <h4>Voting In Progress</h4>
          {pendingEvents && pendingEvents.map((pendingEvent) => (
            <div className="event-cards__item" key={pendingEvent.id}>
              <EventCard {...pendingEvent} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyEvents;
