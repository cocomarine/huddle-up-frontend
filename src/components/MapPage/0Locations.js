import React, { useRef, useEffect, useState } from "react";
import "../../styles/locations.css";

const Locations = (places) => {
  const googleMapRef = useRef(null);
  console.log(places) // object

  const [geoResults, setGeoResults] = useState([]);

  // to do:
  // map through place_id 
  // and do reverse geocoding
  // and get coordinates to plot marker
  const defaultProps = {
    zoom: 11, 
    center: {
      // Manchester city centre
      lat: 53.48083,
      lng: -2.24332
    },
  }

  // ordering suggestions so that they keep their indices consistently throughout
  const orderedSugsArray = Object.values(places)[0].sort((a, b) => {
    if (a.suggestion < b.suggestion) {
      return -1;
    }
    if (a.suggestion > b.suggestion) {
      return 1;
    }
    return 0;
  });

  console.log(orderedSugsArray);

  // const placesIdArray = Object.values(places)[0].map((suggestion) => suggestion.place_id);
  const placesIdArray = orderedSugsArray.map((suggestion) => suggestion.place_id);
  const geocoder = new window.google.maps.Geocoder();
  const infowindow = new window.google.maps.InfoWindow();
  
  useEffect(() => {
    let active = true;

    // if places object is not empty
    if (Object.keys(places).length !== 0) {
      const googleMap = new window.google.maps.Map(googleMapRef.current, {
        center: defaultProps.center,
        zoom: defaultProps.zoom,
        disableDefaultUI: true,
      });
  
      const geocoderResult = (placeId, index) => {
        geocoder
          .geocode({ placeId: placeId })
          .then(({ results }) => {
            if (results[0]) {
              console.log(results[0])
              setGeoResults(geoResults => [...geoResults, results[0]]);
              setGeoResults([...new Set(geoResults)]);
  
              googleMap.setZoom(11);
              googleMap.setCenter(results[0].geometry.location);
    
              const marker = new window.google.maps.Marker({
                position: results[0].geometry.location,
                label: index,
                map: googleMap,
              });
    
              // infowindow.setContent(results[0].formatted_address);
              infowindow.open(googleMap, marker);
              console.log(index)
            } else {
              window.alert("No results found");
            }
          })
          // .catch((e) => window.alert("Geocoder failed due to: " + e));
      }
      
      placesIdArray.map((place_id, index) => geocoderResult(place_id, index));
      console.log(geoResults);
    }

    return () => {active = false};
  }, []);

  // when an item of location list clicked, infowindow with matching address appears 
  const handleClickPlace = (e, index) => {
    e.preventDefault();
    console.log(geoResults)
    // infowindow.setContent(geoResults[index].formatted_address);
  };

  return (
    <>
      <div
        ref={googleMapRef}
        className="google-map-locations"
      />
      <div className="locations-list-container">
        {Object.values(places)[0] ? <div className="locations-list">
              {orderedSugsArray.map((item, index) => {
                return <button
                        key={`${item.suggestion}-${item.id}`}
                        className="locations-list__item" 
                        value={item.id}
                        onClick={(e, index) => handleClickPlace(e, index)}
                        >
                          {index + 1} &nbsp;&nbsp; {item.suggestion}
                    </button>
              })}
            </div> : <div className="no-places-msg">No places to map.</div> }
      </div>
    </>

  )
}

export default Locations;