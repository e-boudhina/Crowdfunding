import React, { useState, useEffect } from "react";
import { Navigate, Link, useParams,useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ListChaptersUser from "../../components/Elearning/list-chapters-user.component";
import LearningService from "../../services/Learning.service";
import ViewChapter from "../../components/Elearning/view-chapter.components";
import {
  getProgress,
  setChaptersAction,
  updateProgress,
  setCurrentChapter,
} from "../../actions/Learning/Learning";
import { confirmAlert } from 'react-confirm-alert'; // Import
import Button from '@material-ui/core/Button';
import Alert from 'react-bootstrap/Alert'
const emptyChapter = {
  _id: null,
  name: "",
  content: {
    blocks: [
      {
        key: "7isfv",
        text: "This is it",
        type: "unstyled",
        depth: 0,
        inlineStyleRanges: [],
        entityRanges: [],
        data: {},
      },
    ],
    entityMap: {},
  },
  createdAt: "",
  updatedAt: "",
};

const ViewCertification = (props) => {
  let navigate = useNavigate();
  const { infos: currentInfos } = useSelector((state) => state.auth);
  const { id } = useParams();
  const { user: currentUser } = useSelector((state) => state.auth);
  const progress = useSelector((state) => state.progress);
  const currentChapter = useSelector((state) => state.progress.currentChapter);
  const chapters = useSelector((state) => state.progress.certif.chapters) 
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();
  const [nextDisabled, setNextDisabled] = useState(false);
  const [prevDisabled, setPrevDisabled] = useState(true);

  useEffect(() => {
  }, [
    id,
   // currentUser.id,
    progress.progress,
    chapters,
    currentChapter,
  ]);

  const beginCertif = async () => {
    //this will update the progress in the DB
    await LearningService.progressCertif(
      currentUser.id,
      progress.certif._id,
      progress.certif.chapters[0]._id
    ).then(
      //this will feftch the progress intro the store
      dispatch(getProgress(currentUser.id, id))
    );
  };

const progressCertif = (isCompleted,chapter) => {
   LearningService.progressCertif(
    currentUser.id,
    progress.certif._id,
chapter._id ,
    isCompleted
    ).then(
      dispatch(setCurrentChapter(chapter  ))
    )
    console.log("Setting next now ");
    dispatch(getProgress(currentUser.id, id))
  }


  const ConfirmProgressCertif = () => {
  confirmAlert({
    title: 'Confirm',
    message: 'Are you sure to progress ?',
    buttons: [
      {
        label: 'Yes',
        onClick: () => { 
          if (!(chapters[chapters.indexOf(currentChapter) + 1]) ) {
            progressCertif(true, chapters[chapters.indexOf(currentChapter) ])
            setShow(true);
            setNextDisabled(true);
          }     else 
          {
            progressCertif(false, chapters[chapters.indexOf(currentChapter) + 1])
          }
          setPrevDisabled(false);
      }
         },
      {
        label: 'No',
        onClick: () => alert('Click No')
      }
    ]
  });
  }
  const setNextPost = () => {
    if (nextDisabled){
      console.log("Next is disabled");
    } else {
      if (
      ( chapters.indexOf(progress.currentChapter) + 1 >  chapters.map(object => object._id).indexOf(progress.progress.currentChapter._id) )
     //  && !(progress.progress.isCompleted) 
      ) {
        ConfirmProgressCertif()
      } else {
        if (chapters[chapters.indexOf(currentChapter) + 1]) {
          dispatch(setCurrentChapter(chapters[chapters.indexOf(currentChapter) + 1]));
          setPrevDisabled(false);
          if (!(chapters[chapters.indexOf(currentChapter) + 2]) && progress.progress.isCompleted ) {
            setNextDisabled(true);
          }
        }
      }

    } 
  };


  const setPrevPost = () => {
    if (!prevDisabled) {
      if (chapters[chapters.indexOf(currentChapter) - 1]) {
        dispatch(
          setCurrentChapter(chapters[chapters.indexOf(currentChapter) - 1])
        );
        if (!chapters[chapters.indexOf(currentChapter) - 2]) {
          setPrevDisabled(true);
        }
        setNextDisabled(false);
      }
    } else console.log("Prev is disabled");
  };

  return (
    <div className="blog-area pt-120 pb-80">
      <div className="container">
        <div className="row">
          <div className="col-lg-8">
          <Alert show={show} variant="success">
        <Alert.Heading>Congratulations</Alert.Heading>
        <p>
    You just completed this certification.
        </p>
        <hr />
        <div className="d-flex justify-content-end">
          <Button onClick={() => setShow(false)} variant="outline-success">
            Close 
          </Button>
        </div>
      </Alert>

            <article className="postbox post format-image mb-40">
              <div className="postbox__text bg-none">
                <h3 className="blog-title">
                  {progress.certif.name}{" "}
                  {progress.isEngaged && progress.progress.isCompleted ?<h6> Completed </h6> :  <></>}
                  { progress.isEngaged && !progress.progress.isCompleted ? <h6>  In progress </h6> :  <></>}
                  { !progress.isEngaged && currentInfos ? <h6> - Not started</h6> :  <></>}
                </h3>
                <div className="post-text mb-20">
   
{ !currentInfos ?
  <section className="widget mb-40">
                      <div></div>
                      <div className="row">
                        <div className="navigation-border pt-50 mt-40 " />
                      </div>
                      <h4> Please login to start this course </h4>
                      <button 
                        onClick={() => navigate("/login")}
                        className="btn btn-black w-100">
                        {" "}
                       Login
                      </button>
                    </section>
                    :
<> 
                  {progress.isEngaged ? (
                    <section className="widget mb-40">
                      <ViewChapter chapter={currentChapter} />
                      <div className="row">
                        <div className="col-12">
                          <div className="navigation-border pt-50 mt-40" />
                        </div>
                        <div className="col-xl-5 col-lg-5 col-md-5">
                          <div className="bakix-navigation b-next-post text-left text-md-right  mb-30">
                            <span>
                              <button  className={prevDisabled ? "btn-border" : "btn btn-primary"} onClick={() => setPrevPost()}>
                              Previous Chapter
                              </button>
                            </span>
                         
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
                              <button    className={ !chapters[chapters.indexOf(currentChapter) + 1] && progress.progress.isCompleted ? " btn-border" : "btn btn-primary"} onClick={() => setNextPost()}>
                                {" "}
                               { !chapters[chapters.indexOf(currentChapter) + 1] ?  <>Complete chapter </> :  <> Next Chapter </> } 
                              </button>
                            </span>
                          </div>
                        </div>
                      </div>
                    </section>
                  ) : (
                    <section className="widget mb-40">
                      <div></div>
                      <div className="row">
                        <div className="navigation-border pt-50 mt-40 " />
                      </div>
                      <h4> You haven't started this certification yet. </h4>
                      <button 
                        onClick={() => beginCertif()}
                        className="btn btn-black w-100">
                        {" "}
                        Begin the course
                      </button>
                    </section>
                  )}
                  </>

                  }


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
            {
              //     {chapter} {nextChapter} {prevChapter}
            }
            <ListChaptersUser
              chapter={(chapter) => console.log()}
              nextChapter={(chapter) => console.log()}
              prevChapter={(chapter) => console.log()}
              chapters={progress.certif.chapters}
            />
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
