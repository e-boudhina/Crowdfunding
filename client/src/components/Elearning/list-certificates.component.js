/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getCertificates } from "../../services/Learning.service";

function ListCertificates(props) {
  const [certifs, setCertifs] = useState([]);

  useEffect(() => {
    //    document.body.appendChild(document.createElement("script")).src = "assets-back/libs/jquery/jquery.min.js";
    retrieveCertificates();
  }, []);

  const retrieveCertificates = () => {
    getCertificates()
      .then((response) => {
        setCertifs(response.data);
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
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
                  className="btn btn-primary waves-effect waves-light">
                  click here
                </Link>
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
