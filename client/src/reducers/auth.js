/* eslint-disable import/no-anonymous-default-export */
/* eslint-disable no-unused-vars */
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  UPDATE,
  REFRESH_USER,
  USER_UPDATE_FAIL,
  USER_UPDATE_SUCCESS,
  USER_UPDATE_REQUEST,
  DELETE_USER
} from "../actions/type";

const user = JSON.parse(localStorage.getItem("user"));
const infos = JSON.parse(localStorage.getItem("infos"));

const initialState = user     //t'importa fel index , ba3d fel store  , donc 3anna userstate fel store 
  ? { isLoggedIn: true , user  ,  infos , loading:false  }
  : { isLoggedIn: false, user: null , infos : null , loading: false };

  /*const infoStateState = infos 
  ? { isLoggedIn: true , user  , }
  : { isLoggedIn: false, user: null  }; */

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case REGISTER_SUCCESS:
      return {
        ...state,
        isLoggedIn: false,
      };
    case REGISTER_FAIL:
      return {
        ...state,
        isLoggedIn: false,
      };
    case LOGIN_SUCCESS:
      console.log("called sucess_login with payload : "+ payload.user );
      return {
        ...state,
        isLoggedIn: true,
        user: payload.user   ,  //payload.user
        infos: payload.infos   ,
      };
    case LOGIN_FAIL:
      return {
        ...state,
        isLoggedIn: false,
        user: null,
      };
    case LOGOUT:
      return {
        ...state,
        isLoggedIn: false,
        user: null,
        infos: null
      };
    case USER_UPDATE_REQUEST:
      console.log("called update request reducer");
      return { ...state , loading: true };
    case USER_UPDATE_SUCCESS:
      return { ...state , loading: false, infos : payload.infos , user: payload.user  /*, success: true*/ };
    case USER_UPDATE_FAIL:
    return { ...state , loading: false, error: payload /* , success: false*/ };
    case DELETE_USER:
     // return tutorials.filter(({ id }) => id !== payload.id);
    return { id: payload.id}
     default:
      return state;
  }
}
