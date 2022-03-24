import { combineReducers } from "redux";
import auth from "./auth";
import message from "./message";
import navigation from "./navigation";
import postReducer from "./postReducer";

export default combineReducers({   //t'importi el reducers li bech  yetaamlou maa l store 
  auth,
  message,
  navigation,
  post: postReducer,
});