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
        dispatch(updateProject(location.state.id,formData))
        
            .then(() => {

                console.log(formData);
                // props.history.push("/ListProject");
                // window.location.reload();
             
            }).
            catch((e) => {
                console.log(e);
            });


            navigate("/ListProject");


        // } else {
        //   // setLoading(false);
        // }
        // };
        // if (ProjectAdded) {
        //   return navigate("/ListProject");
        // }
    };
    return (



        <Form onSubmit={handleUpdateProject} encType="multipart/form-data">

            <label htmlFor="labelproject">labelproject</label>
            <Input
                type="text"
                className="form-control"
                name="labelproject"
                value={labelproject}
                onChange={onChangelabelproject}
                validations={[required]} />


            <label htmlFor="projectdescriptiob">projectdescriptiob</label>
            <Input
                type="text"
                className="form-control"
                name="projectdescriptiob"
                value={projectdescriptiob}
                onChange={onChangeprojectdescriptiob}
                validations={[required]} />


            <label htmlFor="fundneeded">funds needed</label>
            <Input
                type="text"
                className="form-control"
                name="fundneeded"
                value={fundneeded}
                onChange={onChangefundneeded}
                validations={[required]} />

            <label htmlFor="image">Image upload</label>
            <input
                type="file"
                name="image"
                //  value={image}
                id="image"
                onChange={(e) => {
                    setImage(e.target.files[0]);
                }} />

            <div>
                <button type="submit">Submit</button>
            </div>
        </Form>

    );
}
export default UpdateProject;