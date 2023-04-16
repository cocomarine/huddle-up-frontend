/* eslint-disable react-hooks/exhaustive-deps */
import React, { useRef, useEffect } from "react";
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

  const geocoder = new window.google.maps.Geocoder();
  
  // defining function for reverse geocodeing
  const geocoderResult = (placeId) => {
    return new Promise((resolve, reject) => {
      geocoder
        .geocode({ placeId: placeId }, (results, status) => {
          if (status === window.google.maps.GeocoderStatus.OK) {
            return resolve({
              place_id: results[0].place_id,
              lat: results[0].geometry.location.lat(),
              lng: results[0].geometry.location.lng(),
              address: results[0].formatted_address,
            })
          } else {
            reject(new Error("No results found"));
          }
        });
    });
  };

  // using above geocoderResult function, make a list of reverse geocoding results 
  // containing locations and address (but not the name of place, need to be connected later using place_id)
  const geocoderList= Promise.all(placeIdList.map((id) => geocoderResult(id).then(res => res)));

  let markerList = [];

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

    geocoderList.then((res) => {
      // map method with callback function for selcting lat and lng and adding label property to each object
      markerList = res.map(({lat, lng}, index) => ({lat, lng, label: (index + 1).toString()}));
      console.log(markerList);
      markerList.map(item => {
        const marker = addMarker(item);
        return bounds.extend(marker.position);
      });
      // map to contain all the markers
      googleMap.fitBounds(bounds);
    });
  }, []);

  return (
    <div class='locations-wrapper'>
      <div class='row'>
        <div class='column locations-map'>
          <li className="column__item">
            <ul className="card__list">
              <li className="card__item">
              <div 
                ref={googleMapRef}
                className="google-map-locations"
                />
              </li>
            </ul>
          </li>
        </div>
        <div class='column locations-list'>
          <li className="column__item">
            <ul className="card__list">
              <li className="card__item">
                <span>item 1</span>
              </li>
              <li className="card__item">
                <span>item 2</span>
              </li>
            </ul>
          </li>
        </div>
      </div>
    </div>
  );
};

export default Locations;