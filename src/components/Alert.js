import React from "react";
import alertType from "../styles/alert.css";
import PropTypes from "react";

const Alert = ({ message, success }) => {
  if (!message) return null;
  return (
    <div
      className={`${alertType.alert} ${
        success ? alertType.success : alertType.error
      }`}
    >
      {message}
    </div>
  );
};
Alert.propTypes = {
  message: PropTypes.string.isRequired,
  success: PropTypes.bool,
};

Alert.defaultProps = {
  success: false,
};
export default Alert;
