import { combineReducers } from "redux";
import auth from "./auth";
import message from "./message";
import events from "./event";

export default combineReducers({   //t'importi el reducers li bech  yetaamlou maa l store 
  auth,
  message,
  events
});