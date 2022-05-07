import { Navigate } from 'react-router-dom';
import { useDispatch, useSelector  } from "react-redux";
import { useLocation, useNavigate } from 'react-router';

// import { dispatch  } from "react-redux";
import { allProjects,RetrieveProjectsByOrg } from "../../actions/Projects/ProjectCrud.actions";
import  SingleProject  from "./SingleProjectForUser";
import React, { useState, useEffect } from "react";
import { deleteProject } from "../../actions/Projects/ProjectCrud.actions";
import {toast} from "react-toastify";




function ListProject(){
  
  
 // clear message when changing location
 const dispatch = useDispatch();
 const navigate =useNavigate();
 const location = useLocation();

 const ownerName=location.state.ownerName

const deletee=(id)=>{
 
  deleteProject(id).then(
    (res)=> {
        toast.success(res.data.message)
        // console.log(res.data.message)
    })
    .catch((error)=>
        console.log(error)
    )
  
// if (error) {
//   console.log("Problem with the api");
// } else {
//   console.log("good job");
  
// navigate("/ListProject");
window.location.reload();
}



    // useEffect(() => {
    //   history.listen((location) => {
    //     dispatch(clearMessage()); // clear message when changing location
    //   });
    // }, [dispatch]);
    
    useEffect(() => {
      dispatch(RetrieveProjectsByOrg(location.state.id));
    }, []);
    const projects = useSelector((state) => state.projects);
    console.log(projects); 
    const { user: currentUser } = useSelector((state) => state.auth);
  if (!currentUser) {
    return <Navigate to="/login" />;
  }
    // console.log(projects.projects[0]._id); 
    return (
        <body>
      <div className="container">
      <div>
      <br></br>
      <div className="tab-content" id="myTabContent">
          {/* <h3>
          <strong>{currentUser.firstName}</strong> Profile
        </h3> */}


        <h3>
         List of Projects:
        </h3>
        <div className="col-lg-8">
        <div className="widget mb-40">
            <div className="widget-title-box mb-30">
              <span className="animate-border" />
              <h3 className="widget-title">Search Projects</h3>
            </div>
            <form className="search-form">
              <input type="text" placeholder="Search" />
              <button type="submit"><i className="fas fa-search" /></button>
            </form>
          </div>
        </div>
        
      <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
        <div className="row">

        <div className="col-11">
           <div className="text-right my-2 pr-1">
             <i style={{fontSize: '2rem', cursor: 'pointer', color: '#4bb543'}} onClick={() => {navigate('/addProject',{state:{id:location.state.id}})}} className="fas fa-plus-circle mx-auto" />
           </div>
         </div>
          {
projects.projects.map((element)=>{
  
  console.log(element);
  // <SingleProject/>

  return(

    (element.status===1)?
          <SingleProject delete={deletee} project={element} owner={ownerName}></SingleProject>
          : <></>
    
    )  
  }
    )
  }

  

</div>
        </div>
 </div>
      </div>
      
      </div>
      </body>
    )

}



export default ListProject;