import React, {useState, useRef, useEffect} from "react";
import  {useParams} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";
import {toast} from "react-toastify";
import {new_password} from "../../actions/auth";



const New_password = (props) => {
    const {token} = useParams()
    console.log(token)
    const form = useRef();
    const checkBtn = useRef();
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");

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
    const vpassword = (value) => {
        if (value.length < 3 || value.length > 20) {
            return (
                <div className="alert alert-danger" role="alert">
                    The username must be between 3 and 20 characters.
                </div>
            );
        }
    };



    const onChangePassword= (e) => {
        const password = e.target.value;
        setPassword(password);
    };
    const onChangePassword2= (e) => {
        const password2 = e.target.value;
        setPassword2(password2);
    };

    const handleReset = (e) => {
        e.preventDefault();
        form.current.validateAll();
        if(password !== password2) {
            console.log('here')
            toast.error('Passwords do not match')
        }
         dispatch(new_password(password, token))
    };

    //make sure that the user can not go to this component if he is already logged in
    // useEffect = () =>{
    //
    // }
    return (
        <div className="login-area pt-120 pb-120">
            <div className="container">
                <div className="row">
                    <div className="col-lg-8 offset-lg-2">
                        <div className="basic-login">
                            <h3 className="text-center mb-60">Enter your new password here</h3>
                            <Form onSubmit={handleReset} ref={form}>
                                {!successful && (
                                    <div>
                                        <div className="form-group">


                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="password">Password</label>
                                            <Input
                                                type="text"
                                                className="form-control"
                                                name="password"
                                                // value={email}
                                                onChange={onChangePassword}
                                                validations={[required, vpassword]}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="password2">ReEnter your password</label>
                                            <Input
                                                type="text"
                                                className="form-control"
                                                name="password2"
                                                // value={email}
                                                onChange={onChangePassword2}
                                                validations={[required, vpassword]}
                                            />
                                        </div>

                                        <div className="form-group">
                                            <button className="btn btn-black w-100">Save</button>
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
export default New_password;
