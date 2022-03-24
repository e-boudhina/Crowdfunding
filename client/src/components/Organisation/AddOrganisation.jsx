import React, { useState, useRef } from "react";
import { Navigate } from 'react-router-dom';
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router';
import axios from 'axios';
// import { login } from "../../actions/auth";
import { AddOrganisation } from "../../actions/Organisations/OrganisationCrud.actions";

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


    const navigate = useNavigate();







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



    //   const onChangeFile = (e) => {
    //     setImage({
    //       image:e.target.files[0]

    //     });

    // }









    const handleAddOrganisation = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('image', Image);
        formData.append('name', name);
        formData.append('phone', phone);
        formData.append('fax', fax);
        formData.append('adress', adress);
        formData.append('description', description);
        formData.append('Secteur', Secteur);
        formData.append('ownerName', currentUser.username);
        formData.append('email', email);


        console.log(formData);
        //  formData.current.validateAll();
        // if (checkBtn.current.context._errors.length === 0) {
        dispatch(AddOrganisation(formData))
            .then(() => {

                console.log(formData);
                // props.history.push("/ListProject");
                // window.location.reload();
                navigate("/profile")
            }).
            catch((e) => {
                console.log(e);
            });


    }
    return (



        <Form onSubmit={handleAddOrganisation} encType="multipart/form-data">

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
          
            <label htmlFor="ownerName"> Owner name</label>
            <Input
                type="text"
                disabled
                className="form-control"
                name="ownerName"
                value={currentUser.username}
                // onChange={onChangeOwnerName}
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
};
export default OrganisationAdd;