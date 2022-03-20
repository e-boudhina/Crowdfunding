import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
//import "./bezkoder.css";
import Login from "./components/User/login.component";
import Register from "./components/User/register.component";
import Home from "./components/User/home.component";
import Profile from "./components/User/profile.component";
import BoardUser from "./components/User/board-user.component";
import BoardModerator from "./components/User/board-moderator.component";
import BoardAdmin from "./components/User/board-admin.component";
import { logout } from "./actions/auth";
import { clearMessage } from "./actions/message";
import { history } from "./helpers/history";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Dashboard from "./pages/User/Dashboard"

import "react-datepicker/dist/react-datepicker.css"
import Reset_password from "./components/User/reset-password.component";
import New_password from "./components/User/new-password.component";

// Import toast and the css
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'

const App = () => {
  const [showModeratorBoard, setShowModeratorBoard] = useState(false);
  const [showAdminBoard, setShowAdminBoard] = useState(false);
  
  const { user: currentUser } = useSelector((state) => state.auth);

  //const currentUser = {};
  const dispatch = useDispatch();
  useEffect(() => {
    history.listen((location) => {
      console.log("history listen called from Appjs:33");
      dispatch(clearMessage()); // clear message when changing location
    });
  }, [dispatch]);
 /* useEffect(() => {
    if (currentUser) {
      setShowModeratorBoard(currentUser.roles.includes("ROLE_MODERATOR"));
      setShowAdminBoard(currentUser.roles.includes("ROLE_ADMIN"));
    }
  }, [currentUser]);
  */
  
  /*const logOut = () => {
    dispatch(logout());
  };*/
  

  return (
      <>
<Router history={history}>
      <Header/>
      <div>
     
        <div className="container mt-3">
          <Routes>
          <Route path={'/'} element={<Dashboard/>}/>
          <Route path={'/login'} element={<Login/>}/>
          <Route path={'/profile'} element={<Profile/>}/>
          <Route path={'/register'} element={<Register/>}/>
          <Route path={'/reset-password'} element={<Reset_password/>}/>
          <Route path={'/new-password/:token'} element={<New_password/>}/>
          </Routes>
        </div>
      
      </div>
      <Footer/>
    </Router>
        <ToastContainer/>
        </>
  );
};
export default App;
