import {
    GET_OWNER
     
  } from "./Type";
//   import OrganisationService from "../services/auth.service";
  import userService from "../../services/user.service";

  export const getOwner = (username) => (dispatch) => {
    return userService.getUser(username).then(
        (result) => {
            console.log(result);
        console.log(username);

            dispatch({
                type: GET_OWNER,
                payload: result.data,
            });
            console.log(result.data);
            return Promise.resolve();   
          }

    );
  };