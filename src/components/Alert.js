import React, { useState, useEffect } from "react";
import "../styles/alert.css";
import PropTypes from "prop-types";

const Alert = ({ message, success }) => {
  // const [show, setShow] = useState(true)

  // // On componentDidMount set the timer
  // useEffect(() => {
  //   const timeId = setTimeout(() => {
  //     // After 3 seconds set the show value to false
  //     setShow(false)
  //   }, 3000)

  //   return () => {
  //     clearTimeout(timeId);
  //   }
  // }, []);

  // // If show is false the component will return null and stop here
  // if (!show) {
  //   return null;
  // }
  // return (
  //   <div
  //     className={ success? "success" : "error"}
  //   >
  //     {message}
  //   </div>
  // );


  if (message) {
    return (
      <div
        className={ success? "success" : "error"}
      >
        {message}
      </div>
    );
  }
};
Alert.propTypes = {
  message: PropTypes.string,
  success: PropTypes.bool,
};

Alert.defaultProps = {
  success: false,
};
export default Alert;
