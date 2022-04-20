import { ENGAGED, GET_PROGRESS, NOT_ENGAGED, RESET_PROGRESS, UPDATE_PROGRESS } from "../type";
import LearningService from "../../services/Learning.service";


export const  getProgress =  (user,certif) =>   (dispatch) => {
let obj = {}
obj["user"] = user
obj["certificate"] = certif
    return LearningService.getProgress(obj).then(

        (data) => {
    if (data.status === 200)  {     
        console.log("200" + data.status);
          dispatch({
                type: GET_PROGRESS,
                 payload: data.data,
            });
            dispatch({
                type: ENGAGED,
                 payload: true,
            });
            return Promise.resolve();
     } else if (data.status === 404) {
        console.log("404");
        dispatch({
            type: RESET_PROGRESS,
        });
        return Promise.resolve();
     } 
    },
        (error) => {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
                console.log("404");
                dispatch({
                    type: RESET_PROGRESS,
                });
    /*        dispatch({
                type: FETCHING_USERS_FAILED,
            });
            dispatch({
                type: SET_MESSAGE,
                payload: message,
            });*/
            return Promise.reject();
        }
    );
};