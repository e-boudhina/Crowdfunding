import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
//import "./bezkoder.css";
import Login from "./components/User/login.component";
import Register from "./components/User/register.component";
///import Home from "./components/User/home.component";
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
import ProjectDetails from "./components/Projects/ProjectDetails" 
import AddProject from "./components/Projects/addProject" 
//import EventDetails from "./components/Events/EventDetails";
//import Events from "./components/Events/Events";
import Events from "./pages/Events/Event";
import EventDetails from "./pages/Events/EventDetails"
import "react-datepicker/dist/react-datepicker.css"
import AddEvents from "./pages/Events/AddEvent" 

import Home from "./pages/Home" 

import EventList from "./components/Events/EventList";



const App = () => {
  const [showModeratorBoard, setShowModeratorBoard] = useState(false);
  const [showAdminBoard, setShowAdminBoard] = useState(false);
  
  const { user: currentUser } = useSelector((state) => state.auth);

  //const currentUser = {};
  const dispatch = useDispatch();
  useEffect(() => {
    history.listen((location) => {
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
<Router history={history}>
      <Header></Header>
      <div>

          <Routes>
          <Route path={'/'} element={<Home/>}/>
          <Route path={'/login'} element={<Login/>}/>
          <Route path={'/profile'} element={<Profile/>}/>
          <Route path={'/register'} element={<Register/>}/>
         
          <Route exact path={'/ProjectDetails'} element={<ProjectDetails/>}/>
          <Route exact path={'/addProject'} element={<AddProject/>}/>
          <Route path={'/eventsdet'} element={<EventDetails/>}/>
                  <Route path={'/events'} element={<Events/>}/>
                  <Route path={'/addevents'} element={<AddEvents/>}/>
                  
                  <Route exact path={'/eventlist'} element={<EventList />} />

          </Routes>
      
   
      </div>
      <Footer/>
    </Router>
  );
};
export default App;