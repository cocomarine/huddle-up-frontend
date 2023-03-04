import React from "react";
import alertTypes from "../styles/alert.css";
import PropTypes from "prop-types";

const Alert = ({ message, success }) => {
  if (message) {
    return (
      <div
        className={`${alertTypes.alert} ${
          success ? alertTypes.success : alertTypes.error
        }`}
      >
        {message}
      </div>
    );
  }
  return;
};
Alert.propTypes = {
  message: PropTypes.string,
  success: PropTypes.bool,
};

Alert.defaultProps = {
  success: false,
};
export default Alert;
