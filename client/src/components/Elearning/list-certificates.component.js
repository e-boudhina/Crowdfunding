/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getCertificates } from "../../services/Learning.service";
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setCertifs } from "../../actions/Learning/Learning";
import axios from "axios";
function ListCertificates(props) {
  //const [certifs, setCertifs] = useState([]);
  const certifs =  useSelector((state) => state.progress.certificates);
  let dispatch = useDispatch();
  let navigate = useNavigate();
  useEffect(() => {
    //    document.body.appendChild(document.createElement("script")).src = "assets-back/libs/jquery/jquery.min.js";
 //   retrieveCertificates();
  }, [certifs]);

  const retrieveCertificates = () => {
    /*getCertificates()
      .then((response) => {
        setCertifs(response.data);
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });*/
      dispatch(setCertifs)
  };
  const submitDelete = (id) => {
    confirmAlert({
      title: 'Confirm to submit',
      message: 'Are you sure to do this.',
      buttons: [
        {
          label: 'Yes',
          onClick: () => { axios
          .delete(`http://localhost:5000/api/learning/certificate/${id}`)
          .then((res) => {
            console.log(res);
            console.log(res.data);
            dispatch(setCertifs())
        //    navigate("/admin/listcertificates");
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
    <div className="row">
            <div className="col-12">
       <div className="my-3">
       <div className="card-group  ">
      {certifs &&
        certifs.map((certif, index) => (
          <div className="" >
            {/* Simple card */}
            <div className="card mb-4  ">
              <img
                className="avatar-lg rounded-circle "
                src={`/profile-uploads/${certif.img.data}`}
                alt="Card image cap"
              />
              <div className="card-body">
                <h4 className="card-title">{certif.name}</h4>
                <p className="card-text">{certif.createdAt}</p>
                <Link
                  to={"/admin/listchapters"}
                  state={{
                    chapters: certif.chapters,
                    test: "test",
                  }}
                  className="btn btn-primary waves-effect waves-light pr-4">
                  View certificate
                </Link>
                <button className="btn btn-danger" onClick={(e) => submitDelete(certif._id)}>Delete</button>  
              </div>
            </div>
          </div>
        ))}
</div>
</div>
</div>
</div>
 
     
   
           
            

    

  );
}

export default ListCertificates;
