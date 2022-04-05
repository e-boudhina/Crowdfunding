import { combineReducers } from "redux";
import auth from "./auth";
import projects from "../reducers/Projects/project.reducers";
import users from "../reducers/User/userReducer";
import organisations from "../reducers/Organisations/organisation.reducers";
import followers from "../reducers/Organisations/follow.reducers";
import owner from "../reducers/Organisations/owner.reducer";
import message from "./message";
import navigation from "./navigation";
import postReducer from "./postReducer";

export default combineReducers({   //t'importi el reducers li bech  yetaamlou maa l store 
  auth,
  message,
  navigation,
  post: postReducer,
  projects,
  organisations,
  users,
  followers,
  owner  
});

