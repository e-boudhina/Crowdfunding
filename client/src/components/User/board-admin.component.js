import React, { useState , useEffect  } from "react";
import { Navigate  } from 'react-router-dom';
import { useDispatch, useSelector  } from "react-redux";
import { useNavigate  } from "react-router-dom";
import Sidebar from "./Sidebar/Sidebar";
const Dashboardadmin = (props) => {
  const navigate = useNavigate();

  const navigateToEdit = () => navigate("/register"); //eg.history.push('/login');
  //const dispatch = useDispatch();
 
 const { user: currentUser } = useSelector((state) => state.auth);
 const { message } = useSelector((state) => state.message);
  const { infos: currentInfos } = useSelector((state) => state.auth);
  const { isLoggedIn: IsLoggedIn } = useSelector((state) => state.auth);




useEffect(() => {
    if  ((!currentUser) || (!currentUser.roles.includes("ROLE_ADMIN"))){
        navigate("/")
    
 }

 },[currentUser])  //dep hass"hom zeydin
  

    /*if (!currentUser || !currentInfos) {
        navigate("/login");
    } else {
     console.log(" Entered profile (from profile:33) ");
    } */

  return (<>
  <Sidebar></Sidebar>admin</>
  );
};
export default Dashboardadmin;