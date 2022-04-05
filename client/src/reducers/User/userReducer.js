import {FETCHING_USERS_SUCCESS, GET_USERS} from "../../actions/type";

const initialState={
    users:[],

}

export default function (state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case  FETCHING_USERS_SUCCESS:
            return {
                ...state,
                users: action.payload,
            };

        default:
            return state;
    }
}
