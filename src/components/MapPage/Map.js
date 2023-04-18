/* eslint-disable react-hooks/exhaustive-deps */
import React, { useRef, useEffect } from "react";
import "../../styles/map.css";

const DEFAULT_MAP_CENTER = { lat: 53.48083, lng: -2.24332 };
const DEFAULT_MAP_ZOOM = 11;
const DEFAULT_SINGLE_MARKER_ZOOM = 13;

const Map = ({markers}) => {
  const googleMapRef = useRef(null);
  let googleMap = null;

  const MAP_CENTER = markers.length === 1 
    ? { lat: markers[0].lat, lng: markers[0].lng } : DEFAULT_MAP_CENTER;

  useEffect(() => {
    googleMap = initGoogleMap();
    let bounds = new window.google.maps.LatLngBounds();

    markers.map((item) => {
      const marker = addMarker(item);
      return bounds.extend(marker.position);
    });

    if (markers.length < 2) {
      googleMap.setZoom(DEFAULT_SINGLE_MARKER_ZOOM);
    } else {
      googleMap.fitBounds(bounds);
    }
  }, [markers]);

  // map
  const initGoogleMap = () => {
    return new window.google.maps.Map(googleMapRef.current, {
      zoom: DEFAULT_MAP_ZOOM, 
      center: MAP_CENTER,
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