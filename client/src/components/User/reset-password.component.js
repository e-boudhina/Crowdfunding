import React, {useState, useRef, useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";

import {login, register} from "../../actions/auth";
import {reset_password} from "../../actions/auth";


const Reset_password = () => {
    const form = useRef();
    const checkBtn = useRef();
    const [username, setUsername] = useState("");

    const [successful, setSuccessful] = useState(false);
    const { message } = useSelector(state => state.message);
    const dispatch = useDispatch();


    const required = (value) => {
        if (!value) {
            return (
                <div className="alert alert-danger" role="alert">
                    This field is required!
                </div>
            );
        }
    };
    const vusername = (value) => {
        if (value.length < 3 || value.length > 20) {
            return (
                <div className="alert alert-danger" role="alert">
                    The username must be between 3 and 20 characters.
                </div>
            );
        }
    };



    const onChangeUsername= (e) => {
        const username = e.target.value;
        setUsername(username);
    };

    const handleReset = (e) => {
        e.preventDefault();
        form.current.validateAll();
        dispatch(reset_password(username))
    };

    //make sure that the user can not go to this component if he is already logged in
    useEffect = () =>{

    }
    return (
        <div className="login-area pt-120 pb-120">
            <div className="container">
                <div className="row">
                    <div className="col-lg-8 offset-lg-2">
                        <div className="basic-login">
                            <h3 className="text-center mb-60">Reset password From Here</h3>
                            <Form onSubmit={handleReset} ref={form}>
                                {!successful && (
                                    <div>
                                        <div className="form-group">


                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="email">Username</label>
                                            <Input
                                                type="text"
                                                className="form-control"
                                                name="username"
                                                // value={email}
                                                 onChange={onChangeUsername}
                                                 validations={[required, vusername]}
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