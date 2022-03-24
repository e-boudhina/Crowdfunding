import { Navigate } from 'react-router-dom';
import { useDispatch, useSelector  } from "react-redux";
import { useLocation, useNavigate } from 'react-router';

// import { dispatch  } from "react-redux";
import { allOrganisation } from "../../actions/Organisations/OrganisationCrud.actions";
import  SingleOranisation  from "./SingleOranisation";
import React, { useState, useEffect } from "react";
import { deleteProject } from "../../actions/Projects/ProjectCrud.actions";




function ListOrganisation(){
  
  
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



    // useEffect(() => {
    //   history.listen((location) => {
    //     dispatch(clearMessage()); // clear message when changing location
    //   });
    // }, [dispatch]);
    const organisations = useSelector((state) => state.organisations);
    console.log(organisations); 
    useEffect(() => {
      dispatch(allOrganisation());
    }, []);
    const { user: currentUser } = useSelector((state) => state.auth);
  if (!currentUser) {
    return <Navigate to="/login" />;
  }
    // console.log(projects.projects[0]._id); 
    return (
      
      <div className="tab-content" id="myTabContent">
          <h3>
          <strong>{currentUser.firstName}</strong> Profile
        </h3>
      <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
        <div className="row">
          {
organisations.organisations.map((element)=>{
  console.log(element);
  // <SingleProject/>

  return(

    
    <SingleOranisation organisation={element} ></SingleOranisation>
    // <SingleOranisation delete={deletee} organisation={element} ></SingleOranisation>
  )  
  }
    )
  }

</div>
        </div>
 
      </div>
      
    )

}



export default ListOrganisation;