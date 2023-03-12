import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/join-events.css";

const JoinEvents = () => {

  const navigate = useNavigate();

  const changeLocation = (redirect) => {
    navigate(redirect, { replace: true });
    window.location.reload();
  };

  // add backbutton to go back to my events page?
  return (
    <div className="join-event">
      <div className="join-event__title">
        <h1>Join an Event</h1>
      </div>
      <h4> Enter Your invitation code to join and vote on an event</h4>
      <div className="join-event__submit">
        <input type="text" placeholder="Enter your code"></input>
        <button onClick={() => changeLocation("/myevents")} type="submit">
          Join
        </button>
      </div>
    </div>
  );
};

export default JoinEvents;
