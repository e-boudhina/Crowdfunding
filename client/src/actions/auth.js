/* eslint-disable no-unused-vars */
import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    SET_MESSAGE,
    REFRESH_USER,
    USER_UPDATE_SUCCESS,
    USER_LOGIN_SUCCESS,
    USER_UPDATE_FAIL,
    USER_UPDATE_REQUEST,
    DELETE_USER,
    RESET_PASSWORD_SUCCESS,
    RESET_PASSWORD_FAILED, NEW_PASSWORD_SUCCESS, NEW_PASSWORD_FAILED, EMAIL_VERIFIED_FAILED, EMAIL_VERIFIED_SUCCESS
} from "./type";
import { useSelector } from "react-redux";
import AuthService from "../services/auth.service";
import { updateUser } from "../services/user.service";
import UserService from "../services/user.service"

const API_URL = "http://localhost:5000/api";

export const deleteUser = (id) => async (dispatch) => {
  try {
    console.log("Entered deleteUser in Actions");
    await AuthService.deleteUser(id);
    dispatch({
      type: DELETE_USER,
      payload: { id },
    });
  } catch (err) {
    console.log("DeleteUser -action  error " + err + " id user = " + id);
  }
};

export const updateProfile =
  (
    id,
    email,
    password,
    firstName,
    lastName,
    address,
    phone,
    birthdate,
    token
  ) =>
    async (dispatch, getState) => {
      const user = {
        id,
        email,
        password,
        firstName,
        lastName,
        address,
        phone,
        birthdate,
      };
      try {
        dispatch({ type: USER_UPDATE_REQUEST }); //esm fnct
        const config = {
          headers: {
            "Content-Type": "application/json",
            "x-access-token": `${token}`,
          },
        };
        //  const { data } = await axios.post(API_URL+"/user/update", user, config)
        const { data } = await updateUser(user);
        localStorage.setItem("infos", JSON.stringify(data.infos));
        localStorage.setItem("user", JSON.stringify(data.user));
        dispatch({ type: USER_UPDATE_SUCCESS, payload: data });
      } catch (error) {
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
      }
    };
    export const registerr =
    (form) =>
      (dispatch) => {
        return AuthService.registerr(
          form
        ).then(
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
export const register =
  (username, email, password, firstName, lastName, address, birthdate ,phone,image) =>
    (dispatch) => {
      return AuthService.register(
        username,
        email,
        password,
        firstName,
        lastName,
        address,
        birthdate,phone,
        image
      ).then(
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

export const login = (username, password) => (dispatch) => {
  return AuthService.login(username, password).then(
    (data) => {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: { user: data.user, infos: data.infos }, // , infos : data.infos
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
        //   console.log('reset data object: ')
        // console.log(data.message)
        dispatch({
          type: RESET_PASSWORD_SUCCESS,
        });
          console.log("setting message")
         console.log("Service message"+data.message)
          dispatch({
              type: SET_MESSAGE,
              payload: data.message,
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

export const  new_password =  (password, token) =>   (dispatch) => {

  return AuthService.new_password(password, token).then(
      (data) => {
         console.log(data)
        dispatch({
          type: NEW_PASSWORD_SUCCESS,
        });
        dispatch({
          type: SET_MESSAGE,
          payload: data.message,
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
          type: NEW_PASSWORD_FAILED,
        });
        dispatch({
          type: SET_MESSAGE,
          payload: message,
        });
        return Promise.reject();
      }
  );
};
export const  verify_email =  (token) =>   (dispatch) => {

  return AuthService.verify_email(token).then(
      (data) => {
        // console.log("returned data")
        // console.log(data.message)
        dispatch({
          type: EMAIL_VERIFIED_SUCCESS,
        });
        dispatch({
          type: SET_MESSAGE,
          payload: data.message,
        });
        return Promise.resolve();
      },
      (error) => {
         // console.log("Error message here:")

        const message =
            (error.response &&
                error.response.data &&
                error.response.data.message) ||
            error.message ||
            error.toString();

        dispatch({
          type: EMAIL_VERIFIED_FAILED,
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
