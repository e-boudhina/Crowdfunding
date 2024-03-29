import { Navigate } from 'react-router-dom';
import { useDispatch, useSelector  } from "react-redux";
import { useLocation, useNavigate } from 'react-router';

// import { dispatch  } from "react-redux";
import { allOrganisation } from "../../actions/Organisations/OrganisationCrud.actions";
// import  SingleOranisation  from "./SingleOrganisation";
import React, { useState, useEffect } from "react";
import { deleteProject,ProjectsToValidate,ValidateProject } from "../../actions/Projects/ProjectCrud.actions";




function ListProjectToValidate(){
  
  
 // clear message when changing location
 const dispatch = useDispatch();
 const navigate =useNavigate();




 useEffect(() => {
    dispatch(ProjectsToValidate());

 
}, []);
const Ignore=(id)=>{
    dispatch(Ignore(id))
  
  // if (error) {
  //   console.log("Problem with the api");
  // } else {
  //   console.log("good job");
    
  // navigate("/ListProject");
  window.location.reload();
  }

const projects = useSelector((state) => state.projects);
console.log(projects.projects); 




const validate=(id)=>{
    dispatch(ValidateProject(id))
  
  // if (error) {
  //   console.log("Problem with the api");
  // } else {
  //   console.log("good job");
    
  // navigate("/ListProject");
  window.location.reload();
  }


const { user: currentUser } = useSelector((state) => state.auth);
if (!currentUser) {
return <Navigate to="/login" />;
}


return (


    <div className="cart-area pt-120 pb-120">
    <div className="container">
      <div className="row">
        <div className="col-12">
          <form action="#">
            <div className="table-content table-responsive">
              <table className="table">
                <thead>
                  <tr>
                    <th className="product-thumbnail">Image</th>
                    <th className="cart-product-name">Label project</th>
                    <th className="product-price">Budget goal</th>
                    <th className="product-subtotal">Description</th>
                    <th className="product-remove">Ignore</th>
                    <th className="product-remove">Validate</th>
                  </tr>
                </thead>
                <tbody>
                {projects &&
            projects.projects.map((project, index) => (
                  <tr>
                    <td className="product-thumbnail"><a href="#"><img src="assets/img/shop/cart/img1.jpg" alt="" /></a></td>
                    <td className="product-name"><a href="#">{project.labelproject}</a></td>
                    <td className="product-price"><span className="amount">{project.fundneeded}</span></td>
                  
                    <td className="product-name"><a href="#">{project.projectdescriptiob}</a></td>
                  
                    <td className="product-remove"><a onClick={()=>{Ignore(project._id)}} className="btn btn-danger btn-sm" >Ignore</a></td>
                    <td className="product-remove"><a onClick={()=>{validate(project._id)}} className="btn btn-primary btn-sm" >Validate</a></td>
                    {/* <td className="product-remove"><a onClick={()=>{validate(project._id)}}><span className="material-icons"></span></a></td> */}

                
                  </tr>
                  
            ))}
                </tbody>

              </table>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>

);

}




 export default ListProjectToValidate;