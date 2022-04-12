import React, { useState , useEffect  } from "react";
import { Navigate , Link } from 'react-router-dom';
import { useDispatch, useSelector  } from "react-redux";
import { useNavigate  } from "react-router-dom";
import { BrowserRouter as Router, Routes, Route , Outlet} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
const Dashboardadmin = (props) => {
  const navigate = useNavigate();

  const navigateToEdit = () => navigate("/register"); //eg.history.push('/login');
  //const dispatch = useDispatch();
 
 const { user: currentUser } = useSelector((state) => state.auth);
 const { message } = useSelector((state) => state.message);
  const { infos: currentInfos } = useSelector((state) => state.auth);
  const { isLoggedIn: IsLoggedIn } = useSelector((state) => state.auth);

function isUserAdmin () {
  return currentUser.roles.includes("ROLE_ADMIN");
  }
useEffect(() => {

    if  ((!currentUser) || (!currentUser.roles.includes("ROLE_ADMIN"))){
        navigate("/")
    
 }

document.body.appendChild(document.createElement("script")).src = "assets-back/libs/jquery/jquery.min.js";
document.body.appendChild(document.createElement("script")).src = "assets-back/libs/bootstrap/js/bootstrap.bundle.min.js";
document.body.appendChild(document.createElement("script")).src = "assets-back/libs/metismenu/metisMenu.min.js";
document.body.appendChild(document.createElement("script")).src = "assets-back/libs/simplebar/simplebar.min.js";
document.body.appendChild(document.createElement("script")).src = "assets-back/libs/node-waves/waves.min.js";
document.body.appendChild(document.createElement("script")).src = "assets-back/js/app.js";
 }) 
  

    /*if (!currentUser || !currentInfos) {
        navigate("/login");
    } else {
     console.log(" Entered profile (from profile:33) ");
    } */

  return (<>   
  <div>
        <meta charSet="utf-8" />
        <title>Dashboard Template</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta content="Premium Multipurpose Admin & Dashboard Template" name="description" />
        <meta content="Themesbrand" name="author" />
        {/* App favicon */}
        <link rel="shortcut icon" href={`/assets-back/images/favicon.ico`} />

        {/* Bootstrap Css */}
        <link href={`/assets-back/css/bootstrap.min.css`}  id="bootstrap-style" rel="stylesheet" type="text/css" />
        {/* Icons Css */}
        <link href={`/assets-back/css/icons.min.cs`} rel="stylesheet" type="text/css" />
        {/* App Css*/}

        <link href={`/assets-back/css/app.min.css`} id="app-style" rel="stylesheet" type="text/css" />
        {/* Begin page */}
        <div id="layout-wrapper">
          <header id="page-topbar">
            <div className="navbar-header">
              <div className="d-flex">
                {/* LOGO */}
                <div className="navbar-brand-box">
                <a href="/" className="logo logo-dark">
                    <span className="logo-sm">
                      <img src={`/assets-back/images/logo-sm.png`} alt="" height={22} />
                    </span>
                    <span className="logo-lg">
                      <img src={`/assets-back/images/logo-dark.png`} alt="" height={17} />
                    </span>
                  </a>
                  <a href="index.html" className="logo logo-light">
                    <span className="logo-sm">
                      <img src={`/assets-back/images/logo-sm.png`} alt="" height={22} />
                    </span>
                    <span className="logo-lg">
                      <img src={`/assets-back/images/logo-light.png`} alt="" height={18} />
                    </span>
                  </a>
                </div>
          
                <div className="d-none d-sm-block">
                  <div className="dropdown pt-3 d-inline-block">
           
                   
                  </div>
                </div>
              </div>
              <div className="d-flex">
                {/* App Search*/}
                <form className="app-search d-none d-lg-block">
                  <div className="position-relative">
                    <input type="text" className="form-control" placeholder="Search..." />
                    <span className="fa fa-search" />
                  </div>
                </form>
                <div className="dropdown d-inline-block d-lg-none ms-2">
                  <button type="button" className="btn header-item noti-icon waves-effect" id="page-header-search-dropdown" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <i className="mdi mdi-magnify" />
                  </button>
                  <div className="dropdown-menu dropdown-menu-lg dropdown-menu-end p-0" aria-labelledby="page-header-search-dropdown">
                    <form className="p-3">
                      <div className="form-group m-0">
                        <div className="input-group">
                          <input type="text" className="form-control" placeholder="Search ..." aria-label="Recipient's username" />
                          <div className="input-group-append">
                            <button className="btn btn-primary" type="submit"><i className="mdi mdi-magnify" /></button>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
                <div className="dropdown d-none d-md-block ms-2">
                  <button type="button" className="btn header-item waves-effect" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <img className="me-2" src={`/assets-back/images/flags/us_flag.jpg`} alt="Header Language" height={16} /> English <span className="mdi mdi-chevron-down" />
                  </button>
                  <div className="dropdown-menu dropdown-menu-end">
                    {/* item*/}
                    <a href="javascript:void(0);" className="dropdown-item notify-item">
                      <img src={`/assets-back/images/flags/germany_flag.jpg`} alt="user-image" className="me-1" height={12} /> <span className="align-middle"> German </span>
                    </a>
                    {/* item*/}
                    <a href="javascript:void(0);" className="dropdown-item notify-item">
                      <img src={`/assets-back/images/flags/italy_flag.jpg`} alt="user-image" className="me-1" height={12} /> <span className="align-middle"> Italian </span>
                    </a>
                    {/* item*/}
                    <a href="javascript:void(0);" className="dropdown-item notify-item">
                      <img src={`/assets-back/images/flags/french_flag.jpg`} alt="user-image" className="me-1" height={12} /> <span className="align-middle"> French </span>
                    </a>
                    {/* item*/}
                    <a href="javascript:void(0);" className="dropdown-item notify-item">
                      <img src={`/assets-back/images/flags/spain_flag.jpg`} alt="user-image" className="me-1" height={12} /> <span className="align-middle"> Spanish </span>
                    </a>
                    {/* item*/}
                    <a href="javascript:void(0);" className="dropdown-item notify-item">
                      <img src={`/assets-back/images/flags/russia_flag.jpg`} alt="user-image" className="me-1" height={12} /> <span className="align-middle"> Russian </span>
                    </a>
                  </div>
                </div>
                <div className="dropdown d-none d-lg-inline-block">
                  <button type="button" className="btn header-item noti-icon waves-effect" data-bs-toggle="fullscreen">
                    <i className="mdi mdi-fullscreen" />
                  </button>
                </div>
                <div className="dropdown d-inline-block">
                  <button type="button" className="btn header-item noti-icon waves-effect" id="page-header-notifications-dropdown" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <i className="mdi mdi-bell-outline" />
                    <span className="badge bg-danger rounded-pill">3</span>
                  </button>
                  <div className="dropdown-menu dropdown-menu-lg dropdown-menu-end p-0" aria-labelledby="page-header-notifications-dropdown">
                    <div className="p-3">
                      <div className="row align-items-center">
                        <div className="col">
                          <h5 className="m-0 font-size-16"> Notifications (258) </h5>
                        </div>
                      </div>
                    </div>
                    <div data-simplebar style={{maxHeight: '230px'}}>
                      <a href className="text-reset notification-item">
                        <div className="d-flex">
                          <div className="flex-shrink-0 me-3">
                            <div className="avatar-xs">
                              <span className="avatar-title bg-success rounded-circle font-size-16">
                                <i className="mdi mdi-cart-outline" />
                              </span>
                            </div>
                          </div>
                          <div className="flex-grow-1">
                            <h6 className="mb-1">Your order is placed</h6>
                            <div className="font-size-12 text-muted">
                              <p className="mb-1">Dummy text of the printing and typesetting industry.</p>
                            </div>
                          </div>
                        </div>
                      </a>
                      <a href className="text-reset notification-item">
                        <div className="d-flex">
                          <div className="flex-shrink-0 me-3">
                            <div className="avatar-xs">
                              <span className="avatar-title bg-warning rounded-circle font-size-16">
                                <i className="mdi mdi-message-text-outline" />
                              </span>
                            </div>
                          </div>
                          <div className="flex-grow-1">
                            <h6 className="mb-1">New Message received</h6>
                            <div className="font-size-12 text-muted">
                              <p className="mb-1">You have 87 unread messages</p>
                            </div>
                          </div>
                        </div>
                      </a>
                      <a href className="text-reset notification-item">
                        <div className="d-flex">
                          <div className="flex-shrink-0 me-3">
                            <div className="avatar-xs">
                              <span className="avatar-title bg-info rounded-circle font-size-16">
                                <i className="mdi mdi-glass-cocktail" />
                              </span>
                            </div>
                          </div>
                          <div className="flex-grow-1">
                            <h6 className="mb-1">Your item is shipped</h6>
                            <div className="font-size-12 text-muted">
                              <p className="mb-1">It is a long established fact that a reader will</p>
                            </div>
                          </div>
                        </div>
                      </a>
                      <a href className="text-reset notification-item">
                        <div className="d-flex">
                          <div className="flex-shrink-0 me-3">
                            <div className="avatar-xs">
                              <span className="avatar-title bg-primary rounded-circle font-size-16">
                                <i className="mdi mdi-cart-outline" />
                              </span>
                            </div>
                          </div>
                          <div className="flex-grow-1">
                            <h6 className="mb-1">Your order is placed</h6>
                            <div className="font-size-12 text-muted">
                              <p className="mb-1">Dummy text of the printing and typesetting industry.</p>
                            </div>
                          </div>
                        </div>
                      </a>
                      <a href className="text-reset notification-item">
                        <div className="d-flex">
                          <div className="flex-shrink-0 me-3">
                            <div className="avatar-xs">
                              <span className="avatar-title bg-danger rounded-circle font-size-16">
                                <i className="mdi mdi-message-text-outline" />
                              </span>
                            </div>
                          </div>
                          <div className="flex-grow-1">
                            <h6 className="mb-1">New Message received</h6>
                            <div className="font-size-12 text-muted">
                              <p className="mb-1">You have 87 unread messages</p>
                            </div>
                          </div>
                        </div>
                      </a>
                    </div>
                    <div className="p-2 border-top">
                      <div className="d-grid">
                        <a className="btn btn-sm btn-link font-size-14 text-center" href="javascript:void(0)">
                          View all
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="dropdown d-inline-block">
                  <button type="button" className="btn header-item waves-effect" id="page-header-user-dropdown" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <img className="rounded-circle header-profile-user" src={`/assets-back/images/users/user-4.jpg`} alt="Header Avatar" />
                  </button>
                  <div className="dropdown-menu dropdown-menu-end">
                    {/* item*/}
                    <a className="dropdown-item" href="#"><i className="mdi mdi-account-circle font-size-17 align-middle me-1" /> Profile</a>
                    <a className="dropdown-item" href="#"><i className="mdi mdi-wallet font-size-17 align-middle me-1" /> My Wallet</a>
                    <a className="dropdown-item d-flex align-items-center" href="#"><i className="mdi mdi-cog font-size-17 align-middle me-1" /> Settings<span className="badge bg-success ms-auto">11</span></a>
                    <a className="dropdown-item" href="#"><i className="mdi mdi-lock-open-outline font-size-17 align-middle me-1" /> Lock screen</a>
                    <div className="dropdown-divider" />
                    <a className="dropdown-item text-danger" href="#"><i className="bx bx-power-off font-size-17 align-middle me-1 text-danger" /> Logout</a>
                  </div>
                </div>
      
              </div>
            </div>
          </header>
          {/* ========== Left Sidebar Start ========== */}
          <div className="vertical-menu">
            <div data-simplebar className="h-100">
              {/*- Sidemenu */}
              <div id="sidebar-menu">
                {/* Left Menu Start */}
                <ul className="metismenu list-unstyled" id="side-menu">
                  <li className="menu-title">Main</li>
                  <li>
                    <Link to="/admin/add" className="waves-effect">
                      <i className="ti-home" /><span className="badge rounded-pill bg-primary float-end">2</span>
                      <span>Add chapter</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/admin/addcertificate" className="waves-effect">
                      <i className="ti-home" /><span className="badge rounded-pill bg-primary float-end">2</span>
                      <span>add  certificate</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/admin/listcertificates" className="waves-effect">
                      <i className="ti-home" /><span className="badge rounded-pill bg-primary float-end">2</span>
                      <span>List  certificates</span>
                    </Link>
                  </li>
                  <li>

                    <Link to="/admin/users" className="waves-effect">
                      <i className="ti-home" />
                      <span>List  Users</span>
                    </Link>
                  </li>




                  <li>
                    <Link to="/admin/ListOrganisation" className="waves-effect">
                      <i className="ti-home" /><span className="badge rounded-pill bg-primary float-end">2</span>
                      <span>List  of organisation</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/admin/ListProjectToValidate" className="waves-effect">
                      <i className="ti-home" /><span className="badge rounded-pill bg-primary float-end">2</span>
                      <span>Validate new projects</span>
                    </Link>
                  </li>
                  {/* <li>
                    <Link to="/admin/ListProject" className="waves-effect">
                      <i className="ti-home" /><span className="badge rounded-pill bg-primary float-end">2</span>
                      <span>List  of projects</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/admin/ListProject" className="waves-effect">
                      <i className="ti-home" /><span className="badge rounded-pill bg-primary float-end">2</span>
                      <span>List  of projects to validate</span>
                    </Link>
                  </li> */}

                </ul>
              </div>
              {/* Sidebar */}
            </div>
          </div>
          {/* Left Sidebar End */}
          )
          {/* ============================================================== */}
          {/* Start right Content here */}
          {/* ============================================================== */}
          <div className="main-content">
            <div className="page-content">
              <div className="container-fluid">
                {/* start page title */}
                <div className="page-title-box">
                  <div className="row align-items-center">
                  </div>
                </div>
                {/* end page title */}
                {/* Start Your Main Content Here*/}
              </div> {/* container-fluid */}
            </div>
            {/* End Page-content */}
            <Outlet/>
          </div>
          {/* end main content*/}
        </div>
        {/* END layout-wrapper */}
        {/* Right Sidebar */}   {/* /Right-bar */}
        {/* Right bar overlay*/}
       
        {/* JAVASCRIPT */}
  
      </div>
    );
  

    {/* JAVASCRIPT */}


        );


      </>

  );
};

export default Dashboardadmin
