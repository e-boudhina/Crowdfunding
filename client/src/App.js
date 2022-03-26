import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
// import "./bezkoder.css";
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
import ProjectDetails from "./components/Projects/ProjectDetails"
import ListPProject from "./components/Projects/ListProject"
import UpdateProject from "./components/Projects/UpdateProject"
import OrganisationAdd from "./components/Organisation/AddOrganisation"
import UppdateOrganisation from "./components/Organisation/UpdateOrganisation"
import Reset_password from "./components/User/reset-password.component";
import New_password from "./components/User/new-password.component";
import AddEvents from "./pages/Events/AddEvent" 
import { ToastContainer } from "react-toastify";

import ProjectAdd from "./components/Projects/addProject" 
import Events from "./pages/Events/Event" 
import EventDetails from "./pages/Events/EventDetails" 


import "react-toastify/dist/ReactToastify.css";
import Notfound from "./components/404.jsx";
import Profileconsult from "./components/User/profileconsult.component"
import Adminboard from "./components/User/board-admin.component"

import "react-datepicker/dist/react-datepicker.css"

import { allProjects } from "./actions/Projects/ProjectCrud.actions";
import ListOrganisation from "./components/Organisation/ListOrganisation";

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
  // dispatch(allProjects())
    
      dispatch(allProjects()); 

  return (
    <Router history={history}>
    {/* <Header></Header> */}

      <Header></Header>
      <div>

        <div className="container mt-3">
          <Routes>
          <Route path={'/'} element={<Dashboard />} />
            <Route path={'/login'} element={<Login />} />
            <Route path={'/profile'} element={<Profile />} />
            <Route path={'/register'} element={<Register />} />
            <Route   path={"u/:username"} element={<Profileconsult />} />
            <Route exact path={'/ProjectDetails'} element={<ProjectDetails />} />
            <Route exact path={'/ListProject'} element={<ListPProject />} />
            <Route exact path={'/addProject'} element={<ProjectAdd />} />
            <Route exact path={'/addOrganisation'} element={<OrganisationAdd />} />
            <Route exact path={'/ListOrganisation'} element={< ListOrganisation/>} />
            <Route exact path={'/updateProject'} element={<UpdateProject />} />
            <Route exact path={'/updateOrganisation'} element={<UppdateOrganisation />} />
            <Route path={"/reset-password"} element={<Reset_password />} />
            <Route path={"/new-password/:token"} element={<New_password />} />
            <Route path ={"/admin"} element={<Adminboard/>}/>
            <Route path={'/eventsdet'} element={<EventDetails/>}/>
            <Route path={'/events'} element={<Events/>}/>
            <Route path={'/addevents'} element={<AddEvents/>}/>
            <Route path={"*"} element={<Notfound />} />
          </Routes>
        </div>

      </div>
      <Footer />
    </Router>
  );
};
export default App;