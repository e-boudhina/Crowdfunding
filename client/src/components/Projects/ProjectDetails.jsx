import React, { useState, useRef, useEffect } from "react";
import { Navigate, useLocation } from 'react-router-dom';
import Form from "react-validation/build/form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router';
import { allProjects, RetrieveProject } from "../../actions/Projects/ProjectCrud.actions";
import { Link, useParams } from 'react-router-dom';

function ProjectDetails(props) {

  const location = useLocation();
  console.log(location.state.image)

  const dispatch = useDispatch();


  // const project = useSelector(state => state.projects);

  // console.log(project.project);

  //     const project=projects.filter((item) => item._id === id);
  // console.log(project);

  // const [labelproject, setLabelproject] = useState(project.project[0].labelproject);
  // const [projectdescriptiob, setProjectdescriptiob] = useState(project.project[0].projectdescriptiob);
  // const [fundneeded, setFundneeded] = useState(project.project[0].fundneeded);
  // const [fundcollected, setFundcollected] = useState(project.project[0].fundcollected);
  // const [image, setImage] = useState(project.project[0].Image);

  const [labelproject, setLabelproject] = useState(location.state.labelproject);
  const [projectdescriptiob, setProjectdescriptiob] = useState(location.state.projectdescriptiob);
  const [fundneeded, setFundneeded] = useState(location.state.fundneeded);
  const [fundcollected, setFundcollected] = useState(location.state.fundcollected);
  const [image, setImage] = useState(location.state.image);
  return (
    <div className="container">
    <div className="col-md-12">
      <div className="bakix-video mb-60">
        {/* <img src={`Uploads/${image}`}  alt="" /> */}

        <img src={`Uploads/${image}`} alt="" />
        <a className="popup-video" href="https://www.youtube.com/watch?v=Y6MlVop80y0"><i className="fas fa-play" /></a>
      </div>
      <div className="fund-progress mb-50">
        <div className="progress">
          <div className="progress-bar w-75" role="progressbar" aria-valuenow={60} aria-valuemin={0} aria-valuemax={100} />
        </div>
        <div className="payment-count details-fund-count d-md-flex justify-content-between mt-20 fix">
          <div className="fund-count">
            <h2>{fundcollected}</h2>
            <span>Pledged</span>
          </div>
          <div className="fund-count  ">
            <h2>{fundneeded}</h2>
            <span>Target</span>
          </div>
       
        </div>
      </div>
      <div className="fund-text mb-50">
        <p>{projectdescriptiob}.</p>
      </div>
    </div>
    </div>
  )
}
export default ProjectDetails