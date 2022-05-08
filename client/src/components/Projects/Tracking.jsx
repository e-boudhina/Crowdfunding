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
                    <th className="product-thumbnail">User</th>
                    <th className="cart-product-name">Project label</th>
                    <th className="product-price">Donation</th>
                    <th className="product-price">Type of operation</th>
                    <th className="product-subtotal">Crypto adress</th>
                    <th className="product-remove">Mail adress</th>
                    
                  </tr>
                </thead>
                <tbody>
           
                  <tr>
                  
                    <td className="product-name"><a href="#">Sami123456</a></td>
                    <td className="product-name"><a href="#">dzdz</a></td>
                    <td className="product-price"><span className="amount">128,2575</span></td>
                  
                    <td className="product-name"><a href="#">Crypto payment</a></td>
                    <td className="product-name"><a href="#">0x9907a0cf64ec9fbf6ed8fd4971090de88222a9ac</a></td>
                    <td className="product-name"><a href="#">-------</a></td>
                  
                   
                
                  </tr>
                  <tr>
                  
                    <td className="product-name"><a href="#">Sami123456</a></td>
                    <td className="product-name"><a href="#">hkj</a></td>
                    <td className="product-price"><span className="amount">100</span></td>
                  
                    <td className="product-name"><a href="#">Stripe payment</a></td>
                    <td className="product-name"><a href="#">-------</a></td>
                    <td className="product-name"><a href="#">arij.zitouni@gmail.com</a></td>
                  
                   
                
                  </tr>
                  
      
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