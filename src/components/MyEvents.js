import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../styles/myevents.css";

const MyEvents = () => {
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <div>
      <div>
        <h1>Welcome Back ${location.state.id}</h1>
      </div>

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
    </div>
  );
};

export default MyEvents;
