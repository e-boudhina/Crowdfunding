import UserService from "../../services/user.service";
import {FETCHING_USERS_FAILED, FETCHING_USERS_SUCCESS, GET_USERS} from "../type";
import {SET_MESSAGE} from "../Organisations/Type";

export const  get_Users =  () =>   (dispatch) => {

    return UserService.getUsers().then(
        (data) => {
            console.log(data.data.users)
            dispatch({
                type: FETCHING_USERS_SUCCESS,
            });
            dispatch({
                type: GET_USERS,
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
