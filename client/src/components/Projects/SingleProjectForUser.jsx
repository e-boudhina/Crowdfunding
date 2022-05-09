import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from "react-redux";
import { allProjects, RetrieveProject } from "../../actions/Projects/ProjectCrud.actions";

import { Navigate, useLocation } from 'react-router-dom';
import {CHANGE_ID,post_adresse} from "../../actions/Projects/Type";
import '../Organisation/aaa.css'
function SingleProject(props) {


    console.log(props.project);
    const [project, setProject] = useState(props.project);

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const id= useSelector((state) => state.projects.id);

    const date = new Date(project.dateCreation)

    console.log(date);
var barsize=0;
    var day = date.getDate();
    var month = date.getMonth();
    var year = date.getFullYear();
    var string = day + '-' + month + '-' + year;

    return (








        <div className="col-xl-4 col-lg-4 col-md-6">
            <div className="causes white-bg mb-30">
                <div className="causes__img">
                    <a onClick={() => {
                        navigate('/ProjectDetails', { state: { id: project._id, labelproject: project.labelproject, fundcollected: project.fundcollected, fundneeded: project.fundneeded, projectdescriptiob: project.projectdescriptiob, image: project.Image } });
                    }}><img src={`Uploads/${project.Image}`} className='photo' alt="" /></a>
                    <div className="causes-heart">
                        <a href="#"><i className="far fa-heart" /></a>
                    </div>
                </div>
                <div className="causes__caption">
                    <div className="causes-tag mb-20">
                        <a href="#">{project.labelproject}</a>
                    </div>
                    <h4><a href="fund-details.html">{project.projectdescriptiob}</a></h4>
                    <div className="causes-progress mb-25">
                        <div className="progress">
                            {barsize=project.fundcollected/project.fundneeded*100}
                            {    (project.fundcollected>project.fundneeded)? <div className="progress-bar"  role="progressbar"  style={{"width" : 100+ '%'}}aria-valuemin={0} aria-valuemax={100} />
:
                            <div className="progress-bar" role="progressbar" aria-valuenow={75} style={{"width" : 50+ '%'}} aria-valuemin={0} aria-valuemax={100} />
                }
                        </div>
                        <div className="causes-count mt-15 fix">


                            {    (project.fundcollected>project.fundneeded)?
          
                            <div className="awart-icon">
                                <img src="assets/img/icon/award.png" alt="" />
                            </div>
                            :<></>}
                            <div className="count-number f-left text-left">
                                <h2>${project.fundcollected.toFixed(2)}</h2>
                                <span>Pledged</span>
                            </div>
                            <div className="count-number f-right text-right">
                                <h2>${project.fundneeded.toFixed(2)}</h2>
                                <span>Target</span>
                            </div>
                        </div>
                    </div>
                    <div className="causes-meta fix">
                        <span className="f-left">by <a href="#">{string}</a></span>
                        <span className="f-right">at <a href="#">{project.LieuCreation}</a></span>
                    </div>

                    <div className="row mt-30">
                        <div className="col-xl-12">
                            <div className="section-link text-center">
                                <a className="btn-border"    style={{ cursor: "pointer" }} onClick={() => {
                                     dispatch({
                                        type: CHANGE_ID,
                                        payload: { id: project._id },
                                      });
                                     dispatch({
                                        type: post_adresse,
                                        payload: { adresse: project.adresseCrypto },
                                      });
                                    navigate('/payment', { state: { id: project._id, labelproject: project.labelproject, fundcollected: project.fundcollected, fundneeded: project.fundneeded, projectdescriptiob: project.projectdescriptiob,adresseCrypto:project.adresseCrypto, image: project.Image } });
                                }}>Donate</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default SingleProject