import {

  SET_MESSAGE,
  RETRIEVE_Event,
  CREATE_Event,
  DELETE_Event,
  UPDATE_Event


} from "./type";
import eventService from "../services/event.service";
import buildFormData from "../helpers/buildFormData";

export const allEvents = () => (dispatch) => {
  return eventService.allevents().then(
    (result) => {
      //console.log(result);
      dispatch({
        type: RETRIEVE_Event,
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

export const EventAdd = (form) => (dispatch) => {
  console.log("EVENT ACTION DATA : " + form);
  return eventService.add(form).then(
    (response) => {
      console.log(response);
      dispatch({
        type: CREATE_Event,

      });
      dispatch({
        type: SET_MESSAGE,
        payload: response.data.message,
      });
      return Promise.resolve();
    },
    (error) => {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
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
    const formValues = new FormData()
    buildFormData(formValues, data)
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
export const findEventByName = (EventName) => async (dispatch) => {
  try {
    const res = await eventService.findByTitle(EventName);
    dispatch({
      type: RETRIEVE_Event,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
  }
};