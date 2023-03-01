import React from "react";
import { useNavigate } from "react-router-dom";
import EventCard from "./EventCard";
import VotedEventCard from "./VotedEventCard";
import "../styles/myevents.css";

const MyEvents = () => {
  const navigate = useNavigate();
  return (
    <div>
      <h4> My Current Events</h4>
      <div>
        <button onClick={navigate("/myevents")} type="submit">
          Join an event
        </button>
        <div>
          <button onClick={navigate("/myevents")} type="submit">
            Voting finished: 1
          </button>
        </div>
        <div>
          <button onClick={navigate("/myevents")} type="submit">
            Voting in progress : 1
          </button>
        </div>
        <div>
          <button onClick={navigate("/myevents")} type="submit">
            Suggestions in progress: 1
          </button>
        </div>
        <div>
          <button onClick={navigate("/myevents")} type="submit">
            Create a new event
          </button>
        </div>
      </div>
      <div className="events-cards">
        <div className="events-cards-voted">
          <VotedEventCard />
        </div>
        <div className="events-cards-voting">
          <EventCard />
        </div>
      </div>
    </div>
  );
};

export default MyEvents;
