import {
    GET_FOLLOWERS_BY_ORG
     
  } from "./Type";
//   import OrganisationService from "../services/auth.service";
  import ProjectService from "../../services/Projects/project.service";

  export const getFollowers = (id) => (dispatch) => {
    return ProjectService.getFollowers(id).then(
        (result) => {
            console.log(result);
            dispatch({
                type: GET_FOLLOWERS_BY_ORG,
                payload: result.data,
            });
            console.log(result.data);
            return Promise.resolve();   
          }

    );
  };