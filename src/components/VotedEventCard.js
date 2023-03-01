import React, {useState} from "react";

const EventCard = ({
  id,
  title,
  description,
  voting_finished,
  AdminId,
}) => {
  
  return (
    <div className="voted-event-container">
      <div className="voted-event__title">{title}</div>
      <div className="voted-event__description">{description}</div>
      
    </div>
  )
};

export default EventCard;