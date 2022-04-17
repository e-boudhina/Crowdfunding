import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from "react-redux";
import { allProjects, RetrieveProject } from "../../actions/Projects/ProjectCrud.actions";

import { Navigate, useLocation } from 'react-router-dom';

function SingleProject(props) {
  const dispatch = useDispatch();
  const location = useLocation();

  
  console.log(props.project);
  const [project, setProject] = useState(props.project);

  const navigate = useNavigate();
  const { user: currentUser } = useSelector((state) => state.auth);

  return (


   




    <div className="col-xl-4 col-lg-4 col-md-6">
      <div className="causes white-bg mb-30">
        <div className="causes__img">
          <img src={`Uploads/${project.Image}`} alt="" />
          <div className="causes-heart">
            <a href="#"><i className="far fa-heart" /></a>
          </div>
          <div className="causes-heart1">

          </div>
        </div>




        <div className="causes__caption">
          <div className="causes-tag mb-20">
            <a href="/"> {project.labelproject}</a>
          </div>
          <h4><a href="fund-details.html"> {project.projectdescriptiob}</a></h4>
          <div className="causes-progress">
            <div className="progress">
              <div className="progress-bar w-50 " role="progressbar" aria-valuenow={60} aria-valuemin={0} aria-valuemax={100} />
            </div>
            <div className="causes-count mt-15 fix">
              <div className="count-number f-left text-left">
                <h2>$  {project.fundcollected}</h2>
                <span>Pledged</span>
              </div>
              <div className="count-number f-right text-right">
                <h2>$  {project.fundneeded}</h2>
                <span>Target</span>
              </div>

<br></br><br></br>


{
         (currentUser.roles.username===props.owner.ownerName) ?
<div>

&nbsp;<i className="fa fa-trash" onClick={() => props.delete(project._id)} style={{fontSize: '48px', color: 'red',cursor: 'pointer'}}>&nbsp;</i>&nbsp;
&nbsp; <i className="fa fa-edit" style={{fontSize: '48px',color: '#2c9646',cursor: 'pointer'}}  onClick={() => {
                navigate('/updateProject',{state:{id:project._id,labelproject:project.labelproject,fundcollected:project.fundcollected,fundneeded:project.fundneeded,projectdescriptiob:project.projectdescriptiob,image:project.Image}})  }} ></i>
             &nbsp; 
             &nbsp; 
             <i className="fa fa-info"  style={{fontSize: '48px',color:'#3981f3',cursor: 'pointer'}}  onClick={() => {
                 navigate('/ProjectDetails',{state:{id:project._id,labelproject:project.labelproject,fundcollected:project.fundcollected,fundneeded:project.fundneeded,projectdescriptiob:project.projectdescriptiob,image:project.Image}});}}> </i>
              

</div>
  :
  <></>

  
              }
              
            </div>
          </div>
        </div>
      </div>
    </div>

  )
}
export default SingleProject