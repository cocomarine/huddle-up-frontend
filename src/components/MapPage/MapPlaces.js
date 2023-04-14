import React from 'react';
import Locations from './Locations';
import { useEventContext } from "../../hooks/useEventContext";

const MapPlaces = () => {
  const { event } = useEventContext();
  console.log(event)

  return (
    <div className="map-container">
      <Locations places={event.Suggestions} />
    </div>
  )
}

export default MapPlaces;


