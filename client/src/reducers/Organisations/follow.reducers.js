import {
 
    GET_FOLLOWERS_BY_ORG
    } from "../../actions/Organisations/Type";
  
  const initialState={
 followers:[]
  // project:[]
  }
  
  
  
    export default function (state = initialState, action) {
      const { type, payload } = action;
      switch (type) {
        // case     IS_FOLLOWED:
        //   return {
        //     ...state,
        //     follow: action.payload,
        //   };
        case     GET_FOLLOWERS_BY_ORG:
          return {
            ...state,
            followers: action.payload,
          };
  
  
        default:
          return state;
      }
    }