/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {  faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import Map from "./Map";
import Locations from './Locations';
import getGeocodes from '../../requests/getGeocodes';
import { useEventContext } from "../../hooks/useEventContext";

import "../../styles/map-places.css";

const MapPlaces = () => {
  const [markerList, setMarkerList] = useState([]);
  const [locationList, setLocationList] = useState([]);

  const { type, event } = useEventContext();
  console.log(type, event)

  const navigate = useNavigate();

  const changeLocation = (redirect) => {
    navigate(redirect, { replace: true });
  };

  useEffect(() => {
    let locationInput;
    if (type === "EVENT_SUGS_ON_MAP") {
      locationInput = Object.values(event.Suggestions).sort((a, b) => a.suggestion.localeCompare(b.suggestion));
    } else if (type === "EVENT_MOST_VOTED_SUG") {
      locationInput = Array(Object.values(event.Suggestions).reduce((prev, current) => {
        return prev.votes > current.votes ? prev : current;
      }));
    }

    console.log(locationInput)

    getGeocodes(
      locationInput,
      setMarkerList,
      setLocationList
    )
  }, []);

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
      <div className='map-places-wrapper'>
        <div className='row'>
          <div className='column locations-map'>
            <li className="column__item">
              <Map markers={markerList} />
            </li>
          </div>
          <div className='column locations-list'>
            <li className="column__item">
              <Locations locations={locationList}/>
            </li>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MapPlaces;


