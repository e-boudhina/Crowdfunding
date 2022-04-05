import { Navigate } from 'react-router-dom';
import { useDispatch, useSelector  } from "react-redux";
import { useLocation, useNavigate } from 'react-router';

// import { dispatch  } from "react-redux";
import { allOrganisation } from "../../actions/Organisations/OrganisationCrud.actions";
import  SingleOranisation  from "./SingleOrganisation";
import React, { useState, useEffect } from "react";
import { deleteProject } from "../../actions/Projects/ProjectCrud.actions";




function ListOrganisationForAdmin(){
  
  
 // clear message when changing location
 const dispatch = useDispatch();
 const navigate =useNavigate();




 useEffect(() => {
    dispatch(allOrganisation());

 
}, []);
const organisations = useSelector((state) => state.organisations);
console.log(organisations.Organisations); 







const { user: currentUser } = useSelector((state) => state.auth);
if (!currentUser) {
return <Navigate to="/login" />;
}


return (

<div className="card-body">
 <h4 className="card-title mb-4">List of organisation</h4>
 <div className="table-responsive">
   <table className="table table-hover table-centered table-nowrap mb-0">
     <thead>
       <tr>
         <th scope="col">(#) Id</th>
         <th scope="col">Name of the organisation</th>
         <th scope="col">Date</th>
         <th scope="col">Amount</th>
         <th scope="col" colSpan={2}>Email</th>
         {/* <th scope="col" colSpan={2}>List of projects</th> */}
       </tr>
     </thead>
     <tbody>
    
       {organisations &&
            organisations.Organisations.map((organisation, index) => (
       <tr>
         <th scope="row">{organisation._id}</th>
         <td>
           <div>
             <img src={`Uploads/${organisation.Image}`} alt="" className="avatar-xs rounded-circle me-2" /> {organisation.name}
           </div>
         </td>
         <td>19/1/2019</td>
         <td>$120</td>
         <td><span className="badge bg-success">{organisation.email}</span></td>
         <td>
           <div>
             <a href="#" className="btn btn-primary btn-sm">
                 
                 view Projects</a>
           </div>
         </td>
       </tr>
      
      ))}
       
       
     </tbody>
   </table>
 </div>
</div>






)

}




 export default ListOrganisationForAdmin;