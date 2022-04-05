import {
    GET_PROjECT,
    SET_MESSAGE,
    AddProject_SUCCESS,
     DELETE_PROJECT,
     UPDATE_PROJECT,
     GET_SINGLE_PROJECT,
     GET_PROJECTS_ORG,
     GET_PROJECTS_TO_VALIDATE,
     Validate_Project_SUCCESS,
     Ignore_Project_SUCCESS
  } from "./Type";
//   import ProjectService from "../services/auth.service";
  import ProjectService from "../../services/Projects/project.service";

  export const allProjects = () => (dispatch) => {
    return ProjectService.allProjects().then(
        (result) => {
            console.log(result);
            dispatch({
                type: GET_PROjECT,
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

  export const ProjectsToValidate = () => (dispatch) => {
    return ProjectService.ProjectsToValidate().then(
        (result) => {
            console.log(result);
            dispatch({
                type: GET_PROJECTS_TO_VALIDATE,
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


  
  export const AddProject = (form) => (dispatch) => {
  // export const AddProject = (labelproject,projectdescriptiob,fundneeded,image) => (dispatch) => {
    // return ProjectService.AddProject(labelproject,projectdescriptiob,fundneeded,image).then(
    return ProjectService.AddProject(form).then(
      (response) => {
        console.log(response);
        dispatch({
          
          type: AddProject_SUCCESS,
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
  export const ValidateProject = (id) => (dispatch) => {
  // export const AddProject = (labelproject,projectdescriptiob,fundneeded,image) => (dispatch) => {
    // return ProjectService.AddProject(labelproject,projectdescriptiob,fundneeded,image).then(
    return ProjectService.ValidateProject(id).then(
      (response) => {
        console.log(response);
        dispatch({
          
          type: Validate_Project_SUCCESS,
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
  export const IgnoreProject = (id) => (dispatch) => {
  // export const AddProject = (labelproject,projectdescriptiob,fundneeded,image) => (dispatch) => {
    // return ProjectService.AddProject(labelproject,projectdescriptiob,fundneeded,image).then(
    return ProjectService.IgnoreProject(id).then(
      (response) => {
        console.log(response);
        dispatch({
          
          type: Ignore_Project_SUCCESS,
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


  export const deleteProject = (id) =>  (dispatch) => {
    try {
      ProjectService.remove(id);
      dispatch({
        type: DELETE_PROJECT,
        payload: { id },
      });
    } catch (err) {
      console.log(err);
    }
  };

  export const RetrieveProject = (id) => async (dispatch) => {
    
      const res = await ProjectService.getSingle(id).then(
        (result) => {
            console.log(result);
            dispatch({
                type: GET_SINGLE_PROJECT,
                payload: result.data,
            });
            console.log(result.data);
            return Promise.resolve();
          },

          (error) => {
         console.log("Erreur");
            return Promise.reject();
          }
          );
        }

  export const RetrieveProjectsByOrg = (id) => async (dispatch) => {
    
      const res = await ProjectService.getprojectsByorg(id).then(
        (result) => {
            console.log(result);
            dispatch({
                type: GET_PROJECTS_ORG,
                payload: result.data,
            });
            console.log(result.data);
            return Promise.resolve();
          },

          (error) => {
         console.log("Erreur");
            return Promise.reject();
          }
          );
        }
        
  export const updateProject = (id, data) => async (dispatch) => {
    try {
      const res = await ProjectService.update(id, data);
      dispatch({
        type: UPDATE_PROJECT,
        payload: data,
      });
      return Promise.resolve(res.data);
    } catch (err) {
      return Promise.reject(err);
    }
  };
 






  