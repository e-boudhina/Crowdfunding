import React, { useState, useEffect } from "react";
import { Navigate, Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
} from "react-router-dom";
import ListChaptersUser from "../../components/Elearning/list-chapters-user.component";
import LearningService from "../../services/Learning.service";
import ViewChapter from "../../components/Elearning/view-chapter.components";
import { current } from "@reduxjs/toolkit";
import { getProgress, updateProgress } from "../../actions/Learning/Learning";


const ViewCertification = (props) => {
  const [currentChapter, setCurrentChapter] = useState("");
  const [prevChapter, setPrevChapter] = useState("");
  const [nextChapter, setNextChapter] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();
  const [certif, setCertif] = useState({});
  const [isEngaged, setIsEngaged] = useState(false);
  const { user: currentUser } = useSelector((state) => state.auth);

  //const [progress, setProgress] = useState({});
  const progress = useSelector((state) => state.progress);
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchMyAPI() {
      let response = await LearningService.getCertificate(id);
      setCertif(response.data);
    }
    fetchMyAPI();
    //  dispatch(getProgress(currentUser.id,id))
    //console.log(progress.progress[0].currentChapter);
    // console.log(progress.isEngaged);
  }, [id, currentUser.id, progress]);

  const beginCertif = async () => {
   await LearningService.progressCertif(currentUser.id , certif._id ,certif.chapters[0] ).then(
    dispatch(getProgress(currentUser.id,id))
   )
    console.log("User : "+currentUser.id +" Certif id : "+ certif._id +" chapter id : "+certif.chapters[0]._id);

  }
  return (
    <div className="blog-area pt-120 pb-80">
      <div className="container">
        <div className="row">
          <div className="col-lg-8">
            <article className="postbox post format-image mb-40">
              <div className="postbox__text bg-none">
                <h3 className="blog-title">
                  {certif.name}{" "}
                  {progress.isEngaged ? <h6>- In progress </h6> : <></>}
                </h3>
                <div className="post-text mb-20">
                  {progress.isEngaged ? (
                    <section className="widget mb-40">
                      <ViewChapter chapter={progress.progress[0].currentChapter} />
                      <div className="row">
                        <div className="col-12">
                          <div className="navigation-border pt-50 mt-40" />
                        </div>
                        <div className="col-xl-5 col-lg-5 col-md-5">
                          <div className="bakix-navigation b-next-post text-left mb-30">
                            <span>
                              <a href="#">Next Post</a>
                            </span>
                            <h4>
                              <a href="#">Tips on Minimalist</a>
                            </h4>
                          </div>
                        </div>
                        <div className="col-xl-2 col-lg-2 col-md-2 ">
                          <div className="bakix-filter text-left text-md-center mb-30">
                            <a href="#">
                              <img src="assets/img/icon/filter.png" alt="" />
                            </a>
                          </div>
                        </div>
                        <div className="col-xl-5 col-lg-5 col-md-5">
                          <div className="bakix-navigation b-next-post text-left text-md-right  mb-30">
                            <span>
                              <button> Next Chapter</button>
                            </span>
                            <h4>
                              <a href="#">{nextChapter}</a>
                            </h4>
                          </div>
                        </div>
                      </div>
                    </section>
                  ) : (
                    <section className="widget mb-40">
                      <div>
                     
                      </div>
                      <div className="row">
                     
                          <div className="navigation-border pt-50 mt-40 " />
                        </div>
        <h4>  You haven't started this certification yet. </h4>  
                          <button onClick={()=> beginCertif()} className="btn btn-black w-100"> Begin the course</button>
                   
                    </section>
                  )}
                </div>
              </div>
              <div className="author mt-80 mb-40">
                <div className="author-img text-center">
                  <img src="assets/img/blog/details/author.png" alt="" />
                </div>
                <div className="author-text text-center">
                  <h3>MD. Salim Rana</h3>
                  <div className="author-icon">
                    <a href="#">
                      <i className="fab fa-facebook-f" />
                    </a>
                    <a href="#">
                      <i className="fab fa-twitter" />
                    </a>
                    <a href="#">
                      <i className="fab fa-behance-square" />
                    </a>
                    <a href="#">
                      <i className="fab fa-youtube" />
                    </a>
                    <a href="#">
                      <i className="fab fa-vimeo-v" />
                    </a>
                  </div>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                    sed do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequa aute
                    irure dolor.{" "}
                  </p>
                </div>
              </div>
            </article>
          </div>
          <div className="col-lg-4">
            <div className="widget mb-40">
              <div className="widget-title-box mb-30">
                <span className="animate-border" />
                <h3 className="widget-title">About Me</h3>
              </div>
              <div className="about-me text-center">
                <img src="assets/img/blog/details/me.png" alt="" />
                <h4>Zulia Maron Duo</h4>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed
                  do eiusmod tempor incididunt ut labore.
                </p>
                <div className="widget-social-icon">
                  <a href="#">
                    <i className="fab fa-facebook-f" />
                  </a>
                  <a href="#">
                    <i className="fab fa-twitter" />
                  </a>
                  <a href="#">
                    <i className="fab fa-behance" />
                  </a>
                  <a href="#">
                    <i className="fab fa-linkedin-in" />
                  </a>
                  <a href="#">
                    <i className="fab fa-youtube" />
                  </a>
                </div>
              </div>
            </div>
            <ListChaptersUser chapters={certif.chapters} />
            <div className="widget mb-40">
              <div className="widget-title-box mb-30">
                <span className="animate-border" />
                <h3 className="widget-title">Social Profile</h3>
              </div>
              <div className="social-profile">
                <a href="#">
                  <i className="fab fa-facebook-f" />
                </a>
                <a href="#">
                  <i className="fab fa-twitter" />
                </a>
                <a href="#">
                  <i className="fab fa-behance" />
                </a>
                <a href="#">
                  <i className="fab fa-linkedin-in" />
                </a>
                <a href="#">
                  <i className="fab fa-youtube" />
                </a>
              </div>
            </div>
            <div className="widget mb-40"></div>
            <div className="widget mb-40 p-0 b-0">
              <div className="banner-widget">
                <a href="#">
                  <img src="assets/img/blog/details/banner.jpg" alt="" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewCertification;
