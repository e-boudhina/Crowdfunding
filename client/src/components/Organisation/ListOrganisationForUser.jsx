import { Navigate } from 'react-router-dom';
import { useDispatch, useSelector  } from "react-redux";
import { useLocation, useNavigate } from 'react-router';

// import { dispatch  } from "react-redux";
import { allOrganisation } from "../../actions/Organisations/OrganisationCrud.actions";
import { allOrganisationForUser } from "../../actions/Organisations/OrganisationCrud.actions";
import  SingleOranisationForUser  from "./SingleOrganisationForUser";
import React, { useState, useEffect } from "react";
import { deleteOrganization } from "../../actions/Organisations/OrganisationCrud.actions";
import sami  from "../../services/Organisations/organisation.service";

import {toast} from "react-toastify";





export function ListOrganisationForUser(){
  
  
 // clear message when changing location
 const dispatch = useDispatch();
 const navigate =useNavigate();

// const deletee=(id)=>{
//   dispatch(deleteProject(id))

// // if (error) {
// //   console.log("Problem with the api");
// // } else {
// //   console.log("good job");
  
// // navigate("/ListOrganisation");
// window.location.reload();
// }
const organisations = useSelector((state) => state.organisations);
const { user: currentUser } = useSelector((state) => state.auth);
// if (!currentUser) {
//   return <Navigate to="/login" />;
// }
const deletee=(id)=>{
  
  
  // sami(id)
// if (error) {
//   console.log("Problem with the api");
// } else {
//   console.log("good job");
  
// navigate("/ListProject");
window.location.reload();
}
    // useEffect(() => {
    //   history.listen((location) => {
    //     dispatch(clearMessage()); // clear message when changing location
    //   });
    // }, [dispatch]);
   
    console.log(organisations); 
    

useEffect(() => {
  if (currentUser) {
  dispatch(allOrganisationForUser(currentUser.id));
  } else {
    navigate("/login");
  }

}, [currentUser])

  
  
    // console.log(projects.projects[0]._id); 
    return (
      
      <div className="tab-content" id="myTabContent">

{/* 
<h3>
         List of organisation:
        </h3>
        <div className="col-lg-8">
        <div className="widget mb-40">
            <div className="widget-title-box mb-30">
              <span className="animate-border" />
              <h3 className="widget-title">Search organisation</h3>

              
            </div>
            <form className="search-form">
              <input type="text" placeholder="Search" />
              <button type="submit"><i className="fas fa-search" /></button>
            </form>
          </div>
        </div> */}
          <h3>
          <strong>My organisations :</strong>
        </h3>


        
      <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
        <div className="row">
          {
organisations.Organisations.map((element)=>{
  console.log(element);
  // <SingleProject/><button type="button"   onClick={() => {navigate('/addProject',{state:{id:organisation._id}})}} className="btn btn-outline-info btn-rounded" data-mdb-ripple-color="dark" >AddProject</button>

  return[
    <>
    <SingleOranisationForUser delete={deletee} organisation={element} >       

    </SingleOranisationForUser>
    </>
  ]; 
  }
    )
  }

</div>
        </div>
 
      </div>
      
    )

}



export default ListOrganisationForUser;