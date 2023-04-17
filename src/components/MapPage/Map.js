/* eslint-disable react-hooks/exhaustive-deps */
import React, { useRef, useEffect } from "react";
import "../../styles/map.css";

const Map = ({markers}) => {
  const googleMapRef = useRef(null);
  let googleMap = null;
  console.log(markers)

  useEffect(() => {
    googleMap = initGoogleMap();
    
    let bounds = new window.google.maps.LatLngBounds();

    markers.map((item) => {
      const marker = addMarker(item);
      return bounds.extend(marker.position);
    });

    googleMap.fitBounds(bounds);
  }, [markers]);

  // initialising map
  const initGoogleMap = () => {
    return new window.google.maps.Map(googleMapRef.current, {
      zoom: 11, 
      center: {
        // Manchester city centre
        lat: 53.48083,
        lng: -2.24332
      },
      disableDefaultUI: true,
    });
  }

  // adding marker on google map
  const addMarker = (markerObj) => new window.google.maps.Marker({
    position: { lat: markerObj.lat, lng: markerObj.lng },
    label: markerObj.label,
    map: googleMap,
  });

  return (
    <ul className="card__list">
      <li className="card__item">
      <div 
        ref={googleMapRef}
        className="google-map-locations"
        />
      </li>
    </ul>
  );
};

export default Map;