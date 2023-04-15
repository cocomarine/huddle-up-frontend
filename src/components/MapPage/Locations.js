import React, { useRef, useEffect, useState } from "react";
import "../../styles/locations.css";

const Locations = (places) => {
  const googleMapRef = useRef(null);
  let googleMap = null;

  // ordering suggested places so that they keep their indices consistently throughout
  // containing places details such as suggestion and place_id
  const orderedSugList = Object.values(places)[0].sort((a, b) => {
    if (a.suggestion < b.suggestion) {
      return -1;
    }
    if (a.suggestion > b.suggestion) {
      return 1;
    }
    return 0;
  });

  // From orderedSugList, make a list of place_id
  const placeIdList = orderedSugList.map((suggestion) => suggestion.place_id);

  // defining function for reverse geocodeing
  const geocoder = new window.google.maps.Geocoder();
  const geocoderResult = (placeId) => {
    return new Promise((resolve, reject) => {
      geocoder
        .geocode({ placeId: placeId }, (results, status) => {
          if (status === window.google.maps.GeocoderStatus.OK) {
            resolve(results[0]);
            // let lat = results[0].geometry.location.lat();
            // let lng = results[0].geometry.location.lng();
            // let address = results[0].formatted_address;
          } else {
            reject(new Error("No results found"));
          }
        });
    });
  };

  // using above geocoderResult function, make a list of reverse geocoding results 
  // containing locations and address (but not the name of place, need to be connected later using place_id)
  // but first, making a function to unwrap returned promisses
  const allGeocoderResults = (idList) => Promise.all(idList.map((id) => geocoderResult(id))).then((results) => results);

  const geocoderList = allGeocoderResults(placeIdList);
  // const geocoderList = placeIdList.map((place_id) => geocoderResult(place_id));
  console.log(geocoderList)
  console.log(geocoderList[0])
  console.log(JSON.stringify(geocoderList[0]))

  const markerList = [
    { lat: geocoderList[0].geometry.location.lat(), lng: geocoderList[0].geometry.location.lng(), label: "1"},
    { lat: geocoderList[1].geometry.location.lat(), lng: geocoderList[1].geometry.location.lng(), label: "2"}
  ]
  // const labelList = {
  //   label1: "1",
  //   label2: "2",
  // }

  // const markerList = [
  //   { lat: 53.52083, lng: -2.30332, label: labelList.label1 },
  //   { lat: 53.48083, lng: -2.14332, label: labelList.label2 }
  // ]

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
  }, []);


  return <div 
    ref={googleMapRef}
    className="google-map-locations"
  />
}

export default Locations;