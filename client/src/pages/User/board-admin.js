import React, { useState , useEffect  } from "react";
import { Navigate , Link } from 'react-router-dom';
import { useDispatch, useSelector  } from "react-redux";
import { useNavigate  } from "react-router-dom";
import { BrowserRouter as Router, Routes, Route , Outlet} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { setCertifs } from "../../actions/Learning/Learning";
const Dashboardadmin = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const navigateToCertifs = () => { 
    //navigate("/admin/listcertificates"); 
dispatch(setCertifs())
  }
 
 const { user: currentUser } = useSelector((state) => state.auth);
useEffect(() => {
  document.body.appendChild(document.createElement("script")).src = "../../../public/assets-back/libs/jquery/jquery.min.js";
  document.body.appendChild(document.createElement("script")).src = "../../../public/assets-back/libs/bootstrap/js/bootstrap.bundle.min.js";
  document.body.appendChild(document.createElement("script")).src = "../../../public/assets-back/libs/metismenu/metisMenu.min.js";
  document.body.appendChild(document.createElement("script")).src = "../../../public/assets-back/libs/simplebar/simplebar.min.js";
  document.body.appendChild(document.createElement("script")).src = "../../../public/assets-back/libs/node-waves/waves.min.js";
  document.body.appendChild(document.createElement("script")).src = "../../../public/assets-back/js/app.js";
    if  ((!currentUser) || (!currentUser.roles.includes("ROLE_ADMIN"))){
        navigate("/")
 }
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


    <link rel="stylesheet" href={process.env.PUBLIC_URL+'/assets-back/libs/jquery/jquery.min.js'} />
    <link rel="stylesheet" href={process.env.PUBLIC_URL+'/assets-back/libs/bootstrap/js/bootstrap.bundle.min.js'} />
    <link rel="stylesheet" href={process.env.PUBLIC_URL+'/assets-back/libs/metismenu/metisMenu.min.js'} />
    <link rel="stylesheet" href={process.env.PUBLIC_URL+'/assets-back/libs/simplebar/simplebar.min.js'} />
    <link rel="stylesheet" href={process.env.PUBLIC_URL+'/assets-back/libs/node-waves/waves.min.js'} />
    <link rel="stylesheet" href={process.env.PUBLIC_URL+'/assets-back/js/app.js'} />

        <link rel="shortcut icon" href={`/assets-back/images/favicon.ico`} />

        {/* Bootstrap Css */}
        <link href={process.env.PUBLIC_URL+'/assets-back/css/bootstrap.min.css'}  id="bootstrap-style" rel="stylesheet" type="text/css" />
        {/* Icons Css */}
        <link href={process.env.PUBLIC_URL+'/assets-back/css/icons.min.css'} rel="stylesheet" type="text/html" />
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
                      <img src={process.env.PUBLIC_URL+'/assets-back/images/logo-sm.png'} alt="" height={22} />
                    </span>
                    <span className="logo-lg">
                      <img src={process.env.PUBLIC_URL+'/assets-back/images/logo-dark.png'} alt="" height={17} />
                    </span>
                  </a>
                  <a href="index.html" className="logo logo-light">
                    <span className="logo-sm">
                      <img src={process.env.PUBLIC_URL+'/assets-back/images/logo-sm.png'} alt="" height={22} />
                    </span>
                    <span className="logo-lg">
                      <img src={process.env.PUBLIC_URL+'/assets-back/images/logo-light.png'} alt="" height={18} />
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
                      <span>Add chapter</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/admin/addcertificate" className="waves-effect">
                      <span>Add  certificate</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/admin/listcertificates" onClick={navigateToCertifs} className="waves-effect">
                      <span>List  certificates</span>
                    </Link>
                  </li>
                  <li>

                    <Link to="/admin/users" className="waves-effect">
                      <span>List  Users</span>
                    </Link>
                  </li>




                  <li>
                    <Link to="/admin/ListOrganisation" className="waves-effect">
                      <span>List  of organisation</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/admin/ListProjectToValidate" className="waves-effect">
                      <span>Validate new projects</span>
                    </Link>
                  </li>

                  <li>
                    <Link to="/admin/furniture" className="waves-effect">
                      <span>List furniture</span>
                    </Link>
                  </li>

                  <li>
                    <Link to="/admin/tracking" className="waves-effect">
                    
                      <span>Transactions</span>
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
