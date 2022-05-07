import React from "react";
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";
import AuthService from "../../services/auth.service";
import {refreshUser} from "../../actions/auth";
import { useDispatch, useSelector } from "react-redux";

const VerifyEmailStaticComponent = () =>{

    const dispatch = useDispatch()
    const navigate = useNavigate
    const requestNewVerificationEmail = ()=> {
        AuthService.resend_Verify_Email_Token().then(
            (res) => {
                toast.success(res.data.message)
                navigate('/')
            })
            .catch((error) =>
            console.log(error)
        )
    }

    return(

        <div className="login-area pt-120 pb-120">
            <div className="container">
                <div className="row">
                    <div className="col-lg-8 offset-lg-2">
                        <div className="basic-login">
                            <h3 className="text-center mb-60">Awaiting Account Verification</h3>

                            <div className="form-group">
                                        <div
                                            className={"alert alert-success"}
                                            role="alert"
                                        >
                                            Please verify your email to complete your registration!
                                        </div>
                                    </div>
                            <div className="form-group text-center">
                                        <div
                                            className={"btn btn-info"}
                                            onClick={()=>requestNewVerificationEmail()}
                                        >
                                            If you did not receive an email. Click Here!
                                        </div>
                                    </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default VerifyEmailStaticComponent
