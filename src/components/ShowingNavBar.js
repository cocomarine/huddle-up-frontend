// import React, { useState, useEffect } from "react";
// import { useLocation } from "react-router-dom";

// const ShowingNavBar = ({ childern }) => {
//   const location = useLocation();

//   const [showNavBar, setShowNavBar] = useState(false);

//   useEffect(() => {
//     if (location.pathname === "/") {
//       setShowNavBar(false);
//     } else {
//       setShowNavBar(true);
//     }
//   }, [location]);
//   return <div>{showNavBar && childern}</div>;
// };

// export default ShowingNavBar;