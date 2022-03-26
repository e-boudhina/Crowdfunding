import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from 'react-router';
import { useDispatch, useSelector } from "react-redux";
import { allProjects, RetrieveProject } from "../../actions/Projects/ProjectCrud.actions";


import { Navigate } from "react-router-dom";
function SingleProject(props) {
  const dispatch = useDispatch();
  
  console.log(props.project);
  const [project, setProject] = useState(props.project);

  const navigate = useNavigate();

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
<div>

<button type="submit" class="btn" onClick={() => props.delete(project._id)}>Delete</button>
              {/* <button  className="btn btn-danger btn-sm rounded-0" type="button" data-toggle="tooltip" data-placement="top" title="Delete"><i className="fa fa-trash"></i></button> */}
              {/* <button  className="btn btn-success btn-sm rounded-0" type="button" data-toggle="tooltip" data-placement="top" title="Delete"><i className="fa fa-trash"></i></button> */}

<button class="btn btn-black" onClick={() => {
                navigate('/updateProject',{state:{id:project._id,labelproject:project.labelproject,fundcollected:project.fundcollected,fundneeded:project.fundneeded,projectdescriptiob:project.projectdescriptiob,image:project.Image}})  }} type="submit">Upadate</button>
              <button type="button"   onClick={() => {
                 navigate('/ProjectDetails',{state:{id:project._id,labelproject:project.labelproject,fundcollected:project.fundcollected,fundneeded:project.fundneeded,projectdescriptiob:project.projectdescriptiob,image:project.Image}});}}class="btn btn-outline-info btn-rounded" data-mdb-ripple-color="dark" >Info</button>


</div>
            </div>
          </div>
        </div>
      </div>
    </div>

  )
}
export default SingleProject