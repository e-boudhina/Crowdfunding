import {
 
  GET_ORGANISATION,
  SET_MESSAGE,
  AddORGANISATION_SUCCESS,
   DELETE_ORGANISATION,
   UPDATE_ORGANISATION,
   GET_SINGLE_ORGANISATION,
   GET_ORGANISATIONFORUSER
  } from "../../actions/Organisations/Type";

const initialState={
Organisations:[],
// project:[]
}



  export default function (state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
      case     GET_ORGANISATIONFORUSER:
        return {
          ...state,
          Organisations: action.payload,
        };
      // case GET_SINGLE_PROJECT:
      //  console.log(action.payload);
      //   return {
      //     ...state,
      //     project: action.payload,

      //   } ;

          case DELETE_ORGANISATION:
                     return state.filter((item) => item.id !== action.id);
          
         case UPDATE_ORGANISATION:
                      return state?.Organisations.map((organisation) => {
                        if (organisation.id === payload.id) {
                          return {
                            ...organisation,
                            ...payload,
                          };
                        } else {
                          return organisation;
                        }
                      });



      default:
        return state;
    }
  }