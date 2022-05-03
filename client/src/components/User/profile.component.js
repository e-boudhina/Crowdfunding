import  { React,useState , useEffect  } from "react";
import { Navigate  } from 'react-router-dom';
import { useDispatch, useSelector  } from "react-redux";
import { useNavigate  } from "react-router-dom";
import ListOrganisationForUser from "../Organisation/ListOrganisationForUser"
import {Buffer} from 'buffer';
import Userprofilecertificates from "../Elearning/user-profile-certificates.component"
const Profile = (props) => {
  const navigate = useNavigate();

  const navigateToEdit = () => navigate("/register"); //eg.history.push('/login');
  //const dispatch = useDispatch();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [address, setAddress] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [email, setEmail] = useState("");
  const [verified,setVerified] = useState(false);
  const [phone, setPhone]= useState("")
  const [image,setImage]=useState("")
  const [imgData,setImgData] = useState("")
  const { user: currentUser } = useSelector((state) => state.auth);
 const { message } = useSelector((state) => state.message);
  const { infos: currentInfos } = useSelector((state) => state.auth);
  const { isLoggedIn: IsLoggedIn } = useSelector((state) => state.auth);
  // const { verified: verified} = useSelector((state) => state.auth);
  // console.log("is user logged in"+isLoggedIn)


//currentInfos.image.data


useEffect(() => {
  console.log("is mounted ");
  if (!IsLoggedIn || !currentInfos || !currentUser)  {  
    navigate("/login"); 
  } else {   
    setFirstName(currentInfos.firstName)
    setLastName(currentInfos.lastName)
    setUsername(currentInfos.username)
    setEmail(currentInfos.email)
    setAddress(currentInfos.address)
    setVerified(currentInfos.verified)
    setPhone(currentInfos.phone)
    setBirthDate(currentInfos.birthdate)
    setImage(currentInfos.image.data)
  //  const bf = new Buffer.from(imgData).toString("base64");
 //setImage(bf)
   // console.log("User is logged in (fom profile:22");
 }
 },[IsLoggedIn,currentInfos,navigate,image])  //dep hass"hom zeydin
  

    /*if (!currentUser || !currentInfos) {
        navigate("/login");
    } else {
     console.log(" Entered profile (from profile:33) ");
    } */

  return (
<section className="team-area pt-120 pb-100">
        <div className="container">
          <div className="row">
        
            <div className="col-g-5 col-lg-5">
              <div className="team mb-50">
                <div className="team__thumb">
  
                <img src={`/profile-uploads/${image}`} alt={`/profile-uploads/alternative-profile.png`} />
                </div>
                <button onClick={navigateToEdit} type="button" className="btn btn-black w-100" > Edit profile </button>
              </div>
            </div>
            <div className="col-xl-7 col-lg-7">
              <div className="team-details pl-50">
                <div className="section-title mb-40">
                  <p><span /> username : {username}</p>
                  <h1>  {firstName} {lastName} </h1>
                  <h5>  {address} </h5>
                </div>
                <div className="team-info">
                  <div className="row">
                    <div className="col-lg-6 col-md-6">
                      <div className="team-cta mb-35">
                        <h5 className="team-ph"> {email} </h5>
                        <h5 className="team-mail"> P : +   {phone} </h5>
                        <h5 className="team-mail">  {birthDate} </h5>
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
              
       
<Userprofilecertificates/>
<div className="col-12">
           <div className="text-right my-2 pr-1">
             <i style={{fontSize: '2rem', cursor: 'pointer', color: '#4bb543'}} onClick={() => {navigate('/addOrganisation')}} className="fas fa-plus-circle mx-auto" />
           </div>
         </div>
<ListOrganisationForUser/>
          </div>
        </div>
      </section>



  )};
export default Profile;
