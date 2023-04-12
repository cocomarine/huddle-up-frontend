import React from 'react';
import Locations from './Locations';
import { useEventContext } from "../../hooks/useEventContext";

const MapPlaces = () => {
  const { event } = useEventContext();

  return (
    <div className="map-container">
      <Locations places={event} />
    </div>
  )
}

export default MapPlaces;
