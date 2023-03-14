import React from "react";
import { useNavigate } from "react-router-dom";

import "../styles/common/titles.css";
import "../styles/common/page.css";
import "../styles/join-events.css";

const JoinEvents = () => {

  const navigate = useNavigate();

  const changeLocation = (redirect) => {
    navigate(redirect, { replace: true });
    window.location.reload();
  };

  // add backbutton to go back to my events page?
  return (
    <div className="join-event page">
      <h3 className="join-event__title page-title">
        Join Event
      </h3>
      <p className="heading1"> Enter Your invitation code to join and vote on an event</p>
      <div className="join-event__submit">
        <input type="text" placeholder="Enter your code"></input>
        <button className="link-button" onClick={() => changeLocation("/myevents")} type="submit">
          Join
        </button>
      </div>
    </div>
  );
};

export default JoinEvents;
