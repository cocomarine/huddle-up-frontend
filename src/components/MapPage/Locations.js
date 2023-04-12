import React, { useRef, useEffect } from "react";
import "../../styles/locations.css";

const Locations = (places) => {
  const googleMapRef = useRef();
  console.log(places)

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

  const placesIdArray = ["ChIJhb7XVs-xe0gR23VL7GiwVl8", "ChIJp2vjx7Cue0gR9Z5lOWE-cSE"];
  const geocoder = new window.google.maps.Geocoder();
  const infowindow = new window.google.maps.InfoWindow();
  
  useEffect(() => {
    const googleMap = new window.google.maps.Map(googleMapRef.current, {
      center: defaultProps.center,
      zoom: defaultProps.zoom,
      disableDefaultUI: true,
    });

    // new window.google.maps.Marker({ position: defaultProps.center, map: googleMap });
    geocoder
      .geocode({ placeId: placesIdArray[0] })
      .then(({ results }) => {
        if (results[0]) {
          googleMap.setZoom(11);
          googleMap.setCenter(results[0].geometry.location);

          const marker = new window.google.maps.Marker({
            position: results[0].geometry.location,
            map: googleMap,
          });

          infowindow.setContent(results[0].formatted_address);
          infowindow.open(googleMap, marker);
        } else {
          window.alert("No results found");
        }
      })
      .catch((e) => window.alert("Geocoder failed due to: " + e));
  }, []);

  return (
    <div
      ref={googleMapRef}
      className="google-map-locations"
    ></div>
  )
}

export default Locations;

// import React, { useRef, useEffect } from "react";

// const Locations = (props) => {
//   const googleMapRef = useRef();
//   const { center, zoom } = props;
  
//   useEffect(() => {
//     const googleMap = new window.google.maps.Map(googleMapRef.current, {
//       center: center,
//       zoom: zoom
//     });

//     new window.google.maps.Marker({ position: center, map: googleMap });
//   }, [center, zoom]);

//   return (
//     <div
//       ref={googleMapRef}
//       className={`map ${props.className}`}
//       style={props.style}
//     ></div>
//   )
// }

// export default Locations;