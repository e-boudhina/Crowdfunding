import {
 
    SET_MESSAGE
     
  } from "./type";
import eventService from "../services/event.service";

  export const allEvents = () => (dispatch) => {
    return eventService.allevents().then(
        (result) => {
            console.log(result);
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

  export const CREATE_Event = (form) => (dispatch) => {
    return eventService.add(form).then(
      (response) => {
        console.log(response);
        dispatch({
          
         
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


  export const DELETE_Event = (id) =>  (dispatch) => {
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

  export const RETRIEVE_Event = (id) => async (dispatch) => {
    
      const res = await eventService.getevent(id).then(
        (result) => {
            console.log(result);
            dispatch({
                payload: result.data,
            });
            console.log(result.data);
            return Promise.resolve();
          },

          (error) => {
         console.log("Erreur");
            return Promise.reject();
          }
          );
        }
        
  export const UPDATE_Event = (id, data) => async (dispatch) => {
    try {
      const res = await eventService.update(id, data);
      dispatch({
        type: UPDATE_Event,
        payload: data,
      });
      return Promise.resolve(res.data);
    } catch (err) {
      return Promise.reject(err);
    }
  };