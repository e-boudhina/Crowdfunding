import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Login from "./components/User/login.component";
import Register from "./components/User/register.component";
import Profile from "./components/User/profile.component";
import { clearMessage } from "./actions/message";
import { history } from "./helpers/history";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Dashboard from "./pages/User/Dashboard";

import "react-datepicker/dist/react-datepicker.css";
import Reset_password from "./components/User/reset-password.component";
import New_password from "./components/User/new-password.component";

// Import toast and the css
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Notfound from "./components/404.jsx";
import Profileconsult from "./components/User/profileconsult.component"

const App = () => {
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
        <Header />

          <div className="container mt-3">
            <Routes >
            <Route exact path={"/"} element={<Dashboard />} />
            <Route   path={"u/:username"} element={<Profileconsult />} />
              <Route path={"/login"} element={<Login />} />
              <Route path={"/profile"} element={<Profile />} />
              <Route path={"/register"} element={<Register />} />
              <Route path={"/reset-password"} element={<Reset_password />} />
              <Route path={"/new-password/:token"} element={<New_password />} />
              <Route path={"*"} element={<Notfound />} />
            </Routes>
          </div>
        <Footer />
      </Router>

    </>
  );
};
export default App;
