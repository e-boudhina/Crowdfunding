import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/User/login.component";
import Register from "./components/User/register.component";
import Profile from "./components/User/profile.component";
import { clearMessage } from "./actions/message";
import { history } from "./helpers/history";

import Header from "./components/Header";
import Footer from "./components/Footer";
import ProjectDetails from "./components/Projects/ProjectDetails";
import AddProject from "./components/Projects/addProject";
import Events from "./pages/Events/Event";
import EventDetails from "./pages/Events/EventDetails";
import "react-datepicker/dist/react-datepicker.css";
import AddEvents from "./pages/Events/AddEvent";
import Adminboard from "./pages/User/board-admin";
import "react-datepicker/dist/react-datepicker.css";
import Reset_password from "./components/User/reset-password.component";
import New_password from "./components/User/new-password.component";

// Import toast and the css
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Notfound from "./components/404.jsx";
import Profileconsult from "./components/User/profileconsult.component";
import "antd/dist/antd.css";
import Add from "./components/Elearning/add-chapter.component";
import Listchapter from "./components/Elearning/list-chapter.component";


const App =(props) => {


  //const currentUser = {};
  const dispatch = useDispatch();
  useEffect(() => {
    history.listen((location) => {
      console.log("history listen called from Appjs:33");
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
            <Route path={"/reset-password"} element={<Reset_password />} />
            <Route path={"/new-password/:token"} element={<New_password />} />
            <Route exact  path={"/ProjectDetails"} element={<ProjectDetails />} />
            <Route exact path={"/addProject"} element={<AddProject />} />
            <Route path={"/eventsdet"} element={<EventDetails />} />
            <Route path={"/events"} element={<Events />} />
            <Route path={"/addevents"} element={<AddEvents />} />
            <Route path={"/*"} element={<Notfound />} />
            </Route>

    
            <Route path={"/admin"} element={<Adminboard />}>
           
            <Route  path={"/admin/listchapters"} element={< Listchapter/>}/>
            <Route  path={"/admin/add"} element={<Add/>}/>
            </Route>

          </Routes>


      </Router>
      <ToastContainer />
    </>
  );
}; //          <Route path={"/addchapter"} element={<Addchapter />} />
export default App;
