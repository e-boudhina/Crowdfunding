import UserService from "../../services/user.service";
import {
    DELETING_USER_FAILED,
    DELETING_USER_SUCCESS,
    FETCHING_USERS_FAILED,
    FETCHING_USERS_SUCCESS,
    GET_USERS,
    MAKE_USER_ADMIN_FAILED,
    MAKE_USER_ADMIN_SUCCESS,
    MAKE_USER_INCUBATOR_FAILED,
    MAKE_USER_INCUBATOR_SUCCESS,
    MAKE_USER_USER_FAILED,
    MAKE_USER_USER_SUCCESS,
    USER_BAN_FAILED,
    USER_BAN_SUCCESS,
    USER_FETCHED_FAILED,
    USER_FETCHED_SUCCESS,
    USER_UNBAN_FAILED,
    USER_UNBAN_SUCCESS,
    USER_UPDATE_FAILED,
    USER_UPDATE_SUCCESS
} from "../type";
import {SET_MESSAGE} from "../Organisations/Type";

export const  get_Users =  () =>   (dispatch) => {

    return UserService.getUsers().then(
        (data) => {
            console.log(data.data.users)

            dispatch({
                type: FETCHING_USERS_SUCCESS,
                 payload: data.data.users,
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
                type: FETCHING_USERS_FAILED,
            });
            dispatch({
                type: SET_MESSAGE,
                payload: message,
            });
            return Promise.reject();
        }
    );
};

export const  get_User =  (username) =>   (dispatch) => {

    return UserService.getUser(username).then(
        (data) => {
            console.log(data.data)

            dispatch({
                type: USER_FETCHED_SUCCESS,
                payload: data.data,
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
                type: USER_FETCHED_FAILED,
            });
            dispatch({
                type: SET_MESSAGE,
                payload: message,
            });
            return Promise.reject();
        }
    );
};

export const  delete_User =  (id) =>   (dispatch) => {

    return UserService.deleteUser(id).then(
        (data) => {
          //  console.log('Delete return message')
           // console.log(data.data)
            dispatch({
                type: DELETING_USER_SUCCESS,
            });
            dispatch({
                type: SET_MESSAGE,
                payload: data.data.message,
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
                type: DELETING_USER_FAILED,
            });
            dispatch({
                type: SET_MESSAGE,
                payload: message,
            });

            return Promise.reject();
        }
    );
};
export const  ban_User =  (username) =>   (dispatch) => {

    return UserService.banUser(username).then(
        (data) => {
            //console.log('Delete return message')
            //console.log(data.data.message)
            dispatch({
                type: USER_BAN_SUCCESS,
            });
            dispatch({
                type: SET_MESSAGE,
                payload: data.data.message,
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
                type: USER_BAN_FAILED,
            });
            dispatch({
                type: SET_MESSAGE,
                payload: message,
            });
            return Promise.reject();
        }
    );
};

export const  unban_User =  (username) =>   (dispatch) => {

    return UserService.unbanUser(username).then(
        (data) => {
            //console.log('Delete return message')
            //console.log(data.data.message)
            dispatch({
                type: USER_UNBAN_SUCCESS,
            });
            dispatch({
                type: SET_MESSAGE,
                payload: data.data.message,
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
                type: USER_UNBAN_FAILED,
            });
            dispatch({
                type: SET_MESSAGE,
                payload: message,
            });
            return Promise.reject();
        }
    );
};

export const  make_Admin =  (id) =>   (dispatch) => {

    return UserService.makeAdmin(id).then(
        (data) => {
            //console.log('Delete return message')
            //console.log(data.data.message)
            dispatch({
                type: MAKE_USER_ADMIN_SUCCESS,
            });
            dispatch({
                type: SET_MESSAGE,
                payload: data.data.message,
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
                type: MAKE_USER_ADMIN_FAILED
            });
            dispatch({
                type: SET_MESSAGE,
                payload: message,
            });
            return Promise.reject();
        }
    );
};

//make incubator action here
export const  make_Incubator =  (id) =>   (dispatch) => {

    return UserService.makeIncubator(id).then(
        (data) => {
            //console.log('Delete return message')
            //console.log(data.data.message)
            dispatch({
                type: MAKE_USER_INCUBATOR_SUCCESS,
            });
            dispatch({
                type: SET_MESSAGE,
                payload: data.data.message,
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
                type: MAKE_USER_INCUBATOR_FAILED
            });
            dispatch({
                type: SET_MESSAGE,
                payload: message,
            });
            return Promise.reject();
        }
    );
};
//

//make user action here
export const  make_User =  (id) =>   (dispatch) => {

    return UserService.makeUser(id).then(
        (data) => {
            //console.log('Delete return message')
            //console.log(data.data.message)
            dispatch({
                type: MAKE_USER_USER_SUCCESS,
            });
            dispatch({
                type: SET_MESSAGE,
                payload: data.data.message,
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
                type: MAKE_USER_USER_FAILED
            });
            dispatch({
                type: SET_MESSAGE,
                payload: message,
            });
            return Promise.reject();
        }
    );
};
//


//update user
export const  update_User =  (user) =>   (dispatch) => {

    return UserService.updateUser(user).then(
        (data) => {
            //console.log('Delete return message')
            //console.log(data.data.message)
            dispatch({
                type: USER_UPDATE_SUCCESS,
            });
            dispatch({
                type: SET_MESSAGE,
                payload: data.data.message,
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
                type: USER_UPDATE_FAILED
            });
            dispatch({
                type: SET_MESSAGE,
                payload: message,
            });
            return Promise.reject();
        }
    );
};

