import React, { useState, useRef } from "react";
import { Navigate } from 'react-router-dom';
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from 'react-router';
import '../Organisation/aaa.css'


import axios from 'axios';
// import { login } from "../../actions/auth";
import { AddProject } from "../../actions/Projects/ProjectCrud.actions";

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};
const ProjectAdd = (props) => {
  const form = useRef();
  const checkBtn = useRef();
  const [labelproject, setLabelproject] = useState("");
  const [projectdescriptiob, setProjectdescriptiob] = useState("");
  const [fundneeded, setFundneeded] = useState(0);
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);



  const location = useLocation();
  const navigate = useNavigate();


  // const { ProjectAdded } = useSelector(state => state.auth);
  const { message } = useSelector(state => state.message);
  const dispatch = useDispatch();



  const onChangelabelproject = (e) => {
    const labelproject = e.target.value;
    setLabelproject(labelproject);
  };
  const onChangeprojectdescriptiob = (e) => {
    const projectdescriptiob = e.target.value;
    setProjectdescriptiob(projectdescriptiob);
  };

  const onChangefundneeded = (e) => {
    const fundneeded = e.target.value;
    setFundneeded(fundneeded);
  };



  //   const onChangeFile = (e) => {
  //     setImage({
  //       image:e.target.files[0]

  //     });

  // }









  const handleAddProject = (e) => {
    e.preventDefault();
    setLoading(true);

    form.current.validateAll();
    const formData = new FormData();
    formData.append('image', image);
    formData.append('labelproject', labelproject);
    formData.append('projectdescriptiob', projectdescriptiob);
    formData.append('fundneeded', fundneeded);
    formData.append('organisation', location.state.id);


    if (checkBtn.current.context._errors.length === 0) {
      dispatch(AddProject(formData))
      .then(() => {

        navigate("/ListProject")
        window.location.reload();
      })
      .catch((e) => {
        setLoading(false);
      });
    } else {
      setLoading(false);
    }

    // const config ={
    //   headers:{
    //     'content-type': 'multipart/form-data'

    // }


    // const url ='http://localhost:5000/api/project/add';


    console.log(formData);
    //  formData.current.validateAll();
    // if (checkBtn.current.context._errors.length === 0) {
   
    // } else {
    //   // setLoading(false);

    // }
    // };
    // if (ProjectAdded) {
    //   return navigate("/ListProject");
    // }

  }
  return (


    <div class="login-area pt-120 pb-120">
            
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons"
rel="stylesheet"></link>
    
    <div class="container">
        <div class="row">
            <div class="col-lg-8 offset-lg-2">
                <div class="basic-login">
                    <h3 class="text-center mb-60">Add a project to an organisation</h3>
    <Form onSubmit={handleAddProject} ref={form} encType="multipart/form-data">

      <label htmlFor="labelproject">Project label <span>**</span></label>
      <Input
        type="text"
        className="form-control"
        name="labelproject"
        value={labelproject}
        onChange={onChangelabelproject}
        validations={[required]}
      />


      <label htmlFor="projectdescriptiob">Project description <span>**</span></label>
      <Input
        type="text"
        className="form-control"
        name="projectdescriptiob"
        value={projectdescriptiob}
        onChange={onChangeprojectdescriptiob}
        validations={[required]}
      />


      <label htmlFor="fundneeded">Funds needed <span>**</span></label>
      <Input
        type="number"
        className="form-control"
        name="fundneeded"
        value={fundneeded}
        onChange={onChangefundneeded}
        validations={[required]}
      />

<label for="image">Image uploader: <span>**</span> <span className="material-icons">
add_a_photo
</span></label>    
  <input
        type="file"
        name="image"
        // value={Image}
        id="image"
        onChange={(e) => {
          setImage(e.target.files[0])
        }}
      />

      <br></br>






      <div class="mt-10"></div>
      {/* <button class="btn btn-black w-100">Add project</button> */}
      <div className="form-group">
            <button className="btn btn-primary btn-block" disabled={loading}>
              {loading && (
                <span className="spinner-border spinner-border-sm"></span>
              )}
              <span>Add project</span>
            </button>
          </div>
          {message && (
            <div className="form-group">
              <div className="alert alert-danger" role="alert">
                {message}
              </div>
            </div>
          )}
          <CheckButton style={{ display: "none" }} ref={checkBtn} />
    </Form>
    </div>
    </div>
    </div>
    </div>
    </div>

  );
};
export default ProjectAdd;