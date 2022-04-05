import { Navigate } from 'react-router-dom';
import { useDispatch, useSelector  } from "react-redux";
import { useLocation, useNavigate } from 'react-router';
import { history } from "../../helpers/history";
import { clearMessage } from "../../actions/message";

// import { dispatch  } from "react-redux";
import { allOrganisation } from "../../actions/Organisations/OrganisationCrud.actions";
import  SingleOranisation  from "./SingleOrganisation";
import React, { useState, useEffect } from "react";
import { deleteProject } from "../../actions/Projects/ProjectCrud.actions";
// import { truncateSync } from 'fs';




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


const { message } = useSelector(state => state.message);



    // useEffect(() => {
    //   history.listen((location) => {
    //     dispatch(clearMessage()); // clear message when changing location
    //   });
    // }, [dispatch]);

    useEffect(() => {
        dispatch(allOrganisation());
    
     
    }, []);
    const organisations = useSelector((state) => state.organisations);
    console.log(organisations.Organisations); 
    

    const [status, setStatus] = useState(false)

    useEffect(() => {
      history.listen((location) => {
        dispatch(clearMessage()); // clear message when changing location
      });
    }, [dispatch]);
     
    const sami=()=>{
        if(message.includes("You")){
          console.log(message);
          console.log(true);
          setStatus(true) 
        }
    }
 


    const f=() =>{
     if( message.includes("You")){
      console.log("YOu already followed that organisation");
     setStatus(true)

     
     }
     
    }


    const { user: currentUser } = useSelector((state) => state.auth);
  if (!currentUser) {
    return <Navigate to="/login" />;
  }
    // console.log(projects.projects[0]._id); 
    return (
      <div className="container">

              
          <div>
             



             {f}
    { status ?(
      <div className="form-group">
      <div className="alert alert-danger" role="alert">
      {message}
      </div>
      </div>
      ):(
        <div className="form-group">
        <div className="alert alert-success" role="alert">
        {message}
        </div>
        </div>
        )}
      </div>
      <div className="tab-content" id="myTabContent" style={{display: 'center'}}>
          <h3>
        </h3>
      <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
        <div className="row">
          {
organisations.Organisations.map((element)=>{
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
      </div>
      
    )

}



export default ListOrganisation;