import React, { useState, useRef, useEffect } from "react";
import { Navigate, useLocation } from 'react-router-dom';
import Form from "react-validation/build/form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router';
import { allProjects, RetrieveProject, RetrieveProjectsByOrg } from "../../actions/Projects/ProjectCrud.actions";
import { getFollowers } from "../../actions/Organisations/Follow.action";
import { getOwner } from "../../actions/Organisations/Owner.action";
import { Link, useParams } from 'react-router-dom';
import './OD.css'
import CircularProgress from "@material-ui/core/CircularProgress";
import Autocomplete from "@material-ui/lab/Autocomplete";
import {getUser_UserRequests, getUserRequests} from "../../services/UserRequests.js/UserRequest.service";


import {
  EmailShareButton,
  FacebookIcon,
  FacebookShareButton,
  HatenaShareButton,
  InstapaperShareButton,
  LineShareButton,
  LinkedinShareButton,
  LivejournalShareButton,
  MailruShareButton,
  OKShareButton,
  PinterestShareButton,
  PocketShareButton,
  RedditShareButton,
  TelegramShareButton,
  TumblrShareButton,
  TwitterShareButton,
  ViberShareButton,
  VKShareButton,
  WhatsappShareButton,
  WorkplaceShareButton
} from "react-share";


function OrrganisationDetails(props) {

  const location = useLocation();
  console.log(location.state.image)
  const navigate = useNavigate();

  const dispatch = useDispatch();



  // console.log(project.project);

  //     const project=projects.filter((item) => item._id === id);
  // console.log(project);

  // const [labelproject, setLabelproject] = useState(project.project[0].labelproject);
  // const [projectdescriptiob, setProjectdescriptiob] = useState(project.project[0].projectdescriptiob);
  // const [fundneeded, setFundneeded] = useState(project.project[0].fundneeded);
  // const [fundcollected, setFundcollected] = useState(project.project[0].fundcollected);
  // const [image, setImage] = useState(project.project[0].Image);
  const [userRequests, setUserRequests] = useState([])

  const [name, setName] = useState(location.state.name);
  const [email, setEmail] = useState(location.state.email);
  const [phone, setPhone] = useState(location.state.phone);
  const [fax, setFax] = useState(location.state.fax);
  const [adress, setAdress] = useState(location.state.adress);
  const [description, setDescription] = useState(location.state.description);
  const [secteur, setSecteur] = useState(location.state.Secteur);
  const [image, setImage] = useState(location.state.image);
  const [ownerName, setOwnerName] = useState(location.state.ownerName);

  console.log(ownerName);



  
  useEffect(() => {

    dispatch(getFollowers(location.state.id));
    dispatch(getOwner(location.state.ownerName));
    retrieveUserRequests();


  }, [])




  const projects = useSelector(state => state.projects);
  const followers = useSelector(state => state.followers);
  const owner = useSelector(state => state.owner);
  // const owner = useSelector(state => state.owner);
  

  const retrieveUserRequests = () => {
    getUser_UserRequests().then(res=>{
        console.log(res.data)
        setUserRequests(res.data)
   })
}




  console.log(projects.projects);
  // console.log(followers.followers);
  console.log(owner.owner);
  // const listFollowers=followers.followers
  const ownerOfOrganisation = owner.owner
  return (

    <div className="blog-area pt-120 pb-80">

      <div className="container">
        <div className="row">
          <div className="col-lg-8">
            <article className="postbox post format-image mb-40">
              <div className="postbox__thumb mb-35">
                <img src={`Uploads/${image}`}  width={600} height={250} sizes alt="blog image" />
              </div>
              <div className="postbox__text bg-none">
                <div className="post-meta mb-15">
                  <span><i className="far fa-calendar-check" /> September 15, 2018 </span>
                  <span><i class="fa fa-phone" aria-hidden="true"></i>{phone} </span>
                  <span><i class="fa fa-fax" aria-hidden="true"></i> {fax} </span>
                  <span><a href="#"><i class="fa-solid fa-address-card" aria-hidden="true"></i> {adress}</a></span>
                  {/* <span><a href="#"><i class="fa fa-users" aria-hidden="true"></i> {listFollowers[1]} </a></span> */}
                  <span><a href="#"><i class="fa fa-envelope" aria-hidden="true"></i> {email} </a></span>

                </div>



                {/* design for owner details:  */}
                <h3 className="blog-title">
                  Organisation name: {name}
                </h3>


                <br></br>
                <br></br>


                <div class="team-details pl-50">
                  <div class="section-title mb-40">
                    <p><span></span> Founder</p>
                    <h1>{ownerOfOrganisation.firstName} &nbsp; &nbsp; {ownerOfOrganisation.lastName}  </h1>
                    <h5>UserName: {ownerOfOrganisation.username}</h5>
                  </div>
                  <div class="team-info">
                    <div class="row">
                      <div class="col-lg-6 col-md-6">
                        <div class="team-cta mb-35">
                          <h5 class="team-ph"><i class="fa fa-phone" aria-hidden="true"></i> &nbsp;{ownerOfOrganisation.phone}</h5>
                          <h5 class="team-mail"> <i class="fa fa-envelope" aria-hidden="true"></i> &nbsp;{ownerOfOrganisation.email}</h5>
                        </div>
                      </div>
                      <div class="col-lg-6 col-md-6">
                        <div class="team-social  text-md-right mb-35">
                          <a href="#"><i class="fab fa-facebook-f"></i></a>
                          <a href="#"><i class="fab fa-twitter"></i></a>
                          <a href="#"><i class="fab fa-behance"></i></a>
                          <a href="#"><i class="fab fa-linkedin-in"></i></a>
                          <a href="#"><i class="fab fa-youtube"></i></a>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>



                <div className="row mt-50">
                  <div className="col-xl-8 col-lg-8 col-md-8 mb-15">
                    <div className="blog-post-tag">
                      <span>Releted projects :</span>





                      <div className="row mt-30">
                        <div className="col-xl-12">
                          <div className="section-link text-center">
                            <a className="btn-border ml-10" onClick={() => navigate('/ListProject', { state: { id: location.state.id, ownerName: ownerName } })} >View  projects</a>
                          </div>
                        </div>
                      </div>















                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-12">
                    <div className="navigation-border pt-50 mt-40" />
                  </div>
                  <div className="col-xl-5 col-lg-5 col-md-5">
                    <div className="bakix-navigation b-next-post text-left mb-30">
                      <span><a href="#">Next Post</a></span>
                      <h4><a href="#">Tips on Minimalist</a></h4>
                    </div>
                  </div>
                  <div className="col-xl-2 col-lg-2 col-md-2 ">
                    <div className="bakix-filter text-left text-md-center mb-30">
                      <a href="#"><img src="assets/img/icon/filter.png" alt="" /></a>
                    </div>
                  </div>
                  <div className="col-xl-5 col-lg-5 col-md-5">
                    <div className="bakix-navigation b-next-post text-left text-md-right  mb-30">
                      <span><a href="#">Next Post</a></span>
                      <h4><a href="#">Tips on Minimalist</a></h4>
                    </div>
                  </div>
                </div>
              </div>
              <div className="author mt-80 mb-40">
                <div className="author-img text-center">
                  <img src="assets/img/blog/details/author.png" alt="" />
                </div>
                <div className="author-text text-center">
                  <h3> {ownerName}</h3>
                  <div className="author-icon">
                    <a href="#"><i className="fab fa-facebook-f" /></a>
                    <a href="#"><i className="fab fa-twitter" /></a>
                    <a href="#"><i className="fab fa-behance-square" /></a>
                    <a href="#"><i className="fab fa-youtube" /></a>
                    <a href="#"><i className="fab fa-vimeo-v" /></a>
                  </div>
                  <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et
                    dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
                    ea commodo consequa aute irure dolor. </p>
                </div>
              </div>
              <div className="post-comments">
                <div className="blog-coment-title mb-30">
                  {/* <h2>{organisation.numberFollowers}</h2> */}
                </div>





                <div className="latest-comments">
                  <ul>
                    {
                      followers.followers.map((element) => {
                        console.log(element);

                        // <SingleProject/>

                        return (

                          <>
                            <li>

                              <div className="comments-box">
                                <div className="comments-avatar">
                                  {/* <img src="assets/img/blog/details/comments1.png" alt="" /> */}
                                  <img src={`/profile-uploads/${element.img.data}`} alt="" />


                                </div>
                                <div className="comments-text">
                                  <div className="avatar-name">
                                    <h5>{element.firstName}</h5>
                                    <h5>{element.lastName}</h5>
                                    <span>{element.address}</span>
                                    <span></span>&nbsp; &nbsp;
                                 
                                    &nbsp; &nbsp; <i class="fa fa-users" aria-hidden="true">   &nbsp; &nbsp;<button className="btn-border ml-10" onClick={   ()=>navigate('/u/'+element.username,{state: element})}>Consult profile</button></i>
                                  </div>
                                  <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt
                                    ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                                    ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                                </div>
                              </div>
                            </li>


                          </>

                          // <SingleOranisation delete={deletee} organisation={element} ></SingleOranisation>
                        )
                      }
                      )






                    }
              

                  </ul>
                </div>
              </div>
            </article>
          </div>
          <div className="col-lg-4">
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
            <div className="widget mb-40">
              <div className="widget-title-box mb-30">
                <span className="animate-border" />
                <h3 className="widget-title">Organisation info</h3>
              </div>
              <div className="about-me text-center">
                <img src="assets/img/blog/details/me.png" alt="" />
                <h4>{name}</h4>
                <p>{description}</p>
                <div className="widget-social-icon">
                
                  <FacebookShareButton url={"https://bestofreactjs.com/repo/nygardk-react-share"} 
                  quote={"HEY YOU"}
                hashtag="#REACT"
                  
                  >   <a href="#"><i className="fab fa-facebook-f" /></a> </FacebookShareButton>
                  <a href="#"><i className="fab fa-twitter" /></a>
                  <a href="#"><i className="fab fa-behance" /></a>
                  <a href="#"><i className="fab fa-linkedin-in" /></a>
                  <a href="#"><i className="fab fa-youtube" /></a>
                </div>
              </div>
            </div>
            <div className="widget mb-40">
              <div className="widget-title-box mb-30">
                <span className="animate-border" />
                <h3 className="widget-title">Popular Events</h3>
              </div>

              <ul className="recent-posts">
                <li>
                  <div className="widget-posts-image">
                    <a href="#"><img src="assets/img/blog/details/img1.jpg" alt="" /></a>
                  </div>
                  <div className="widget-posts-body">
                    <h6 className="widget-posts-title"><a href="#">Lorem ipsum dolor sit
                      cing elit, sed do.</a></h6>
                    <div className="widget-posts-meta">October 18, 2018 </div>
                  </div>
                </li>
                <li>
                  <div className="widget-posts-image">
                    <a href="#"><img src="assets/img/blog/details/img2.jpg" alt="" /></a>
                  </div>
                  <div className="widget-posts-body">
                    <h6 className="widget-posts-title"><a href="#">Lorem ipsum dolor sit
                      cing elit, sed do.</a></h6>
                    <div className="widget-posts-meta">October 24, 2018 </div>
                  </div>
                </li>
                <li>
                  <div className="widget-posts-image">
                    <a href="#"><img src="assets/img/blog/details/img3.jpg" alt="" /></a>
                  </div>
                  <div className="widget-posts-body">
                    <h6 className="widget-posts-title"><a href="#">Lorem ipsum dolor sit
                      cing elit, sed do.</a></h6>
                    <div className="widget-posts-meta">October 28, 2018 </div>
                  </div>
                </li>
              </ul>
             
            </div>
            <div className="widget mb-40">
              <div className="widget-title-box mb-30">
                <span className="animate-border" />
                <h3 className="widget-title">Services</h3>
              </div>
              <ul className="cat">
            {  userRequests.map((uR, index) => (
<>
<li>
<a href="#">Location :{uR.desired_Location} <span className="f-right">Number :{uR.number_Of_Employees}</span></a>
</li>

</>
                    )
                    )
  
}
</ul>
            
         
          
            </div>
            <div className="widget mb-40">
              <div className="widget-title-box mb-30">
                <span className="animate-border" />
                <h3 className="widget-title">Social Profile</h3>
              </div>
              <div className="social-profile">
                <a href="#"><i className="fab fa-facebook-f" /></a>
                <a href="#"><i className="fab fa-twitter" /></a>
                <a href="#"><i className="fab fa-behance" /></a>
                <a href="#"><i className="fab fa-linkedin-in" /></a>
                <a href="#"><i className="fab fa-youtube" /></a>
              </div>
            </div>
            <div className="widget mb-40">
              <div className="widget-title-box mb-30">
                <span className="animate-border" />
                <h3 className="widget-title">Instagram Feeds</h3>
              </div>
              <ul id="Instafeed" />
            </div>
            <div className="widget mb-40">
              <div className="widget-title-box mb-30">
                <span className="animate-border" />
                <h3 className="widget-title">Instagram Feeds</h3>
              </div>
              <div className="tag">
                <a href="#">Popular</a>
                <a href="#">desgin</a>
                <a href="#">usability</a>
                <a href="#">develop</a>
                <a href="#">consult</a>
                <a href="#">icon</a>
                <a href="#">HTML</a>
                <a href="#">ux</a>
                <a href="#">business</a>
                <a href="#">kit</a>
                <a href="#">keyboard</a>
                <a href="#">tech</a>
              </div>
            </div>
            <div className="widget mb-40 p-0 b-0">
              <div className="banner-widget">
                <a href="#"><img src="assets/img/blog/details/banner.jpg" alt="" /></a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  )
}
export default OrrganisationDetails