/* eslint-disable no-unused-vars */
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  SET_MESSAGE,
  REFRESH_USER, RESET_PASSWORD_SUCCESS, RESET_PASSWORD_FAILED
} from "./type";
  import AuthService from "../services/auth.service";
  import UserService from "../services/user.service";
  import axios from "axios";


  export const register = (username, email, password , firstName , lastName , address , birthdate) => (dispatch) => {
    return AuthService.register(username, email, password , firstName , lastName , address , birthdate ).then(
      (response) => {
        dispatch({
          type: REGISTER_SUCCESS,
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
          type: REGISTER_FAIL,
        });
        dispatch({
          type: SET_MESSAGE,
          payload: message,
        });
        return Promise.reject();
      }
    );
  };
  


  export const login2 = (username, password) =>  (dispatch) => {
    try {
  
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };  
      const { data } =  AuthService.login(username, password)
      dispatch({
        type: LOGIN_SUCCESS,
        payload: { user: data  },  // , infos : data.infos
      })
  
    } catch (error) {
      const message =
      (error.response &&
        error.response.data &&
        error.response.data.message) ||
      error.message ||
      error.toString();
    dispatch({
      type: LOGIN_FAIL,
    });
    dispatch({
      type: SET_MESSAGE,
      payload: message,
    });
    }
  };

  export const  login =  (username, password) =>   (dispatch) => {
    return AuthService.login(username, password).then(
      (data) => {
        dispatch({
          type: LOGIN_SUCCESS,
          payload: { user: data.user , infos: data.infos },  // , infos : data.infos
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
          type: LOGIN_FAIL,
        });
        dispatch({
          type: SET_MESSAGE,
          payload: message,
        });
        return Promise.reject();
      }
    );
  };

export const  reset_password =  (username) =>   (dispatch) => {

  return AuthService.reset_password(username).then(
      (data) => {
        // console.log(username)
        dispatch({
          type: RESET_PASSWORD_SUCCESS,
          payload: { message: data.message},
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
          type: RESET_PASSWORD_FAILED,
        });
        dispatch({
          type: SET_MESSAGE,
          payload: message,
        });
        return Promise.reject();
      }
  );
};


  export const refreshUser = () => (dispatch) => {
    return UserService.refreshUser().then(
      (data) => {
        console.log(data);
        dispatch({
          type: REFRESH_USER,
          payload: { user: data },
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




  export const logout = () => (dispatch) => {
    AuthService.logout();
    dispatch({
      type: LOGOUT,
    });
  };
