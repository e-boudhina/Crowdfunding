import React from "react";


const VerifyEmailStaticComponent = () =>{

    const requestNewVerificationEmail = ()=> {

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
