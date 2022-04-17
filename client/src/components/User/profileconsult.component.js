import React, { useState , useEffect  } from "react";
import { useNavigate , useSearchParams , useParams } from "react-router-dom";
import {getUser } from "../../services/user.service"

const Profileconsult = (props) => {

  const { username } = useParams();
const [profile , setProfile] = useState({  firstName :"",lastName  :"", username :"", address :"", birthDate  :"",  email  :"",verified :"", phone  :""} )
const [image,setImage] = useState("")




useEffect(() => {
 getUser(username).then( 
(data) => {     
  console.log(data);
  setProfile(data.data)
  setImage(data.data.img.data)

}
)

console.log(process.env.PUBLIC_URL);
},[username])

  return (

<section className="team-area pt-120 pb-100">
        <div className="container">
          <div className="row">
        
            <div className="col-g-5 col-lg-5">
              <div className="team mb-50">
                <div className="team__thumb">
                <img src={`/profile-uploads/${image}`} alt="" />
                </div>
              </div>
            </div>
            <div className="col-xl-7 col-lg-7">
              <div className="team-details pl-50">
                <div className="section-title mb-40">
                  <p><span /> username : {profile.username}</p>
                  <h1>  {profile.firstName} {profile.lastName} </h1>
                  <h5>  {profile.address} </h5>
                </div>
                <div className="team-info">
                  <div className="row">
                    <div className="col-lg-6 col-md-6">
                      <div className="team-cta mb-35">
                        <h5 className="team-ph"> {profile.email} </h5>
                        <h5 className="team-mail"> P : +   {profile.phone} </h5>
                        <h5 className="team-mail">  {profile.birthDate} </h5>
                      </div>
                    </div>
                    <div className="col-lg-6 col-md-6">
                      <div className="team-social  text-md-right mb-35">
                        <a href="#"><i className="fab fa-facebook-f" /></a>
                        <a href="#"><i className="fab fa-twitter" /></a>
                        <a href="#"><i className="fab fa-behance" /></a>
                        <a href="#"><i className="fab fa-linkedin-in" /></a>
                        <a href="#"><i className="fab fa-youtube" /></a>
                      </div>
                    </div>
                  </div>
                  <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur sint occaecat
                    cupidatat.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
  )
};
export default Profileconsult;