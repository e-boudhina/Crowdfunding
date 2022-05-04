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
        <section className="causes-area grey-bg pt-120 pb-120">
        <div className="container">

        
            <div className="row align-items-center">
                <div className="col-xl-12">
                    <div className="section-title text-center mb-60">
                        <p><span /> List of organisations</p>
                        <h1>You can donate to a project whenever you like</h1>
                    </div>
                </div>

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
            <div className="row mt-30">
                <div className="col-xl-12">
                    <div className="section-link text-center">
                        <a className="btn-border" href="#">more projects</a>
                    </div>
                </div>
            </div>
        </div>
        
    </section>

      
    )

}



// export default ListProjectsOfUser;