import React, { useRef, useEffect, useState } from "react";
import "../../styles/locations.css";

const Locations = (places) => {
  const googleMapRef = useRef(null);
  let googleMap = null;

  // ordering suggested places so that they keep their indices consistently throughout
  const orderedSugList = Object.values(places)[0].sort((a, b) => {
    if (a.suggestion < b.suggestion) {
      return -1;
    }
    if (a.suggestion > b.suggestion) {
      return 1;
    }
    return 0;
  });

  const placeIdList = orderedSugList.map((suggestion) => suggestion.place_id);

  const geocoder = new window.google.maps.Geocoder();
  const geocoderResult = (placeId) => {
    geocoder
      .geocode({ placeId: placeId }, (results, status) => {
        // if (status === window.google.maps.GeocoderStatus.OK) {
          if (results[0]) {
          return results[0];
        } else {
          window.alert("No results found");
        }
      })
      // .then(({ results }) => {
      //   if (results[0]) {
      //     return results[0];
      //   } else {
      //     window.alert("No results found");
      //   }
      // })
      // .catch((e) => window.alert("Geocoder failed due to: " + e));
  }
 
  console.log(placeIdList[0], placeIdList[1])
  // const markerList = placeIdList.map((place_id) => geocoderResult(place_id));

  // list of labels
  const labelList = {
    label1: "1",
    label2: "2",
  }
  // list of marker object
  const markerList = [
    { lat: 53.52083, lng: -2.30332, label: labelList.label1 },
    { lat: 53.48083, lng: -2.14332, label: labelList.label2 }
  ]

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


  useEffect(() => {
    googleMap = initGoogleMap();
    let bounds = new window.google.maps.LatLngBounds();
    markerList.map(item => {
      const marker = addMarker(item);
      return bounds.extend(marker.position);
    });
    // map to contain all the markers
    googleMap.fitBounds(bounds);

    console.log(geocoderResult(placeIdList[0]))
    console.log(geocoderResult(placeIdList[1]))
  }, []);


  return <div 
    ref={googleMapRef}
    className="google-map-locations"
  />
}

export default Locations;