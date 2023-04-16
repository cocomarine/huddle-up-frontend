import React from 'react';
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {  faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import Locations from './Locations';
import { useEventContext } from "../../hooks/useEventContext";

const MapPlaces = () => {
  const { event } = useEventContext();
  console.log(event)

  const navigate = useNavigate();

  const changeLocation = (redirect) => {
    navigate(redirect, { replace: true });
  };

  return (
    <div className="map-places page">
      <h4 className="map-places-title page-title">Suggested Places</h4>
      <button
        className="backto-myEvents-Btn link-button"
        onClick={() => {
          changeLocation("/myevents");
        }}
      >
        <FontAwesomeIcon
          icon={faAngleLeft}
          className="back-icon"
          data-testid="back-icon"
        />
        &nbsp; Back to My Events
      </button>
      <Locations places={event.Suggestions} />
    </div>
  )
}

export default MapPlaces;


