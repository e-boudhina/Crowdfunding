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


    const [loading, setLoading] = useState(false);
    // const { ProjectAdded } = useSelector(state => state.auth);
    const { message } = useSelector(state => state.message);



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



        console.log(formData);
        //  formData.current.validateAll();
        // if (checkBtn.current.context._errors.length === 0) {
        dispatch(updateOrganisation(location.state.id,formData))
        
            .then(() => {

                console.log(formData);
                // props.history.push("/ListProject");
         
                navigate("/profile")
        
             
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
    };
    return (



        <Form onSubmit={handleUpdateOrganisation} encType="multipart/form-data">

        <label htmlFor="name">Name :</label>
        <Input
            type="text"
            className="form-control"
            name="name"
            value={name}
            onChange={onChangeName}
            validations={[required]}
        />


        <label htmlFor="email">Email :</label>
        <Input
            type="text"
            className="form-control"
            name="email"
            value={email}
            onChange={onChangeEmail}
            validations={[required]}
        />


        <label htmlFor="phone">Cell phone number:</label>
        <Input
            type="number"
            className="form-control"
            name="phone"
            value={phone}
            onChange={onChangePhone}
            validations={[required]}
        />
        <label htmlFor="fax"> fax number:</label>
        <Input
            type="number"
            className="form-control"
            name="fax"
            value={fax}
            onChange={onChangeFax}
            validations={[required]}
        />

        <label htmlFor="adress"> Address :</label>
        <Input
            type="text"
            className="form-control"
            name="adress"
            value={adress}
            onChange={onChangeAdress}
            validations={[required]}
        />
        <label htmlFor="description"> description :</label>
        <Input
            type="text"
            className="form-control"
            name="description"
            value={description}
            onChange={onChangeDescription}
            validations={[required]}
        />
      
        <label htmlFor="Secteur"> Secteur:</label>
        <Input
            type="text"
            className="form-control"
            name="Secteur"
            value={Secteur}
            onChange={onChangeSecteur}
            validations={[required]}
        />
      
        <label htmlFor="image">Image upload</label>
        <input
            type="file"
            name="image"
            // value={Image}
            id="image"
            onChange={(e) => {
                setImage(e.target.files[0])
            }}
        />

        <div>

            <button type="submit" class="btn">Submit</button>
  
        </div>
    </Form>

    );
}
export default UppdateOrganisation;