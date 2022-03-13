import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
// import "./bezkoder.css";
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
import AddProject from "./components/Projects/addProject" 




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
  const logOut = () => {
    dispatch(logout());
  };
  

  return (
<Router history={history}>
      {/* <Header></Header> */}
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <Link to={"/"} className="navbar-brand">
            bezKoder
          </Link>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/home"} className="nav-link">
                Home
              </Link>
            </li>
            {showModeratorBoard && (
              <li className="nav-item">
                <Link to={"/mod"} className="nav-link">
                  Moderator Board
                </Link>
              </li>
            )}
            {showAdminBoard && (
              <li className="nav-item">
                <Link to={"/admin"} className="nav-link">
                  Admin Board
                </Link>
              </li>
            )}
            {currentUser && (
              <li className="nav-item">
                <Link to={"/user"} className="nav-link">
                  User
                </Link>
              </li>
            )}
          </div>
          {currentUser ? (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/profile"} className="nav-link">
                  {currentUser.username}
                </Link>
              </li>
              <li className="nav-item">
                <a href="/login" className="nav-link" onClick={logOut}>
                  LogOut
                </a>
              </li>
            </div>
          ) : (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/login"} className="nav-link">
                  Login
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"/register"} className="nav-link">
                  Sign Up
                </Link>
              </li>
            </div>
          )}
        </nav>
        <div className="container mt-3">
          <Routes>
          <Route path={'/'} element={<Dashboard/>}/>
          <Route path={'/login'} element={<Login/>}/>
          <Route path={'/profile'} element={<Profile/>}/>
          <Route path={'/register'} element={<Register/>}/>
          <Route exact path={'/ProjectDetails'} element={<ProjectDetails/>}/>
          <Route exact path={'/addProject'} element={<AddProject/>}/>
          </Routes>
        </div>
      </div>
      <Footer/>
    </Router>
  );
};
export default App;