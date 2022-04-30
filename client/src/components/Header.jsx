import React, { useEffect, useState } from "react";
import { logout } from "../actions/auth";
import { useDispatch, useSelector } from "react-redux";
import { Link , useNavigate ,Outlet} from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import getAllUsers from "../services/user.service";
import CircularProgress from "@material-ui/core/CircularProgress";
import { resetProgress } from "../actions/Learning/Learning";
function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user: currentUser } = useSelector((state) => state.auth);
  const [showLogin, setShowLogin] = useState(false);

  //------------------- AUTOCOMPLETE CODE HEADER
  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState([]);
  const loading = open && options.length === 0;

  const onChangeHandle = async (value) => {
    // use the changed value to make request and then use the result. Which
    console.log(value);
    const response = await fetch(
      "http://localhost:5000/api/user/searchusers/" + value
    );
    const countries = await response.json();
    console.log("countries : " + countries);
    setOptions(Object.keys(countries).map((key) => countries[key]));
    console.log("options " + options);
  };
//---------------------------------AUTOCOMPLETE CODE HEADER ENDS HERE

  useEffect(() => {
    if (currentUser) {
      setShowLogin(true);
    } else {
      setShowLogin(false);
    }
    if (!open) {
      setOptions([]);
    }
  }, [currentUser, open]);

  const logOut = () => {
    dispatch(logout());
  };
const goDashboard = () => {
  dispatch(resetProgress());
//  navigate("/admin");
}
  return (
    <>
    <div>
      <meta charSet="utf-8" />
      <meta httpEquiv="x-ua-compatible" content="ie=edge" />
      <title>YoungBucks </title>
      <meta name="description" content />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="manifest" href="site.webmanifest" />
      <link
        rel="shortcut icon"
        type="image/x-icon"
        href="../assets/img/favicon.png"
      />
      {/* Place favicon.png in the root directory */}
      {/* CSS here */}
      <link rel="stylesheet" href="../assets/css/bootstrap.min.css" />
      <link rel="stylesheet" href="../assets/css/owl.carousel.min.css" />
      <link rel="stylesheet" href="../assets/css/animate.min.css" />
      <link rel="stylesheet" href="../assets/css/magnific-popup.css" />
      <link rel="stylesheet" href="../assets/css/fontawesome-all.min.css" />
      <link rel="stylesheet" href="../assets/css/flaticon.css" />
      <link rel="stylesheet" href="../assets/css/meanmenu.css" />
      <link rel="stylesheet" href="../assets/css/slick.css" />
      <link rel="stylesheet" href="../assets/css/style.css" />
      <link rel="stylesheet" href="../assets/css/responsive.css" />
      <div id="preloader" style={{ display: "none" }}>
        <div className="preloader">
          <span />
          <span />
        </div>
      </div>
      <div id="preloader" style={{ display: "none" }}>
        <div className="preloader">
          <span />
          <span />
        </div>
      </div>

      <header id="sticky-header" className="header header-transparent mt-60">
        <div className="container">
          <div className="header-box white-bg pl-50 pr-50">
            <div className="row">
              <div className="col-xl-2 col-lg-2 col-md-3 col-5 d-flex align-items-center">
                <div className="header__logo">
                  <a href="index.html">
                    <img src="../assets/img/logo/logo.png" alt="" />
                  </a>
                </div>
              </div>
              <div className="col-xl-10 col-lg-10 col-7 col-md-9">
                <div className="header__menu f-right">
                  <nav id="mobile-menu" style={{ display: "block" }}>
                    <ul>
                     
                      <li>
                        <a href="progress.html">Explore</a>
                      </li>
                     
                      <li>
                            {" "}
                            <Link to={"/certificates"} className="nav-link">
                              {" "}
                              Courses {" "}
                            </Link>{" "}
                          </li>
                   {   
                   
                    (currentUser)?
                       (currentUser.roles.includes("ROLE_ADMIN")) ?
                          <li>
                            {" "}
                            <Link to={"/admin"}   onClick={goDashboard} className="nav-link">
                              {" "}
                              ADMIN DASHBOARD{" "}
                            </Link>{" "}
                          </li>
                          :
                          <></>
                    :
                    <></>
                          }
                      {currentUser ? (
                        <>
                          <li>
                            {" "}
                            <Link to={"/profile"} className="nav-link">
                              {" "}
                              Profile{" "}
                            </Link>{" "}
                          </li>
                            <li>
                            {" "}
                            <Link to={"/ListOrganisation"} className="nav-link">
                              {" "}
                              Organisations{" "}
                            </Link>{" "}
                          </li>
                        
                          <li>
                            {" "}
                            <Link
                              to={"/login"}
                              className="nav-link"
                              onClick={logOut}>
                              {" "}
                              Logout{" "}
                            </Link>{" "}
                          </li>
                        </>
                      ) : (
                        <li>
                          {" "}
                          <Link to={"/login"} className="nav-link">
                            {" "}
                            Login{" "}
                          </Link>{" "}
                        </li>
                      )}
                      <li>
                        <Autocomplete
                      
                          id="asynchronous-demo"
                          style={{ width: 300 }}
                          open={open}
                          onOpen={() => {
                            setOpen(true);
                          }}
                          onClose={() => {
                            setOpen(false);
                          }}
                          getOptionSelected={(option, value) =>
                            option.username === value.username
                          }
                          getOptionLabel={(option) =>
                            option.firstName + " " + option.lastName
                          }
                          options={options}
                          loading={loading}
                          renderOption={(option) => (
                            <React.Fragment>
                              <span
                                style={{ cursor: "pointer" }}
                                onClick={() => {
                                //window.location.href = `/u/${option.username}`;
                           navigate(`/u/${option.username}`)     
                           console.log(option);
                                }}>
                                {option.firstName}  {option.lastName} 
                              </span>
                            </React.Fragment>
                          )}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              label="Asynchronous"
                              variant="outlined"
                              onChange={(ev) => {
                                if (
                                  ev.target.value !== "" ||
                                  ev.target.value !== null
                                ) {
                                  onChangeHandle(ev.target.value);
                                }
                              }}
                              InputProps={{
                                ...params.InputProps,
                                endAdornment: (
                                  <React.Fragment>
                                    {loading ? (
                                      <CircularProgress
                                        color="inherit"
                                        size={20}
                                      />
                                    ) : null}
                                    {params.InputProps.endAdornment}
                                  </React.Fragment>
                                ),
                              }}
                            />
                          )}
                        />
                      </li>
                    </ul>
                  </nav>
                </div>
              </div>
              <div className="col-12">
                <div style={{ marginLeft: "40%", marginTop: "60px" }}></div>
                <div className="mobile-menu" />
              </div>
            </div>
          </div>
        </div>
      </header>
      <section
        className="page-title-area pt-140 pb-140"
        data-background={
          "url(" + process.env.PUBLIC_URL + "/assets/img/bg/breadcumb.jpg)"
        }
        style={{
          backgroundImage:
            "url(" + process.env.PUBLIC_URL + "/assets/img/bg/breadcumb.jpg)",
        }}></section>
    </div>
  <Outlet/>
    </>
  );
}
export default Header;
