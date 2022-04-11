import {FETCHING_USERS_SUCCESS, GET_USERS, USER_UPDATE_SUCCESS} from "../../actions/type";

const initialState={
    users:[],

}

export default function (state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case  FETCHING_USERS_SUCCESS:
            return {
                ...state,
                users: payload,
            };
        case USER_UPDATE_SUCCESS:
            return {
                users: payload
            }
        default:
            return state;
    }
}
