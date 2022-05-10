import {
 
    GET_PROjECT,
    DELETE_PROJECT,
    CHANGE_ID,
    UPDATE_PROJECT,
    GET_SINGLE_PROJECT,
    post_adresse,
    GET_PROJECTS_ORG,
    PROJECT_TRACKING,
    GET_PROJECTS_TO_VALIDATE
  } from "../../actions/Projects/Type";

const initialState={
projects:[],
id:0,
adresse:"",
donations:[]
}



  export default function (state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
      case GET_PROjECT:
        return {
          ...state,
          projects: action.payload,
        };
      case PROJECT_TRACKING:
        return {
          ...state,
          donations: action.payload,
        };
        case CHANGE_ID:
          return {
            ...state,
            id: action.payload,
          };

          case post_adresse:
            return {
              ...state,
              adresse: action.payload,
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
     

      case GET_PROJECTS_TO_VALIDATE:
       console.log(action.payload);
        return {
          ...state,
          projects: action.payload,

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