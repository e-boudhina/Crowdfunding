import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { getAllChapters } from "../../services/Learning.service";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

function Listchapter({ props }) {
  let tutorials = useLocation().state.chapters;
  let navigate = useNavigate();
  useEffect(() => {
    document.body.appendChild(document.createElement("script")).src =
      "assets-back/libs/jquery/jquery.min.js";
  }, []);

  const deleteChapter = (id) => {
    axios
      .delete(`http://localhost:5000/api/learning/chapter/${id}`)
      .then((res) => {
        console.log(res);
        console.log(res.data);
        navigate("/admin/listcertificates");
      });
  };
 const submitDelete = (id) => {
    confirmAlert({
      title: 'Confirm to submit',
      message: 'Are you sure to do this.',
      buttons: [
        {
          label: 'Yes',
          onClick: () => { axios
          .delete(`http://localhost:5000/api/learning/chapter/${id}`)
          .then((res) => {
            console.log(res);
            console.log(res.data);
            navigate("/admin/listcertificates");
          })}
           },
        {
          label: 'No',
          onClick: () => alert('Click No')
        }
      ]
    });
  };

  return (
    <div className="card-body">
      <div className="table-responsive">
        <table className="table table-hover table-centered table-nowrap mb-0">
          <thead>
            <tr>
              <th scope="col">(#) Id</th>
              <th scope="col">Name</th>
              <th scope="col" colSpan={2}>
                Published
              </th>
            </tr>
          </thead>
          <tbody>
            {tutorials &&
              tutorials.map((tutorial, index) => (
                <tr>
                  <th scope="row">{tutorial._id}</th>
                  <td>
                    <div>{tutorial.name}</div>
                  </td>
                  <td>
                    <span className="badge bg-success">
                      {tutorial.createdAt}
                    </span>
                  </td>
                  <td>
                    <div>
                      <Link
                        to={`/admin/chapter/${tutorial._id}`}
                        className="btn btn-primary waves-effect waves-light me-1">
                        {" "}
                        View chapter
                      </Link>
                      <button className="btn btn-danger" onClick={(e) => submitDelete(tutorial._id)}>Delete</button>  
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
