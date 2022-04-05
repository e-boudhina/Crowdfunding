import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
// import "./bezkoder.css";
//import "./bezkoder.css";
import Login from "./components/User/login.component";
import Register from "./components/User/register.component";
import Profile from "./components/User/profile.component";
import { clearMessage } from "./actions/message";
import { history } from "./helpers/history";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ProjectDetails from "./components/Projects/ProjectDetails"
import ListPProject from "./components/Projects/ListProject"
import UpdateProject from "./components/Projects/UpdateProject"
import ListProjectToValidate from "./components/Projects/ListProjectToValidate"
import OrganisationAdd from "./components/Organisation/AddOrganisation"
import AddOrganisation1 from "./components/Organisation/addOrganisation1"
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
import Adminboard from "./pages/User/board-admin"

import "react-datepicker/dist/react-datepicker.css"

import { allProjects } from "./actions/Projects/ProjectCrud.actions";
import ListOrganisation from "./components/Organisation/ListOrganisation";
import ListOrganisationForAdmin from "./components/Organisation/ListOrganisationForAdmin";
import Add from "./components/Elearning/add-chapter.component";
import Listchapter from "./components/Elearning/list-chapter.component";
import Verify_email from "./components/User/verify-email.component";
import OrrganisationDetails from "./components/Organisation/OrganisationDetails";

const App = () => {

  const dispatch = useDispatch();
  useEffect(() => {
    history.listen((location) => {
      dispatch(clearMessage()); // clear message when changing location
    });
  }, [dispatch]);
  
  return (
    <>
      <Router history={history}>



          <Routes>
           
            <Route  path={"/"} element={<><Header /><Footer/></>} > 
            <Route path={"/profile"} element={<Profile />} />
            <Route path={"/u/:username"} element={<Profileconsult />} />
            <Route path={"/login"} element={<Login />} />
            <Route path={"/register"} element={<Register />} />
            <Route path={"/addOrganisation1"} element={<AddOrganisation1 />} />
            <Route path={"/reset-password"} element={<Reset_password />} />
            <Route path={"/new-password/:token"} element={<New_password />} />
            <Route path={"/verify-email/:token"} element={<Verify_email/>} />

            <Route exact  path={"/ProjectDetails"} element={<ProjectDetails />} />
            <Route path={"/eventsdet"} element={<EventDetails />} />
            <Route path={"/events"} element={<Events />} />
            <Route path={"/addevents"} element={<AddEvents />} />
            <Route exact path={'/ListProject'} element={<ListPProject />} />
            <Route exact path={'/addProject'} element={<ProjectAdd />} />
            <Route exact path={'/addOrganisation'} element={<OrganisationAdd />} />
            <Route exact path={'/ListOrganisation'} element={< ListOrganisation/>} />
            <Route exact path={'/updateProject'} element={<UpdateProject />} />
            <Route exact path={'/updateOrganisation'} element={<UppdateOrganisation />} />
            <Route exact path={'/organisationDetails'} element={<OrrganisationDetails />} />
            {/* <Route exact path={'/ListOrganisationForAdmin'} element={<ListOrganisationForAdmin />} /> */}
            <Route path={"/*"} element={<Notfound />} />
            </Route>

    
            <Route path={"/admin"} element={<Adminboard />}>
            <Route path={'/admin/ListOrganisation'} element={< ListOrganisationForAdmin/>} />
            <Route  path={"/admin/listchapters"} element={< Listchapter/>}/>
            <Route  path={"/admin/ListProjectToValidate"} element={<ListProjectToValidate/>}/>
            <Route  path={"/admin/add"} element={<Add/>}/>
            </Route>

          </Routes>


      </Router>
      <ToastContainer />
    </>
  );
}; //          <Route path={"/addchapter"} element={<Addchapter />} />
export default App;
