import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from 'react-router';
import { useDispatch, useSelector } from "react-redux";
import { allorganisation} from "../../actions/Organisations/OrganisationCrud.actions";


import { Navigate } from "react-router-dom";
function SingleOranisationForUser(props) {
  const dispatch = useDispatch();
  
  console.log(props.organisation);
  const [organisation, setOrganisation] = useState(props.organisation);

  const navigate = useNavigate();
  

  return (
    <div className="col-xl-4 col-lg-4 col-md-6">
      <div className="causes white-bg mb-30">
        <div className="causes__img">
          {/* <button type="button"   onClick={() => {
                dispatch(RetrieveProject(project._id)); navigate('/ProjectDetails/'+project._id);}}class="btn btn-outline-info btn-rounded" data-mdb-ripple-color="dark" >Info</button> */}
          <img src={`Uploads/${organisation.Image}`} alt="" />
          <div className="causes-heart">
            <a href="#"><i className="far fa-heart" /></a>
          </div>
          <div className="causes-heart1">

          </div>
        </div>




        <div className="causes__caption">
          <div className="causes-tag mb-20">
            <a href="/"> {organisation.name}</a>
          </div>
          {/* <h4><a href="fund-details.html"> email{organisation.email}</a></h4> */}
          
          
          <div className="causes-tag mb-20">
          Adress : <h4 href="/"> {organisation.adress}</h4>
          </div>
         
         
          <p>{organisation.description}</p>
          <br></br><br></br>













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
    </div>

  )
}
export default SingleOranisationForUser