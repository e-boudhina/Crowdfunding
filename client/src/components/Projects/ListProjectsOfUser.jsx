import { Navigate } from 'react-router-dom';
import { useDispatch, useSelector  } from "react-redux";
import { useLocation, useNavigate } from 'react-router';

// import { dispatch  } from "react-redux";
import { allProjects,RetrieveProjectsByOrg } from "../../actions/Projects/ProjectCrud.actions";
import  SingleProject  from "./SingleProjectForUser";
import React, { useState, useEffect } from "react";
import { deleteProject } from "../../actions/Projects/ProjectCrud.actions";
import  SingleProjectForUser  from "./SingleProjectForUser";




export default function ListProjectsOfUser(){
  
  

 const dispatch = useDispatch();
 const navigate =useNavigate();
 
    useEffect(() => {
      dispatch(allProjects());
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

          {
projects.projects.map((element)=>{
  
  console.log(element);
  // <SingleProject/>

  return(

    (element.status===1)?
          <SingleProjectForUser project={element}></SingleProjectForUser>
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



// export default ListProjectsOfUser;