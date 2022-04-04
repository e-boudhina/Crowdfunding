import { Navigate } from 'react-router-dom';
import { useDispatch, useSelector  } from "react-redux";
import { useLocation, useNavigate } from 'react-router';

// import { dispatch  } from "react-redux";
import { allOrganisation } from "../../actions/Organisations/OrganisationCrud.actions";
import { allOrganisationForUser } from "../../actions/Organisations/OrganisationCrud.actions";
import  SingleOranisationForUser  from "./SingleOrganisationForUser";
import React, { useState, useEffect } from "react";
import { deleteOrganization } from "../../actions/Organisations/OrganisationCrud.actions";






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
  dispatch(deleteOrganization(id))

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
  dispatch(allOrganisationForUser(currentUser.id));
  

}, [currentUser.id])

  
  
    // console.log(projects.projects[0]._id); 
    return (
      
      <div className="tab-content" id="myTabContent">
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