import { combineReducers } from "redux";
import auth from "./auth";
import projects from "../reducers/Projects/project.reducers";
import organisations from "../reducers/Organisations/organisation.reducers";
import message from "./message";
import navigation from "./navigation";
export default combineReducers({   //t'importi el reducers li bech  yetaamlou maa l store 
  auth,
  message,
  navigation,
  projects,
  organisations
});