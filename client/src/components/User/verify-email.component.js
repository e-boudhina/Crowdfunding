import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {useNavigate, useParams} from "react-router-dom";

import "react-phone-input-2/lib/style.css";
import {verify_email} from "../../actions/auth";



const Verify_email = (props) => {
    const {token} = useParams()
    // console.log(token)


    const [isLoaded, setIsLoaded] = useState(false);
    const [isPageLoaded, setIsPageLoaded] = useState(false); //this helps

    const { message } = useSelector((state) => state.message);
    // console.log("your message :")
    // console.log(message)
    const [successful, setSuccessful] = useState(false);
    const dispatch = useDispatch();
   const navigate = useNavigate();

    useEffect(() => {
        setIsLoaded(true);
        dispatch(verify_email(token)).then(()=>{
            //you can sue status codes here
            setSuccessful(true);
            setTimeout(()=>{

                //     navigate('/login');
                }
            ,5000)
        })
    }, []);

    // if (isLoading){
    //     return <Spinner/>
    // }

    useEffect(() => {
        if (isLoaded) {
            setIsPageLoaded(true);
            console.log('loaded yes')
        }
    }, [isLoaded]);

    // useEffect(() => {
    //
    //
    // },[]);
    //


    const handleRegister = (e) => {
        e.preventDefault();
        setSuccessful(false);
    };

    return (
        // <>here</>
        <div className="login-area pt-120 pb-120">
            <div className="container">
        <div>
    { message && (
        <div className="form-group">
            <div
                className={
                    successful
                        ? "alert alert-success"
                        : "alert alert-danger"
                }
                role="alert"
            >
                {message.message}
            </div>
        </div>
    )}
        </div>
            </div>
        </div>
    );
};
export default Verify_email;
