import React, { useState, useRef } from "react";
import { Navigate } from 'react-router-dom';
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router';
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
  const [image,setImage] = useState(null);

  const navigate =useNavigate();


  const [loading, setLoading] = useState(false);
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

const formData =new FormData();
formData.append('image',image);
  formData.append('labelproject',labelproject);
formData.append('projectdescriptiob',projectdescriptiob);
formData.append('fundneeded',fundneeded);


// const config ={
//   headers:{
//     'content-type': 'multipart/form-data'

// }


// const url ='http://localhost:5000/api/project/add';


 console.log(formData);
//  formData.current.validateAll();
    // if (checkBtn.current.context._errors.length === 0) {
      dispatch(AddProject(formData))
        .then(() => {
          
          console.log(formData);
          // props.history.push("/ListProject");
          // window.location.reload();
          navigate("/ListProject")
        }).
      catch((e) => {
        console.log(e);
      });
    // } else {
    //   // setLoading(false);

    // }
  // };
  // if (ProjectAdded) {
  //   return navigate("/ListProject");
  // }

}
  return (



    <Form onSubmit={handleAddProject} encType="multipart/form-data">
 
<label htmlFor="labelproject">labelproject</label>
           <Input
              type="text"
              className="form-control"
              name="labelproject"
              value={labelproject}
              onChange={onChangelabelproject}
              validations={[required]}
            />


   <label htmlFor="projectdescriptiob">projectdescriptiob</label>
    <Input
              type="text"
              className="form-control"
              name="projectdescriptiob"
              value={projectdescriptiob}
              onChange={onChangeprojectdescriptiob}
              validations={[required]}
            />


       <label htmlFor="fundneeded">funds needed</label>
           <Input
              type="text"
              className="form-control"
              name="fundneeded"
              value={fundneeded}
              onChange={onChangefundneeded}
              validations={[required]}
            />

<label htmlFor="image">Image upload</label>
    <input 
             type="file"
             name="image"
                //  value={image}
               id="image"
               onChange={(e)=>{
                  setImage(e.target.files[0])
         }}
             />

    <div>
    <button type="submit" class="btn" >Submit</button>
              {/* <button  className="btn btn-danger btn-sm rounded-0" type="button" data-toggle="tooltip" data-placement="top" title="Delete"><i className="fa fa-trash"></i></button> */}
              {/* <button  className="btn btn-success btn-sm rounded-0" type="button" data-toggle="tooltip" data-placement="top" title="Delete"><i className="fa fa-trash"></i></button> */}
    </div>
  </Form>

  );
};
export default ProjectAdd;