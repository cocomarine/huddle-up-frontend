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

  const { event } = useEventContext();
  console.log(event)

  const navigate = useNavigate();

  const changeLocation = (redirect) => {
    navigate(redirect, { replace: true });
  };

  // ordering suggested places so that they keep their indices consistently throughout
  // containing places details such as suggestion and place_id
  const orderedSugList = Object.values(event.Suggestions).sort((a, b) => {
    if (a.suggestion < b.suggestion) {
      return -1;
    }
    if (a.suggestion > b.suggestion) {
      return 1;
    }
    return 0;
  });
  console.log(orderedSugList)

  // From orderedSugList, make a list of place_id
  // const placeIdList = orderedSugList.map((suggestion) => suggestion.place_id);
  // list containing place name and id
  // const placeList = orderedSugList.map(({place_id, suggestion}) => ({place_id, suggestion}));

  // const geocoder = new window.google.maps.Geocoder();
  
  // defining function for reverse geocodeing
  // const geocoderResult = (placeId) => {
  //   return new Promise((resolve, reject) => {
  //     geocoder
  //     .geocode({ placeId: placeId }, (results, status) => {
  //         if (status === window.google.maps.GeocoderStatus.OK) {
  //           return resolve({
  //             place_id: results[0].place_id,
  //             lat: results[0].geometry.location.lat(),
  //             lng: results[0].geometry.location.lng(),
  //             address: results[0].formatted_address,
  //           })
  //         } else {
  //           reject(new Error("No results found"));
  //         }
  //       });
  //   });
  // };

  // using above geocoderResult function, make a list of reverse geocoding results 
  // containing locations and address
  // const geocoderList= Promise.all(placeList.map(({place_id}) => geocoderResult(place_id).then(res => res)));

  useEffect(() => {
    getGeocodes(
      orderedSugList,
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


