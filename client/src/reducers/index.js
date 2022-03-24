import { combineReducers } from "redux";
import auth from "./auth";
import projects from "../reducers/Projects/project.reducers";
import organisations from "../reducers/Organisations/organisation.reducers";
import message from "./message";
export default combineReducers({
  auth,
  message,
  projects,
  organisations
});