import {
  CREATE_Event,
  UPDATE_Event,
  DELETE_Event,
  FETCH_EVENTS,
} from "../actions/type";

const initialState = {
  allEvents: {
    page: 1,
    hasNextPage: false,
    items: [],
    totalItems: 0,
    totalPages: 1,
  },
};

function EventReducer(events = initialState, action) {
  const {type, payload} = action;

  switch (type) {
    case CREATE_Event:
      return [...events, payload];
    case FETCH_EVENTS:
      return {
        ...events,
        allEvents: action.payload,
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
      return events.filter(({id}) => id !== payload.id);

    default:
      return events;
  }
}
export default EventReducer;
