import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {useNavigate, useParams} from "react-router-dom";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";
import { register, updateProfile , deleteUser , logout} from "../../actions/auth";
import DatePicker from "react-datepicker";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import {verify_email} from "../../actions/auth";



const Verify_email = () => {
    const {token} = useParams()
    console.log(token)

    const [isLoaded, setIsLoaded] = useState(false);
    const [isPageLoaded, setIsPageLoaded] = useState(false); //this helps

    useEffect(() => {
        setIsLoaded(true);
        dispatch(verify_email(token))
    }, []);


    useEffect(() => {
        if (isLoaded) {
            setIsPageLoaded(true);
            console.log('loaded yes')
        }
    }, [isLoaded]);

    const [successful, setSuccessful] = useState(false);
    const { message } = useSelector((state) => state.message);
    const dispatch = useDispatch();
    let navigate = useNavigate();


    // useEffect(() => {
    //
    //
    // },[]);
    //
    const handleUpdate = (e) => {
        e.preventDefault();

    };

    const handleRegister = (e) => {
        e.preventDefault();
        setSuccessful(false);
    };

    return (
        <>here</>
        // { message && (
        //     <div className="form-group">
        //         <div
        //             className={
        //                 successful ? "alert alert-success" : "alert alert-danger"} role="alert">
        //             {message}
        //         </div>
        //     </div>
        // )}
    );
};
export default Verify_email;
