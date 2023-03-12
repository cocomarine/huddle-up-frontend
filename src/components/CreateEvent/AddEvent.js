import axios from "axios";

const AddEvent = (fields, setAlert) => {
  console.log("fields", fields);
  axios
    .post("http://localhost:4000/events", fields)
    .then((res) => {
    })
    .catch((err) => {
      console.log("Error in Post Event ===> ", err.response);
    });
};

export default AddEvent;
