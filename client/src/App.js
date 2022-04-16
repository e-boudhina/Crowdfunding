import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {BrowserRouter as Router, Routes, Route, Link, useNavigate, Redirect} from "react-router-dom";
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
//import AddEvents from "./pages/Events/AddEvent" 
import Home from "./pages/Home" 
import EventList from "./components/Events/EventList";
//import EventDetails from "./components/Events/EventDetails";
import UpdateEvent from "./components/Events/UpdateEvent";
import { allProjects } from "./actions/Projects/ProjectCrud.actions";
import ListOrganisation from "./components/Organisation/ListOrganisation";
import ListOrganisationForAdmin from "./components/Organisation/ListOrganisationForAdmin";
import Add from "./components/Elearning/add-chapter.component";
import Listchapter from "./components/Elearning/list-chapter.component";
import Viewchapter from "./components/Elearning/view-chapter.components";
import ListCertificates from "./components/Elearning/list-certificates.component";
import AddCertificate from "./components/Elearning/add-certificate.component";
import Verify_email from "./components/User/verify-email.component";
import Users from "./components/User/ManageUsers/getUsers.component"
import UpdateUser from "./components/User/ManageUsers/updateUser"
import OrrganisationDetails from "./components/Organisation/OrganisationDetails";
import ListCertificatesUser from "./components/Elearning/list-certificates-user.component";
import ViewCertification from "./pages/Elearning/view-certification"
const App = () => {

   const redirect = ()=>{
    //navigate('/')
    // window.location.reload()
   }
    //const navigate = useNavigate();
  const dispatch = useDispatch();
    const [isVerified,setisVerified] = useState(false)
  useEffect(() => {
      if (localStorage.getItem('user')){
        const infos = JSON.parse(localStorage.getItem('infos'));
       const  isUserVerified = infos.verified
    if (!isUserVerified)
    {
      setisVerified(true)
        //history.go('/')
        //window.location ='/';
    }
      }

    history.listen((location) => {
      dispatch(clearMessage()); // clear message when changing location
    });

  },[] );
     // dispatch(allProjects());

  return (
    <>
      <Router history={history} >



          <Routes>

            {/*{ isVerified ? redirect():''}*/}
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
            <Route path={"/eventlist"} element={<EventList />} />
            <Route exact path={'/ListProject'} element={<ListPProject />} />
            <Route exact path={'/addProject'} element={<ProjectAdd />} />
            <Route exact path={'/addOrganisation'} element={<OrganisationAdd />} />
            <Route exact path={'/ListOrganisation'} element={< ListOrganisation/>} />
            <Route exact path={'/updateProject'} element={<UpdateProject />} />
            <Route exact path={'/updateOrganisation'} element={<UppdateOrganisation />} />
            <Route exact path={'/organisationDetails'} element={<OrrganisationDetails />} />
            <Route path={"/certificates"} element={<ListCertificatesUser />} />
            <Route path={"/certificate/:id"} element={<ViewCertification />} />
            {/* <Route exact path={'/ListOrganisationForAdmin'} element={<ListOrganisationForAdmin />} /> */}
            <Route path={"/*"} element={<Notfound />} />
            </Route>

    
            <Route path={"/admin"} element={<Adminboard />}>
            <Route path={'/admin/ListOrganisation'} element={< ListOrganisationForAdmin/>} />
            <Route  path={"/admin/listchapters"} element={< Listchapter/>}/>
            <Route  path={"/admin/listcertificates"} element={< ListCertificates/>}/>
            <Route  path={"/admin/ListProjectToValidate"} element={<ListProjectToValidate/>}/>
            <Route  path={"/admin/add"} element={<Add/>}/>
            <Route  path={"/admin/addcertificate"} element={<AddCertificate/>}/>
            <Route  path={"/admin/chapter/:id"} element={< Viewchapter/>}/>
            <Route  path={"/admin/users"} element={<Users/>}/>
            {/*I tried to use props but failed*/}
            <Route  path={"/admin/user/update/:username"} element={<UpdateUser/>}/>
            </Route>

          </Routes>


      </Router>
      <ToastContainer />
    </>
  );
}; //          <Route path={"/addchapter"} element={<Addchapter />} />
export default App;
