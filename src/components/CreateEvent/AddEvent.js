// import React, { useState } from "react";
import axios from "axios";

const AddEvent = (fields, setAlert) => {
  console.log("fields", fields);

  // const [eventId, setEventId] = useState();
  axios
    .post("http://localhost:4000/events", fields)
    .then((res) => {
      const eventId = res.data.id;
      console.log(res.data)
      axios
        .post("http://localhost:4000/userevents", {
          voted__suggestionId: null,
          UserId: fields.AdminId,
          EventId: eventId,
        })
        .then((res) => {
          setAlert({
            message: "Event successfully create.",
            success: true,
          });
      });
    })
    .catch((err) => {
      setAlert({
        message: "Server error. Please try again later.",
        success: false,
      });
    });
};

export default AddEvent;
