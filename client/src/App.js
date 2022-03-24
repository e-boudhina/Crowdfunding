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
import ListProject from "./components/Projects/ListProject"
import AddProject from "./components/Projects/addProject"
import UpdateProject from "./components/Projects/UpdateProject"
import OrganisationAdd from "./components/Organisation/AddOrganisation"
import UppdateOrganisation from "./components/Organisation/UpdateOrganisation"

import "react-datepicker/dist/react-datepicker.css"

import { allProjects } from "./actions/Projects/ProjectCrud.actions";

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

      {/* <Header></Header> */}
      <div>

        <div className="container mt-3">
          <Routes>
            <Route path={'/'} element={<Dashboard />} />
            <Route path={'/login'} element={<Login />} />
            <Route path={'/profile'} element={<Profile />} />
            <Route path={'/register'} element={<Register />} />
            <Route exact path={'/ProjectDetails'} element={<ProjectDetails />} />
            <Route exact path={'/ListProject'} element={<ListProject />} />
            <Route exact path={'/addProject'} element={<AddProject />} />
            <Route exact path={'/addOrganisation'} element={<OrganisationAdd />} />
            <Route exact path={'/ListOrganisation'} element={< ListProject/>} />
            <Route exact path={'/updateProject'} element={<UpdateProject />} />
            <Route exact path={'/updateOrganisation'} element={<UppdateOrganisation />} />
          </Routes>
        </div>

      </div>
      <Footer />
    </Router>
  );
};
export default App;