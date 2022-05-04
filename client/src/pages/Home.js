import { Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from 'react-router';
import { allProjects, RetrieveProject } from "../actions/Projects/ProjectCrud.actions";
import SingleProjectForUser from "../components/Projects/SingleProjectForUser";
import Pagination from "../components/Projects/Pagination";
import React, { useState, useEffect, useCallback } from "react";


import Chat from "../components/Chat"
export default function Home() {
    const dispatch = useDispatch();
    const location = useLocation();


    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(3);





    const [keyword, setKeyword] = useState("");




    // const handlePageChange = useCallback(
    //     (page) => {
    //       dispatch(allProjects({page, keyword}));
    //     },
    //     [dispatch, keyword]
    //   );


    useEffect(() => {

        dispatch(allProjects());

    }, []);



    //   console.log(projects);
    const essaie = useSelector((state) => state.projects);
    const projects = essaie.projects
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentProjects = projects.slice(indexOfFirstPost, indexOfLastPost);
    console.log(currentProjects);


    // Change page
    const paginate = (pageNumber) => {
        // window.location.reload(false);
        setCurrentPage(pageNumber);
       
    };







    return (





        <body>
            <Chat></Chat>
            <section className="hero-area ">
                <div className="hero-height" data-background="assets/img/slider/slider-bg-shape.png" style={{ backgroundImage: 'url("assets/img/slider/slider-bg-shape.png")' }}>
                    <div className="container">
                        <div className="row">
                            <div className="col-xl-8 col-lg-10 offset-lg-1 offset-xl-2">
                                <div className="hero text-center pt-280">
                                    <div className="hero__caption">
                                        <p>Discover what’s possible when a community creates together.</p>
                                        <h1>Bring new ideas to life, anywhere.</h1>
                                    </div>
                                    <div className="hero-progress">
                                        <div className="progress">
                                            <div className="progress-bar w-75" role="progressbar" aria-valuenow={60} aria-valuemin={0} aria-valuemax={100} />
                                        </div>
                                        <div className="payment-count mt-20 fix">
                                            <div className="count f-left text-left">
                                                <h2>$32,678</h2>
                                                <span>Pledged</span>
                                            </div>
                                            <div className="count f-right text-right">
                                                <h2>$33,467</h2>
                                                <span>Target</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="hero-img-area">
                    <div className="container">
                        <div className="row">
                            <div className="col-xl-10 offset-xl-1">
                                <div className="hero__img bounce-animate  text-center">
                                    <img src="assets/img/bg/money.jpg" alt="" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="causes-area grey-bg pt-120 pb-120">
                <div className="container">


                    <div className="row align-items-center">
                        <div className="col-xl-12">
                            <div className="section-title text-center mb-60">
                                <p><span /> List of projects</p>
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
                            (currentProjects) ? currentProjects.map((element) => {

                                console.log(element);
                                // <SingleProject/>

                                return (

                                    (element.status === 1) ?
                                        <SingleProjectForUser project={element}></SingleProjectForUser>
                                        : <></>


                                )
                            }
                            ) : <></>
                        }

                        <Pagination
                            postsPerPage={postsPerPage}
                            totalPosts={projects.length}
                            paginate={paginate}
                            currentPage={currentPage}
                        />



                        <div class="basic-pagination basic-pagination-2 text-center mb-40">

                        </div>
                    </div>
                
                </div>
            </section>

            <section className="big-team-area">
                <div className="big-image">
                    <img src="assets/img/bg/colleagues.jpg" alt="" />
                </div>
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div className="testimonial-active owl-carousel theme-bg owl-loaded owl-drag">
                                <div className="owl-stage-outer"><div className="owl-stage" style={{ transform: 'translate3d(-1770px, 0px, 0px)', transition: 'all 0.25s ease 0s', width: '3540px' }}><div className="owl-item cloned" style={{ width: '590px' }}><div className="testimonial-item text-center">
                                    <p>“Bakix is one of those platforms that gives you space to work with people who know you, love you, and support you.”</p>
                                    <span>- Salim Rana</span>
                                </div></div><div className="owl-item cloned" style={{ width: '590px' }}><div className="testimonial-item text-center">
                                    <p>“Bakix is one of those platforms that gives you space to work with people who know you, love you, and support you.”</p>
                                    <span>- Jason Derula</span>
                                </div></div><div className="owl-item" style={{ width: '590px' }}><div className="testimonial-item text-center">
                                    <p>“Bakix is one of those platforms that gives you space to work with people who know you, love you, and support you.”</p>
                                    <span>- Salim Rana</span>
                                </div></div><div className="owl-item active" style={{ width: '590px' }}><div className="testimonial-item text-center">
                                    <p>“Bakix is one of those platforms that gives you space to work with people who know you, love you, and support you.”</p>
                                    <span>- Jason Derula</span>
                                </div></div><div className="owl-item cloned" style={{ width: '590px' }}><div className="testimonial-item text-center">
                                    <p>“Bakix is one of those platforms that gives you space to work with people who know you, love you, and support you.”</p>
                                    <span>- Salim Rana</span>
                                </div></div><div className="owl-item cloned" style={{ width: '590px' }}><div className="testimonial-item text-center">
                                    <p>“Bakix is one of those platforms that gives you space to work with people who know you, love you, and support you.”</p>
                                    <span>- Jason Derula</span>
                                </div></div></div></div><div className="owl-nav disabled"><div className="owl-prev"><i className="fa fa-angle-left" /></div><div className="owl-next"><i className="fa fa-angle-right" /></div></div><div className="owl-dots disabled" /></div>
                        </div>
                    </div>
                </div>


            </section>
        </body>
    )
}
