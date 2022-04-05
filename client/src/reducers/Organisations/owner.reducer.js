import {
 
    GET_OWNER
    } from "../../actions/Organisations/Type";
  
  const initialState={
 owner: {}
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
        case     GET_OWNER:
          return {
            ...state,
            owner: action.payload,
          };
  
  
        default:
          return state;
      }
    }