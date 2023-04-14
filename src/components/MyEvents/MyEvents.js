import React, { useState, useEffect, Suspense } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import AnchorLink from "react-anchor-link-smooth-scroll-v2";
import ScrollToTop from "react-scroll-to-top";
import { IoIosArrowUp } from "react-icons/io";

import { useAuthContext } from "../../hooks/useAuthContext";

import "../../styles/common/titles.css";
import "../../styles/common/page.css";
import "../../styles/common/buttons.css";
import "../../styles/my-events.css";

const EventCard = React.lazy(() => import("./EventCard"));
const VotedEventCard = React.lazy(() => import("./VotedEventCard"));

const MyEvents = () => {
  const initialState = {
    votedEvents: [],
    pendingEvents: [],
  };

  const [usersEvents, setUsersEvents] = useState([]);
  const [votedEvents, setVotedEvents] = useState(initialState.votedEvents);
  const [pendingEvents, setPendingEvents] = useState(initialState.pendingEvents);

  const { user } = useAuthContext();

  const navigate = useNavigate();

  const changeLocation = (redirect) => {
    navigate(redirect, { replace: true });
  };

  const isVotedEvent = (event) => {
    const maxUsers = event.participants.split(", ").length;
    const suggestionsList = event.Suggestions;
    const totalVotes = suggestionsList.reduce(
      (prev, current) => prev + current.votes, 0
    );
    return maxUsers === totalVotes;
  };

  useEffect(() => {
    let active = true;
    
    if (user) {
      axios
        .get(`http://localhost:4000/users/${user.id}`)
        .then((res) => {
          if (active) {
            setUsersEvents(res.data.Events);
            console.log(user)
            console.log(res.data.Events)
          }
        });
    };
    return () => {active = false};
  }, [user]);

  useEffect(() => {
    if (usersEvents.length > 0) {
      usersEvents.forEach((event) => {
        axios
          .get(`http://localhost:4000/events/${event.id}`)
          .then((res) => {
            if (isVotedEvent(res.data)) setVotedEvents((prev) => [...prev, res.data]);
            if (!isVotedEvent(res.data)) setPendingEvents((prev) => [...prev, res.data]);
          })
      });
    }
  }, [usersEvents]);

  return (
    <div className="events page">
      <h3 className="events-title page-title"> My Events</h3>
      <div className="navigate-events">
        {!usersEvents.length ? 
          <div className="no-events-msg subtitle">No events yet.</div>
          :  <>
          <AnchorLink href='#event-cards-voted'>
            <button 
              className="votedEvents-button link-button"
              disabled={!votedEvents.length}
            >
              Voting Finished
            </button>
          </AnchorLink>
          <AnchorLink href='#event-cards-pending'>
            <button 
              className="pendingEvents-button link-button"
              disabled={!pendingEvents.length}
            >
              Voting In Progress
            </button>
          </AnchorLink>
          </>
        }
        <div className="join-create-buttons">
          <button
            className="join-event-button link-button"
            onClick={() => {
              changeLocation("/joinevents");
            }}
          >
            Join Event
          </button>
          <button
            className="create-event-button link-button"
            onClick={() => {
              changeLocation("/createevent");
            }}
          >
            Create Event
          </button>
        </div>
      </div>
      <div className="event-cards">
        <div className="event-cards-voted" id="event-cards-voted">
          {votedEvents.length ?
            <>            
            <div className="voted-title subtitle">Voting Finished</div>
            <Suspense fallback={<div>Loading...</div>}>
              {votedEvents.map((votedEvent) => (
                <div className="voted-cards__item" key={`votedEvent_${votedEvent.id}`}>
                  <VotedEventCard {...votedEvent} />
                </div>
              ))}
            </Suspense>
            </> 
            :
            <></>
          }
        </div>
        <div className="event-cards-pending" id="event-cards-pending">
          {pendingEvents.length ?
              <>            
              <div className="pending-title subtitle">Voting In Progress</div>
              <div className="pending-cards__inst">Toggle to vote / unvote suggestions.</div>
              <Suspense fallback={<div>Loading...</div>}>
                {pendingEvents.map((pendingEvent) => (
                  <div className="pending-cards__item" key={`pendingEvent_${pendingEvent.id}`}>
                    <EventCard {...pendingEvent} />
                  </div>
                ))}
              </Suspense>
              </> 
              :
              <></>
            }
          </div>
      </div>
      <ScrollToTop smooth component={<IoIosArrowUp />} />
    </div>
  );
};

export default MyEvents;
