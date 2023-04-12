// import React, { useRef, useEffect } from "react";
// import GoogleMapReact from "google-map-react";
// import Locations from "./Locations";

// // import "../../styles/map-places.css";

// const AnyReactComponent = ({ text }) => <div>{text}</div>;

// const MapPlaces = () => {

// //   const googleMapRef = useRef();
// //   let googleMap;

// //   useEffect(() => {
// //     const googleMapScript = document.createElement("script");
// //     googleMapScript.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.YOUR_GOOGLE_API_KEY}&libraries=places`;
// //     googleMapScript.async = true;
// //     window.document.body.appendChild(googleMapScript);
// //     googleMapScript.addEventListener("load", () => {
// //       getLatLng();
// //     });
// //   }, []);

// //   const createGoogleMap = (coordinates) => {
// //     googleMap = new window.google.maps.Map(googleMapRef.current, {
// //       center: {
// //         // lat: coordinates.lat(),
// //         // lng: coordinates.lng(),
// //         // Manchester city centre
// //         lat: 53.48083,
// //         lng: -2.24332
// //       },
// //       zoom: 11, 
// //       disableDefaultUI: true,
// //     })
// //   };

// //   const getLatLng = () => {
// //     // let lat, lng, placeId;
// //     // new window.google.maps.Geocoder().geocode(
// //     //   { address: `${placeName}` },
// //     //   function (results, status) {
// //     //     if (status === window.google.maps.GeocoderStatus.OK) {
// //     //       placeId = results[0].place_id;
// //     //       createGoogleMap(results[0].geometry.location);
// //     //       lat = results[0].geometry.location.lat();
// //     //       lng = results[0].geometry.location.lng();
// //     //       new window.google.maps.Marker({
// //     //         position: { lat, lng },
// //     //         map: googleMap,
// //     //         animation: window.google.maps.Animation.DROP,
// //     //         title: `${placeName}`,
// //     //       });
// //     //     } else {
// //     //       alert(
// //     //         "Geocode was not successful for the following reason: " + status
// //     //       );
// //     //     }
// //     //   }
// //     // );
// //   }

// //   return (
// //     <div 
// //       className="map-container"
// //       id="google-map"
// //       ref={googleMapRef}
// //     />
// //   )
// // }

//   const defaultProps = {
//     center: {
//       // Manchester city centre
//       lat: 53.48083,
//       lng: -2.24332
//     },
//     zoom: 11
//   }
