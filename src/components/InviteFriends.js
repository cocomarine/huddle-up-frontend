import React from "react";
import { useNavigate } from "react-router-dom";

import { useAuthContext } from "../hooks/useAuthContext";
import { useEventContext } from "../hooks/useEventContext";
import { encryptEventCode } from "../utils/utils";

import "../styles/common/titles.css";
import "../styles/common/page.css";
import "../styles/common/buttons.css";
import "../styles/invite-friends.css";

const InviteFriends = () => {

  const { user } = useAuthContext();
  const { event } = useEventContext();

  const navigate = useNavigate();

  const changeLocation = (redirect) => {
    navigate(redirect, { replace: true });
    // window.location.reload();
  };

  const eventCode = encryptEventCode(
    `${event.id}${event.title}`
  );

  return (
    <div className="invite-friends page">
      <h3 className="invite-friends page-title"> Invite Friends </h3>
      <div className="share-link">
        <button
          className="copy-button"
          type="button"
          onClick={() => {
            navigator.clipboard.writeText(eventCode);
          }}
        >
          Click here to copy invite code:
          <div className="greeting">
            Hi! Your friend <b>{user.first_name}</b> invited you to join 
            <b> {event.title}</b> on huddleUp. 
            Login and use code <b>{eventCode} </b>to join the event.
          </div>
        </button>
      </div>
      <button
            className="goto-myEventsBtn link-button"
            onClick={() => {
              changeLocation("/myevents");
            }}
          >
          Go to My Events
        </button>
    </div>
  );
};

export default InviteFriends;