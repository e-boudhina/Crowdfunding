import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from 'react-router';
import { useDispatch, useSelector } from "react-redux";
import { allorganisation} from "../../actions/Organisations/OrganisationCrud.actions";
// import styled from 'styled-components';
import './aaa.css'



import { Navigate } from "react-router-dom";
function SingleOranisationForUser(props) {
  const dispatch = useDispatch();
  
  console.log(props.organisation);
  const [organisation, setOrganisation] = useState(props.organisation);

  const navigate = useNavigate();
 

  return (
    <div className="col-xl-4 col-lg-4 col-md-6">
      {/* <div className="causes white-bg mb-30"> */}
        <div className="causes__img">
          {/* <button type="button"   onClick={() => {
                dispatch(RetrieveProject(project._id)); navigate('/ProjectDetails/'+project._id);}}class="btn btn-outline-info btn-rounded" data-mdb-ripple-color="dark" >Info</button> */}
          <a onClick={()=>
          navigate('/organisationDetails',{state:{id:organisation._id,image:organisation.Image,name:organisation.name,phone:organisation.phone,fax:organisation.fax,adress:organisation.adress,description:organisation.description,Secteur:organisation.Secteur,ownerName:organisation.ownerName,email:organisation.email}}) }> <img src={`Uploads/${organisation.Image}`} className='photo' alt="" /></a>
          
        </div>




        <div className="causes__caption">
          <div className="causes-tag mb-20">
            <a onClick={()=>
          navigate('/organisationDetails',{state:{id:organisation._id,image:organisation.Image,name:organisation.name,phone:organisation.phone,fax:organisation.fax,adress:organisation.adress,description:organisation.description,Secteur:organisation.Secteur,email:organisation.email,ownerName:organisation.ownerName}}) }> {organisation.name}</a>
          </div>
          {/* <h4><a href="fund-details.html"> email{organisation.email}</a></h4> */}
          
          
          <div className="causes-tag mb-20">
          Adress : <h4 href="/"> {organisation.adress}</h4>
          </div>
         
         
          <p>{organisation.description}</p>
          



<div style={{width: '500px',display:'inline-block',width:'130px',textAlign: 'center'}}>


&nbsp;<i className="fa fa-trash " style={{fontSize: '48px',color: 'red',cursor: 'pointer'}}  onClick={() => props.delete(organisation._id)}></i>
&nbsp; <i className="fa fa-edit" style={{fontSize: '48px',color: '#2c9646',cursor: 'pointer'}}  onClick={() => {
  navigate('/updateOrganisation',{state:{id:organisation._id,image:organisation.Image,name:organisation.name,phone:organisation.phone,fax:organisation.fax,adress:organisation.adress,description:organisation.description,Secteur:organisation.Secteur,email:organisation.email}})  }} ></i>
             
             <i className="fa fa-info" onClick={() => {
   navigate('/organisationDetails',{state:{id:organisation._id,image:organisation.Image,name:organisation.name,phone:organisation.phone,fax:organisation.fax,adress:organisation.adress,description:organisation.description,Secteur:organisation.Secteur,email:organisation.email,ownerName:organisation.ownerName}})  }} style={{fontSize: '48px',color:'#3981f3',cursor: 'pointer'}} ></i>

</div>














              {/* <button  className="btn btn-danger btn-sm rounded-0" type="button" data-toggle="tooltip" data-placement="top" title="Delete"><i className="fa fa-trash"></i></button> */}
              {/* <button  className="btn btn-success btn-sm rounded-0" type="button" data-toggle="tooltip" data-placement="top" title="Delete"><i className="fa fa-trash"></i></button> */}
{/* 
<button class="btn btn-black" onClick={() => {
                navigate('/updateOrganisation/'+organisation._id);
              }} type="submit">Upadate</button>
              <button type="button"   onClick={() => {
                dispatch(Retrieveorganisation(organisation._id)); navigate('/organisationDetails/'+organisation._id);}}class="btn btn-outline-info btn-rounded" data-mdb-ripple-color="dark" >Info</button>
 */}




          
{/*           
          <div className="causes-progress">
            <div className="progress">
              <div className="progress-bar w-50 " role="progressbar" aria-valuenow={60} aria-valuemin={0} aria-valuemax={100} />
            </div>

          </div> */}
        </div>
      </div>
    // </div>

  )
}



export default SingleOranisationForUser