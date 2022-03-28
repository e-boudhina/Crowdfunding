import {
    CREATE_Event,
    RETRIEVE_Event,
    UPDATE_Event,
    DELETE_Event
   
  } from "../actions/type";
  const initialState={
    Events:[],
    
    }
    
  function EventReducer(events = initialState, action) {
    const { type, payload } = action;
    
    switch (type) {
      case CREATE_Event:
        return [...events, payload];
        case     RETRIEVE_Event:
          return {
            ...events,
            Events: action.payload,
          };
      case UPDATE_Event:
        return events.map((event) => {
          if (events.id === payload.id) {
            return {
              ...event,
              ...payload,
            };
          } else {
            return events;
          }
        });
      case DELETE_Event:
        return events.filter(({ id }) => id !== payload.id);
     
      default:
        return events;
    }
  };
  export default EventReducer;