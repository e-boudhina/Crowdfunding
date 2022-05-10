import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from 'react-router';
import { useDispatch, useSelector } from "react-redux";
import { allorganisation,FollowOrganisation,IsFollowed} from "../../actions/Organisations/OrganisationCrud.actions";
// import SuccessPopup from 'react-success-popup'
import './aaa.css'

// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
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
  const checkFollow=(id)=>{
  console.log(currentUser.id);
  console.log(id);
    dispatch(IsFollowed(currentUser.id,props.organisation._id));

 
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
          <img src={`Uploads/${organisation.Image}`} className='photo' alt="" />
          <div className="causes-heart">
            
            <a href="#" onClick={followOrg} ><i className="far fa-heart" /></a>
         
          </div>

          <div className="causes-heart">
            
            <a onClick={followOrg} ><i class="fas fa-heart"></i></a>
          </div>
          <div className="causes-heart1">

          </div>
        </div>
            {/* <FontAwesomeIcon icon="fas fa-heart" /> */}




        <div className="causes__caption">
          <div className="causes-tag mb-20">
            <a href="/"> {organisation.name}</a>
          </div>
          {/* <h4><a href="fund-details.html"> email{organisation.email}</a></h4> */}
          
          
          <div className="causes-tag mb-20">
          <h4 href="/"> {organisation.adress}</h4>
          </div>
         
        
          <br></br><br></br>



        </div>
      </div>
    </div>

  )
}
export default SingleOranisation