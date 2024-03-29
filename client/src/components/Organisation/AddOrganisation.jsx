import React, { useState, useRef } from "react";
import { Navigate } from 'react-router-dom';
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { useDispatch, useSelector } from "react-redux";
import "./aaa.css";
import { useNavigate } from 'react-router';
import axios from 'axios';
// import { login } from "../../actions/auth";
import { AddOrganisation } from "../../actions/Organisations/OrganisationCrud.actions";
import { clearMessage } from "../../actions/message";


const required = (value) => {
    if (!value) {
        return (
            <div className="alert alert-danger" role="alert">
                This field is required!
            </div>
        );
    }
};
const OrganisationAdd = (props) => {

    
    
    
    const form = useRef();
    const checkBtn = useRef();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState();
    const [fax, setFax] = useState();
    const [adress, setAdress] = useState("");
    const [ownerName, setOwnerName] = useState("");
    const [description, setDescription] = useState("");
    const [Secteur, setSecteur] = useState("");
    const [Image, setImage] = useState(null);
    const [adresseCrypto, setAdresseCrypto] = useState("");


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
    const dispatch = useDispatch();

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
    const onAdresseCrypto = (e) => {
        const adresseCrypto = e.target.value;
        setAdresseCrypto(adresseCrypto);
    };



    const handleAddOrganisation = (e) => {


        e.preventDefault();
        setLoading(true);
    
        form.current.validateAll();

        const formData = new FormData();
        formData.append('image', Image);
        formData.append('name', name);
        formData.append('phone', phone);
        formData.append('fax', fax);
        formData.append('adress', adress);
        formData.append('description', description);
        formData.append('Secteur', Secteur);
        formData.append('adresseCrypto', adresseCrypto);
        formData.append('ownerName', currentUser.username);
        formData.append('email', email);


        if (checkBtn.current.context._errors.length === 0) {
            dispatch(AddOrganisation(formData))
            .then(() => {
      
              console.log(formData);
            //   props.history.push("/profile");

            
                dispatch(clearMessage())
              
                    navigate("/profile")
            
            

            
             
            //   
            })
            .catch((e) => {
              setLoading(false);
            });
        }
           else {
            setLoading(false);
          }

        //  formData.current.validateAll();
        // if (checkBtn.current.context._errors.length === 0) {
      


    }
    return (

        <div class="login-area pt-120 pb-120">
            
            <link href="https://fonts.googleapis.com/icon?family=Material+Icons"
      rel="stylesheet"></link>
            
            <div class="container">
                <div class="row">
                    <div class="col-lg-8 offset-lg-2">
                        <div class="basic-login">
                            <h3 class="text-center mb-60">Add an organisation</h3>
                            <Form onSubmit={handleAddOrganisation} ref={form} encType="multipart/form-data">
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
                                {/* <input id="name" type="text" placeholder="Enter Username or Email address..." /> */}
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
                                <label for="adress">Home address <span>**</span></label>
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

                                <label for="adresseCrypto">Eth Crypto Adress <span>**</span></label>
                                <Input
                                    type="text"
                                    className="form-control"
                                    name="adresseCrypto"
                                    value={adresseCrypto}
                                     onChange={onAdresseCrypto}
                                />

                                <label for="image">Image uploader: <span>**</span> <span className="material-icons">
add_a_photo
</span></label>
                                {/* <input
                                    type="file"
                                    name="image"
                                    // value={Image}
                                    id="image"
                                    onChange={(e) => {
                                        setImage(e.target.files[0])
                                    }}
                                /> */}

                                 {/* <button class="btn btn-black w-100"> */}
                                 
                                 <input
                                    type="file"
                                    name="image"
                                    // value={Image}
                                    id="image"
                                    onChange={(e) => {
                                        setImage(e.target.files[0])
                                    }}
                                />

                                 {/* </button> */}

                                 <div className="form-group">
            <button className="btn btn-primary btn-block" disabled={loading}>
              {loading && (
                <span className="spinner-border spinner-border-sm"></span>
              )}
              <span>Add organisation</span>
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
                                {/* <div class="or-divide"><span>or</span></div>
                            <button class="btn w-100">login Now</button> */}
                            </Form>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
};
export default OrganisationAdd;
