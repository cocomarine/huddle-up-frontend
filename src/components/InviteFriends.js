import React from "react";
import CreateEvent from "./CreateEvent/CreateEvent";

const InviteFriends = () => {
  return (
    <div>
      <h1> Event Created! </h1>
      

      <h3> Invite friends! </h3>
      <p>
       ` Hi! Your friend invited you to join  ....... event on Huddle Up!
        Sign Up here: http://localhost:4000/auth/signup
        Once logged in, use this code ....... to join us`;
      </p>
    </div>
  );
};

export default InviteFriends;
