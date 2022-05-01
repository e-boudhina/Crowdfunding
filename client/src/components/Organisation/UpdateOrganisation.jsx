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
import { updateOrganisation } from "../../actions/Organisations/OrganisationCrud.actions"
import { addOrganisation } from "../../actions/Organisations/OrganisationCrud.actions";

const required = (value) => {
    if (!value) {
        return (
            <div className="alert alert-danger" role="alert">
                This field is required!
            </div>
        );
    }
};
function UppdateOrganisation(props, { route, navigation }) {
    const form = useRef();
    const checkBtn = useRef();
    const dispatch = useDispatch();
    // dispatch(allProjects());

    const location = useLocation();

    const { id } = useParams();


    const [name, setName] = useState(location.state.name);
    const [email, setEmail] = useState(location.state.email);
    const [phone, setPhone] = useState(location.state.phone);
    const [fax, setFax] = useState(location.state.fax);
    const [adress, setAdress] = useState(location.state.adress);
    const [description, setDescription] = useState(location.state.description);
    const [Secteur, setSecteur] = useState(location.state.Secteur);
    const [Image, setImage] = useState(location.state.image);


    

  





    //

    const navigate = useNavigate();
    const mailValidation = (value) => {


        const regex = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
        // const regex = /^[a-z0-9][\-_\.\+\!\#\$\%\&\'\*\/\=\?\^\`\{\|]{0,1}([a-z0-9][\-_\.\+\!\#\$\%\&\'\*\/\=\?\^\`\{\|]{0,1})*[a-z0-9]@[a-z0-9][-\.]{0,1}([a-z][-\.]{0,1})*[a-z0-9]\.[a-z0-9]{1,}([\.\-]{0,1}[a-z]){0,}[a-z0-9]{0,}$/
        if(regex.test(value) === false){
            return (
            <div className="alert alert-danger" role="alert">
            Email non valid
        </div>
            );
           
        }
    };

    const [loading, setLoading] = useState(false);
    // const { ProjectAdded } = useSelector(state => state.auth);
    const { message } = useSelector(state => state.message);


    const { user: currentUser } = useSelector((state) => state.auth);
    if (!currentUser) {
        return <Navigate to="/login" />;
    }

    const onChangeName = (e) => {
        const name = e.target.value;
        setName(name);
    };

    const onChangeFax = (e) => {
        const fax = e.target.value;
        setFax(fax);
    };

    const onChangeAdress = (e) => {
        const adress = e.target.value;
        setAdress(adress);
    };

    const onChangeSecteur = (e) => {
        const Secteur = e.target.value;
        setSecteur(Secteur);
    };

    const onChangeDescription = (e) => {
        const description = e.target.value;
        setDescription(description);
    };
    const onChangeEmail = (e) => {
        const email = e.target.value;
        setEmail(email);
    };
    const onChangePhone = (e) => {
        const phone = e.target.value;
        setPhone(phone);
    };



    const handleUpdateOrganisation = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('image', Image);
        formData.append('name', name);
        formData.append('phone', phone);
        formData.append('fax', fax);
        formData.append('adress', adress);
        formData.append('description', description);
        formData.append('Secteur', Secteur);
        // formData.append('ownerName', currentUser.username);
        formData.append('email', email);



        //  formData.current.validateAll();
        // if (checkBtn.current.context._errors.length === 0) {

             if (checkBtn.current.context._errors.length === 0) {
                 dispatch(updateOrganisation(location.state.id,formData))
        
                 .then(() => {
                console.log(formData);

                setTimeout(()=>{
                    //dispatch(clearMessage())
                        navigate("/profile")
                }
                ,5000)
        
             
            })
            .catch((e) => {
                console.log(e);
            });
        }
        else {
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
                              <h3 class="text-center mb-60">Update an organisation</h3>


        <Form onSubmit={handleUpdateOrganisation} ref={form} encType="multipart/form-data">

        <label for="name">Organisation name <span>**</span></label>

<Input
    type="text"
    className="form-control"
    id="name"
    name="name"
    value={name}
    onChange={onChangeName}
    validations={[required]}
/>


<label for="email-id">Email Address <span>**</span></label>
                                <Input
                                    type="text"
                                    className="form-control"
                                    name="email"
                                    value={email}
                                    onChange={onChangeEmail}
                                    validations={[required,mailValidation]}
                                />


<label for="phone">Cell phone number <span>**</span></label>
                                <Input
                                    type="number"
                                    className="form-control"
                                    name="phone"
                                    value={phone}
                                    onChange={onChangePhone}
                                    validations={[required]}
                                />
        <label for="fax">Fax number <span>**</span></label>

<Input
    type="number"
    className="form-control"
    name="fax"
    value={fax}
    onChange={onChangeFax}
    validations={[required]}
/>

<label for="adress">Address <span>**</span></label>
                                <Input
                                    type="text"
                                    className="form-control"
                                    name="adress"
                                    value={adress}
                                    onChange={onChangeAdress}
                                    validations={[required]}
                                />
          <label for="description">Description <span>**</span></label>
                                <Input
                                    type="text"
                                    className="form-control"
                                    name="description"
                                    value={description}
                                    onChange={onChangeDescription}
                                    validations={[required]}
                                />
      
      <label for="Secteur">Secteur <span>**</span></label>
                                <Input
                                    type="text"
                                    className="form-control"
                                    name="Secteur"
                                    value={Secteur}
                                    onChange={onChangeSecteur}
                                    validations={[required]}
                                />

<label for="email-id">Owner name <span>**</span></label>
                                <Input
                                    type="text"
                                    disabled
                                    className="form-control"
                                    name="ownerName"
                                    value={currentUser.username}
                                    // onChange={onChangeOwnerName}
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

<div className="form-group">
            <button className="btn btn-primary btn-block" disabled={loading}>
              {loading && (
                <span className="spinner-border spinner-border-sm"></span>
              )}
              <span>Update organisation</span>
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
export default UppdateOrganisation;