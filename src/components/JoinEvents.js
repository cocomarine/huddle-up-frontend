import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/joinevents.css";

const JoinEvents = () => {
  const navigate = useNavigate();
  

  return (
    <div className="join-event">
      <div className="join-event__title">
        <h1>Join an Event</h1>
      </div>
      <h4> Enter Your invitation code to join and vote on an event</h4>
      <div className="join-event__submit">
        <input type="text" placeholder="Enter your code"></input>
        <button onClick={navigate("/myevents")} type="submit">
          Join
        </button>
      </div>
    </div>
  );
};

export default JoinEvents;
