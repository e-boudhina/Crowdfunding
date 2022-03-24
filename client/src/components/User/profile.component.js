import React from "react";
import { Navigate } from 'react-router-dom';
import { useSelector  } from "react-redux";
import { useNavigate } from 'react-router';
import { ListOrganisationForUser } from '../Organisation/ListOrganisationForUser';

const Profile = () => {
  
const navigate=useNavigate();
  const { user: currentUser } = useSelector((state) => state.auth);
  if (!currentUser) {
    return <Navigate to="/login" />;
  }



  return (
    <div className="container">
      <header className="jumbotron">


        <h3>
          <strong>{currentUser.username}</strong> Profile
        </h3>
      </header>
      <p>
        <strong>Token:</strong> {currentUser.accessToken.substring(0, 20)} ...{" "}
        {currentUser.accessToken.substr(currentUser.accessToken.length - 20)}
      </p>
      <p>
        <strong>Id:</strong> {currentUser.id}
      </p>
      <p>
        <strong>Email:</strong> {currentUser.email}
      </p>
      <strong>Authorities:</strong>
      <ul>
        {currentUser.roles &&
          currentUser.roles.map((role, index) => <li key={index}>{role}</li>)}
      </ul>
<button onClick={()=>{navigate("/addOrganisation") }}>Ajouter Organization</button>

<ListOrganisationForUser/>





    </div>
  );
};
export default Profile;