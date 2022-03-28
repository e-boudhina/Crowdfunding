import {
 
    GET_PROjECT,
    DELETE_PROJECT,
    UPDATE_PROJECT,
    GET_SINGLE_PROJECT,
    GET_PROJECTS_ORG
  } from "../../actions/Projects/Type";

const initialState={
projects:[]
}



  export default function (state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
      case GET_PROjECT:
        return {
          ...state,
          projects: action.payload,
        };
      case GET_PROJECTS_ORG:
        return {
          ...state,
          projects: action.payload,
        };
      case GET_SINGLE_PROJECT:
       console.log(action.payload);
        return {
          ...state,
          project: action.payload,

        } ;

        case DELETE_PROJECT:
                     return state.filter((item) => item.id !== action.id);
          
         case UPDATE_PROJECT:
           console.log(state);
                      return state?.projects.map((project) => {
                        if (project.id === payload.id) {
                          return {
                            ...project,
                            ...payload
                          };
                        } else {
                          return project;
                        }
                      });



      default:
        return state;
    }
  }