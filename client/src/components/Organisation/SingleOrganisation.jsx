import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from 'react-router';
import { useDispatch, useSelector } from "react-redux";
import { allorganisation,FollowOrganisation} from "../../actions/Organisations/OrganisationCrud.actions";
// import SuccessPopup from 'react-success-popup'


import { Navigate } from "react-router-dom";
function SingleOranisation(props) {
  const dispatch = useDispatch();
  
  console.log(props.organisation);
  const [organisation, setOrganisation] = useState(props.organisation);
  // const [message, setMessage] = useState("");
  const { message } = useSelector(state => state.message);

  const navigate = useNavigate();

  const { user: currentUser } = useSelector((state) => state.auth);

const [status, setStatus] = useState(false)

  if (!currentUser) {
    return <Navigate to="/login" />;
  }
  

  const followOrg=()=>{
  console.log(currentUser.id);
  console.log(organisation._id);
    dispatch(FollowOrganisation(currentUser.id,props.organisation._id));

    setStatus(true);
  // currentUser._id
// props.organisation._id




}

// function unfollowOrg() {
//   dispatch(FollowOrganisation(currentUser._id,props.organisation._id));
// // currentUser._id
// // props.organisation._id




// }




  return (
 
      
      <div className="col-xl-4 col-lg-4 col-md-6">
      <div className="causes white-bg mb-30">
        <div className="causes__img">
        
          {/* <button type="button"   onClick={() => {
                dispatch(RetrieveProject(project._id)); navigate('/ProjectDetails/'+project._id);}}class="btn btn-outline-info btn-rounded" data-mdb-ripple-color="dark" >Info</button> */}
          <img src={`Uploads/${organisation.Image}`} alt="" />
          <div className="causes-heart">
            <a onClick={followOrg} ><i className="far fa-heart" /></a>
            {/* <button onClick={followOrg}><i className="far fa-heart" /></button> */}
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



          {/* <button type="submit" class="btn" onClick={() => props.delete(organisation._id)}>Delete</button>

              <button  className="btn btn-danger btn-sm rounded-0" type="button" data-toggle="tooltip" data-placement="top" title="Delete"><i className="fa fa-trash"></i></button>
              <button  className="btn btn-success btn-sm rounded-0" type="button" data-toggle="tooltip" data-placement="top" title="Delete"><i className="fa fa-trash"></i></button>

<button class="btn btn-black" onClick={() => {
                navigate('/updateOrganisation',{state:{id:organisation._id,image:organisation.Image,name:organisation.name,phone:organisation.phone,fax:organisation.fax,adress:organisation.adress,description:organisation.description,Secteur:organisation.Secteur,email:organisation.email}})  }} type="submit">Upadate</button>
              <button type="button"   onClick={() => {
                 navigate('/organisationDetails',{state:{id:organisation._id,image:organisation.Image,name:organisation.name,phone:organisation.phone,fax:organisation.fax,adress:organisation.adress,description:organisation.description,Secteur:organisation.Secteur,email:organisation.email}})  }}class="btn btn-outline-info btn-rounded" data-mdb-ripple-color="dark" >Info</button> */}

{/* 
<div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex={-1} aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="staticBackdropLabel">Gestion Note</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
            </div>
            <div className="modal-body">
              Note ajouter avec succés pour le produit
              <br /><input type="text" defaultValue />
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-success" data-bs-dismiss="modal">Ok</button>
            </div>
          </div>
        </div>
      </div> */}








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
export default SingleOranisation