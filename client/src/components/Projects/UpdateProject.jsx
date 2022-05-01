import React, { useState, useRef, useEffect } from "react";
import { Navigate } from 'react-router-dom';
import Form from "react-validation/build/form";
import { Link, useParams } from 'react-router-dom';
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate,useLocation } from 'react-router';
import { allProjects, RetrieveProject } from "../../actions/Projects/ProjectCrud.actions";

import axios from 'axios';
// import { login } from "../../actions/auth";
import { updateProject } from "../../actions/Projects/ProjectCrud.actions";
import { addProject } from "../../actions/Projects/ProjectCrud.actions";

const required = (value) => {
    if (!value) {
        return (
            <div className="alert alert-danger" role="alert">
                This field is required!
            </div>
        );
    }
};
function UpdateProject(props, { route, navigation }) {
    const form = useRef();
    const checkBtn = useRef();
    const dispatch = useDispatch();
    // dispatch(allProjects());

    const location = useLocation();
    // const projects1=useSelector((state) => state.projects);
    // const projects=Object.values(projects1);
    // console.log(typeof projects);

    // console.log(projects);

    //   const [labelproject, setLabelproject] = useState(props.update.labelproject);
    //   const [projectdescriptiob, setProjectdescriptiob] = useState(props.update.projectdescriptiob);
    //   const [fundneeded, setFundneeded] = useState(props.update.fundneeded);
    //   const [image,setImage] = useState(props.update.image);
    const { id } = useParams();

    useEffect(() => {
    
            // dispatch(RetrieveProject(id));

    }, [])
    // const project = useSelector(state => state.projects);


    // console.log(project.projects[0]);

    //     const project=projects.filter((item) => item._id === id);
    // console.log(project);

    const [labelproject, setLabelproject] = useState(location.state.labelproject);
    const [projectdescriptiob, setProjectdescriptiob] = useState(location.state.projectdescriptiob);
    const [fundneeded, setFundneeded] = useState(location.state.fundneeded);
    const [image, setImage] = useState(location.state.image);
  

    // const [labelproject, setLabelproject] = useState();
    // const [projectdescriptiob, setProjectdescriptiob] = useState("");
    // const [fundneeded, setFundneeded] = useState(0);
    // const [image,setImage] = useState(null);

    const navigate = useNavigate();


    const [loading, setLoading] = useState(false);
    // const { ProjectAdded } = useSelector(state => state.auth);
    const { message } = useSelector(state => state.message);




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


    const handleUpdateProject = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('image', image);
        formData.append('labelproject', labelproject);
        formData.append('projectdescriptiob', projectdescriptiob);
        formData.append('fundneeded', fundneeded);


        console.log(formData);
        //  formData.current.validateAll();
        // if (checkBtn.current.context._errors.length === 0) {
      


            if (checkBtn.current.context._errors.length === 0) {
                dispatch(updateProject(location.state.id,formData))
                .then(() => {
          
                    setTimeout(()=>{
                        //dispatch(clearMessage())
                            navigate("/ListProject")
                    }
                    ,5000)
                })
                .catch((e) => {
                  setLoading(false);
                });
              } else {
                setLoading(false);
              }

         


        // } else {
        //   // setLoading(false);
        // }
        // };
        // if (ProjectAdded) {
        //   return navigate("/ListProject");
        // }
    };
    return (


        <div class="login-area pt-120 pb-120">
            
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons"
    rel="stylesheet"></link>
        
        <div class="container">
            <div class="row">
                <div class="col-lg-8 offset-lg-2">
                    <div class="basic-login">
                        <h3 class="text-center mb-60">Update a project</h3>
    
        <Form onSubmit={handleUpdateProject}  ref={form} encType="multipart/form-data">

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
}
export default UpdateProject;