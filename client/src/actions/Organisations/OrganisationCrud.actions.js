import {
    GET_ORGANISATION,
    SET_MESSAGE,
    AddORGANISATION_SUCCESS,
     DELETE_ORGANISATION,
     UPDATE_ORGANISATION,
     GET_SINGLE_ORGANISATION,
     GET_ORGANISATIONFORUSER,
     Follow_Organisation,
     IS_FOLLOWED
     
  } from "./Type";
//   import OrganisationService from "../services/auth.service";
  import OrganisationService from "../../services/Organisations/organisation.service";

  export const allOrganisation = () => (dispatch) => {
    return OrganisationService.allOrganisation().then(
        (result) => {
            console.log(result);
            dispatch({
                type: GET_ORGANISATION,
                payload: result.data,
            });
            console.log(result.data);
            return Promise.resolve();   
          },
          (error) => {
            const message =
              (error.response &&
                error.response.result &&
                error.response.result.message) ||
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
  export const allOrganisationForUser = (id) => (dispatch) => {
    return OrganisationService.allOrganisationForUser(id).then(
        (result) => {
            console.log(result);
            dispatch({
                type: GET_ORGANISATIONFORUSER,
                payload: result.data,
            });
            console.log(result.data);
            return Promise.resolve();   
          },
          (error) => {
            const message =
              (error.response &&
                error.response.result &&
                error.response.result.message) ||
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

  export const AddOrganisation = (form) => (dispatch) => {
  // export const AddProject = (labelproject,projectdescriptiob,fundneeded,image) => (dispatch) => {
    // return OrganisationService.AddProject(labelproject,projectdescriptiob,fundneeded,image).then(
    return OrganisationService.AddOrganisation(form).then(
      (response) => {
        console.log(response);
        dispatch({
          
          type: AddORGANISATION_SUCCESS,
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
        // dispatch({
        //   // type: AddProject_FAIL,
        // });
        dispatch({
          type: SET_MESSAGE,
          payload: message,
        });
        return Promise.reject();
      }
    );
  };



  export const FollowOrganisation = (id,idOrganization) => async (dispatch) => {
    // export const AddProject = (labelproject,projectdescriptiob,fundneeded,image) => (dispatch) => {
      // return OrganisationService.AddProject(labelproject,projectdescriptiob,fundneeded,image).then(
      return await OrganisationService.FollowOrganisation(id,idOrganization).then(
        (response) => {
          console.log(response);
          dispatch({
            
            type: Follow_Organisation,
          });
          dispatch({
            type: SET_MESSAGE,
            payload: response.data.message,
          });
          return Promise.resolve();
        }

        
      );
    };


    export const IsFollowed = (id,idOrganization) => async (dispatch) => {
      // export const AddProject = (labelproject,projectdescriptiob,fundneeded,image) => (dispatch) => {
        // return OrganisationService.AddProject(labelproject,projectdescriptiob,fundneeded,image).then(
        return await OrganisationService.IsFollowed(id,idOrganization).then(
          (response) => {
            console.log(response);
            dispatch({
              
              type: IS_FOLLOWED,
            });
            dispatch({
              type: SET_MESSAGE,
              payload: response.data.message,
            });
            return Promise.resolve();
          }
  
          
        );
      };

  export const deleteOrganization = (id) =>  (dispatch) => {
    try {
      OrganisationService.remove(id);
      dispatch({
        type: DELETE_ORGANISATION,
        payload: { id },
      });
    } catch (err) {
      console.log(err);
    }
  };

  // export const RetrieveOrganisation = (id) => async (dispatch) => {
    
  //     const res = await OrganisationService.getSingle(id).then(
  //       (result) => {
  //           console.log(result);
  //           dispatch({
  //               type: GET_SINGLE_ORGANISATION,
  //               payload: result.data,
  //           });
  //           console.log(result.data);
  //           return Promise.resolve();
  //         },

  //         (error) => {
  //        console.log("Erreur");
  //           return Promise.reject();
  //         }
  //         );
  //       }
        
  export const updateOrganisation = (id, data) => async (dispatch) => {
    try {
      const res = await OrganisationService.update(id, data);
      dispatch({
        type: UPDATE_ORGANISATION,
        payload: data,
      });
      return Promise.resolve(res.data);
    } catch (err) {
      return Promise.reject(err);
    }
  };
 






  