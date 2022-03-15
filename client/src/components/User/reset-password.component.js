import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";

import { register } from "../../actions/auth";


const Reset_password = () => {
    const form = useRef();
    const checkBtn = useRef();
    const [username, setUsername] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("")
    const [address, setAddress] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [birthdate, setBirthdate] = useState(new Date());
    const [successful, setSuccessful] = useState(false);
    const { message } = useSelector(state => state.message);
    const dispatch = useDispatch();

    const onChangePhone = (e) => {
        const phone = e.target.value;
        setPhone(phone);
    }
    const onChangeAddress = (e) => {
        const address = e.target.value;
        setAddress(address);
    }
    const onChangeEmail = (e) => {
        const email = e.target.value;
        setEmail(email);
    };

    const handleRegister = (e) => {
        e.preventDefault();
    };
    return (
        <div className="login-area pt-120 pb-120">
            <div className="container">
                <div className="row">
                    <div className="col-lg-8 offset-lg-2">
                        <div className="basic-login">
                            <h3 className="text-center mb-60">Recover password From Here</h3>
                            <Form onSubmit={handleRegister} ref={form}>
                                {!successful && (
                                    <div>
                                        <div className="form-group">


                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="email">Email</label>
                                            <Input
                                                type="text"
                                                className="form-control"
                                                name="email"
                                                // value={email}
                                                // onChange={onChangeEmail}
                                                // validations={[required, validEmail]}
                                            />
                                        </div>

                                        <div className="form-group">
                                            <button className="btn btn-black w-100">Reset</button>
                                        </div>
                                    </div>
                                )}
                                {message && (
                                    <div className="form-group">
                                        <div className={ successful ? "alert alert-success" : "alert alert-danger" } role="alert">
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
export default Reset_password;
