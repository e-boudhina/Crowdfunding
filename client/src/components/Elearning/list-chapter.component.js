
import React, { useState, useEffect } from "react";
import { Link , useLocation } from "react-router-dom";
import {getAllChapters} from "../../services/Learning.service"

function Listchapter({props}) {
    let tutorials =useLocation().state.chapters

    useEffect(() => {
        document.body.appendChild(document.createElement("script")).src = "assets-back/libs/jquery/jquery.min.js";
      }, []);


    return (
 <div className="card-body">
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
           {tutorial.name}
           </div>
         </td>
         <td><span className="badge bg-success">{tutorial.createdAt}</span></td>
         <td>
           <div>
             <Link to={`/admin/chapter/${tutorial._id}`}
      className="btn btn-primary waves-effect waves-light" > click here</Link>
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