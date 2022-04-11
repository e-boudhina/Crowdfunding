
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {getAllChapters} from "../../services/Learning.service"

function Listchapter(props) {
    const [tutorials, setTutorials] = useState([]);
    
    useEffect(() => {
        document.body.appendChild(document.createElement("script")).src = "assets-back/libs/jquery/jquery.min.js";
       retrieveTutorials();
      }, []);
      const retrieveTutorials = () => {
        getAllChapters()
          .then(response => {
            setTutorials(response.data);
            console.log(response.data);
          })
          .catch(e => {
            console.log(e);
          });
      };


    return (
 <div className="card-body">
 <h4 className="card-title mb-4">Latest Transaction</h4>
 <div className="table-responsive">
   <table className="table table-hover table-centered table-nowrap mb-0">
     <thead>
       <tr>
         <th scope="col">(#) Id</th>
         <th scope="col">Name</th>
         <th scope="col" colSpan={2}>Published</th>
       </tr>
     </thead>
     <tbody>
    
       {tutorials &&
            tutorials.map((tutorial, index) => (
       <tr>
         <th scope="row">{tutorial._id}</th>
         <td>
           <div>
             <img src="assets/images/users/user-6.jpg" alt="" className="avatar-xs rounded-circle me-2" /> {tutorial.name}
           </div>
         </td>
         <td><span className="badge bg-success">{tutorial.createdAt}</span></td>
         <td>
           <div>
             <a href="#" className="btn btn-primary btn-sm">Edit</a>
           </div>
         </td>
       </tr>
      
      ))}
       
       
     </tbody>
   </table>
 </div>
</div>

);

}

export default Listchapter;