import React from "react";
import "../styles/alert.css";
import PropTypes from "prop-types";

const Alert = ({ message, success }) => {
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
