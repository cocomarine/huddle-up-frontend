import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { useAuthContext } from "../hooks/useAuthContext";
import { decryptEventCode } from "../utils/utils";
import Alert from "./Alert";

import "../styles/common/titles.css";
import "../styles/common/page.css";
import "../styles/join-events.css";

const JoinEvents = () => {

  const [inputCode, setInputCode] = useState("");
  const [joinedEvent, setJoinedEvent] = useState("");
  const [alert, setAlert] = useState({
    message: "",
    isSuccess: false,
  }); 

  const { user } = useAuthContext();

  const navigate = useNavigate();

  const changeLocation = (redirect) => {
    navigate(redirect, { replace: true });
    // window.location.reload();
  };

  const handleJoin = async (e) => {
    e.preventDefault();
    
    const decryptedData = decryptEventCode(inputCode);
    let eventId = decryptedData.match(/\d/g);
    eventId = Number(eventId.join(""));
    
    axios
    .get(`http://localhost:4000/events/${eventId}`)
    .then((res) => {
      
      if (res.data.id === eventId && user.id) {
          setJoinedEvent(eventId);

          axios
            .post("http://localhost:4000/userevents", {
              voted__suggestionId: null,
              UserId: user.id,
              EventId: eventId,
            })
            .then((res) => {
              setAlert({
                message: "Successfully joined an event.",
                isSuccess: true,
              });
            })
            .catch((err) => {
              setAlert({
                message: "Server error. Please try again later.",
                isSuccess: false,
              });
            });
        } else {
          setAlert({
            message: "No match. Please enter a valid code.",
            isSuccess: false,
          });
        }
      });
    
  };

  return (
    <div className="join-event page">
      <h3 className="join-event__title page-title">
        Join Event
      </h3>
      <Alert message={alert.message} success={alert.isSuccess} />
      <p className="heading1"> Enter your invite code to join and start planning!</p>
      <div className="join-event__submit">
        <input 
          type="text" 
          placeholder="Enter your code"
          onChange={(e) => setInputCode(e.target.value)}
          value={inputCode}
          required
        >
        </input>
        <button 
          className="link-button" 
          onClick={handleJoin} 
          type="submit"
        >
          Join
        </button>
        <div>
          <button
          className="backto-myEvents-Btn link-button"
          onClick={() => {
            changeLocation("/myevents");
          }}
        >
        Go to My Events
        </button>
        </div>
      </div>
    </div>
  );
};

export default JoinEvents;
