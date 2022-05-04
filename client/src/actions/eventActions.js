import {
  SET_MESSAGE,
  FETCH_EVENTS,
  CREATE_Event,
  DELETE_Event,
  UPDATE_Event,
} from "./type";
import eventService from "../services/event.service";
import buildFormData from "../helpers/buildFormData";

export const allEvents =
  ({ page, keyword }) =>
    async (dispatch) => {
      const response = await eventService.allEvents({ page, keyword });
      dispatch({
        type: FETCH_EVENTS,
        payload: response.data,
      });
    };

export const EventAdd = (form) => async (dispatch) => {
  console.log({ form });
  const { data } = await eventService.add(form);
  dispatch({
    type: CREATE_Event,
  });
  dispatch({
    type: SET_MESSAGE,
    payload: data.message,
  });
};

export const RemoveEvent = (id) => (dispatch) => {
  try {
    eventService.dellete(id);
    dispatch({
      type: DELETE_Event,
      payload: { id },
    });
  } catch (err) {
    console.log(err);
  }
};

export const Update = (id, data) => async (dispatch) => {
  try {
    const formValues = new FormData();
    buildFormData(formValues, data);
    const res = await eventService.update(id, formValues);
    dispatch({
      type: UPDATE_Event,
      payload: data,
    });
    return Promise.resolve(res.data);
  } catch (err) {
    return Promise.reject(err);
  }
};
export const allEventsForUser = (id) => (dispatch) => {
  return eventService.allEventsForUser(id).then(
    (result) => {
      console.log(result);
      dispatch({

        payload: result.data,
      });
      console.log(result.data);
      return Promise.resolve();
    },
    (error) => {
      const message =
        (error.response &&
          error.response.result &&
          error.response.result.message) ||
        error.message ||
        error.toString();
      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });
      return Promise.reject();
    }

  );
};