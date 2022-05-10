import { Navigate } from 'react-router-dom';
import { useDispatch, useSelector  } from "react-redux";
import { useLocation, useNavigate } from 'react-router';

// import { dispatch  } from "react-redux";
import { allOrganisation } from "../../actions/Organisations/OrganisationCrud.actions";
// import  SingleOranisation  from "./SingleOrganisation";
import React, { useState, useEffect } from "react";
import { tracking } from "../../actions/Projects/ProjectCrud.actions";




function ListProjectToValidate(){
  
  
 // clear message when changing location
 const dispatch = useDispatch();
 const navigate =useNavigate();




 useEffect(() => {
    dispatch(tracking());

 
}, []);


const projects = useSelector((state) => state.projects);
console.log(projects); 
console.log(projects.donations); 





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
                    <th className="product-thumbnail">User id </th>
                    <th className="cart-product-name">Project id</th>
                    <th className="product-price">Donation</th>
                    <th className="product-price">Type of operation</th>
                    <th className="product-subtotal">Crypto adress</th>
                    <th className="product-remove">Mail adress</th>
                    
                  </tr>
                </thead>
                <tbody>
                {
projects.donations.map((element)=>{
  
  console.log(element);
  // <SingleProject/>

  return(

(element.adresseCrypto)?
          <tr>
                  
          <td className="product-name"><a href="#">{element.user}</a></td>
          <td className="product-name"><a href="#">{element.project}</a></td>
         <td className="product-price"><span className="amount">{element.money}</span></td>
       
         <td className="product-name"><a href="#">{element.operation} payment</a></td>
         <td className="product-name"><a href="#">{element.adresseCrypto}</a></td>
         <td className="product-name"><a href="#">-------</a></td>
       
        
     
       </tr>

       :


       <tr>
                  
       <td className="product-name"><a href="#">{element.user}</a></td>
       <td className="product-name"><a href="#">{element.project}</a></td>
      <td className="product-price"><span className="amount">{element.money}</span></td>
    
      <td className="product-name"><a href="#">{element.operation} payment</a></td>
      <td className="product-name"><a href="#">-------</a></td>
      <td className="product-name"><a href="#">{element.adressemail}</a></td>
    
     
  
    </tr>
    )  
  }
    )
  }

                 
             
                  
      
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