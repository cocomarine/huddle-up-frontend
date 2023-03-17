import { createContext, useReducer } from "react";
import PropTypes from "prop-types";

export const EventContext = createContext();

export const eventReducer = (state, action) => {
  switch (action.type) {
    case "EVENT_CREATED":
      return { event: action.payload };
    case "DELETE_EVENT":
      return { 
        event: state.event.filter((event) => event.id !== action.payload.id)
      }
    default: 
      return state;
  }
};

export const EventContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(eventReducer, {
    event: null
  });

  console.log('EventContext state:', state);

  return (
    <EventContext.Provider value={{ ...state, dispatch }}>
      { children }
    </EventContext.Provider>
  );
};

EventContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
