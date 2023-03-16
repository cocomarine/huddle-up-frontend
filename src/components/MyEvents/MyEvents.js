import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import AnchorLink from "react-anchor-link-smooth-scroll-v2";
import ScrollToTop from "react-scroll-to-top";
import { IoIosArrowUp } from "react-icons/io";

import EventCard from "./EventCard";
import VotedEventCard from "./VotedEventCard";
import { useAuthContext } from "../../hooks/useAuthContext";

import "../../styles/common/titles.css";
import "../../styles/common/page.css";
import "../../styles/common/buttons.css";
import "../../styles/my-events.css";

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
    // window.location.reload();
  };

  const isVotedEvent = (event) => {
    const totalUsers = event.Users.length;
    const suggestionsList = event.Suggestions;
    const totalVotes = suggestionsList.reduce(
      (prev, current) => prev + current.votes, 0
    );
    return totalUsers === totalVotes;
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
            console.log(usersEvents)
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
            <button className="link-button">Voting Finished</button>
          </AnchorLink>
          <AnchorLink href='#event-cards-pending'>
            <button className="link-button">Voting In Progress</button>
          </AnchorLink>
          </>
        }
        {/* {!usersEvents && 
          <>
          <AnchorLink href='#event-cards-voted'>
            <button className="link-button">Voting Finished</button>
          </AnchorLink>
          <AnchorLink href='#event-cards-pending'>
            <button className="link-button">Voting In Progress</button>
          </AnchorLink>
          </>
        } */}
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
            {votedEvents.map((votedEvent) => (
              <div className="voted-cards__item" key={`votedEvent_${votedEvent.id}`}>
                <VotedEventCard {...votedEvent} />
              </div>
            ))}
            </> 
            :
            <></>
          }
          {/* {votedEvents.length && <div className="voted-title subtitle">Voting Finished</div>}
          {votedEvents && votedEvents.map((votedEvent) => (
            <div className="voted-cards__item" key={`votedEvent_${votedEvent.id}`}>
              <VotedEventCard {...votedEvent} />
            </div>
          ))} */}
          {/* <div className="voted-title subtitle">Voting Finished</div>
          {votedEvents && votedEvents.map((votedEvent) => (
            <div className="voted-cards__item" key={`votedEvent_${votedEvent.id}`}>
              <VotedEventCard {...votedEvent} />
            </div>
          ))} */}
        </div>
        <div className="event-cards-pending" id="event-cards-pending">
          {pendingEvents.length ?
              <>            
              <div className="pending-title subtitle">Voting In Progress</div>
              {pendingEvents.map((pendingEvent) => (
                <div className="pending-cards__item" key={`pendingEvent_${pendingEvent.id}`}>
                  <EventCard {...pendingEvent} />
                </div>
              ))}
              </> 
              :
              <></>
            }
          </div>
        {/* <div className="event-cards-pending" id="event-cards-pending">
          {pendingEvents.length && <div className="pending-title subtitle">Voting In Progress</div>}
          {pendingEvents && pendingEvents.map((pendingEvent) => (
            <div className="event-cards__item" key={`pendingEvent_${pendingEvent.id}`}>
              <EventCard {...pendingEvent} />
            </div>
          ))}
        </div> */}
      </div>
      <ScrollToTop smooth component={<IoIosArrowUp />} />
    </div>
  );
};

export default MyEvents;
