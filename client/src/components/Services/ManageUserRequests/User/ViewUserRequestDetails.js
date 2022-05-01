
import React from "react";
import {useLocation, useNavigate} from "react-router-dom";
import {approveUserRequest, rejectUserRequest} from "../../../../services/UserRequests.js/UserRequest.service";
import {toast} from "react-toastify";
import { If, Then, ElseIf, Else } from 'react-if-elseif-else-render';
import {Link} from "@material-ui/core";



const ViewUser_UserRequestDetails = () =>{


    const navigate = useNavigate()

    const location = useLocation()
    const currentRequest= location.state
    console.log(currentRequest)

    function accept(id){
        //console.log("accept")
        approveUserRequest(id).then(
            (res) => {
                toast.success(res.data.message)
                // console.log(res.data.message)
                navigate('../services/userRequests')
            })
            .catch((error) =>
                console.log(error)
            )
    }
    function deny(id){
        rejectUserRequest(id).then(
            (res) => {
                toast.success(res.data.message)
                // console.log(res.data.message)
                navigate('../services/userRequests')
            })
            .catch((error) =>
                console.log(error)
            )
    }

    return(
        // <>here</>
        <section className="features-area pt-120 pb-80">
            <div className="container">
                <div className="row align-items-center">
                    <div className="col-xl-9 col-lg-8">
                        <div className="section-title mb-65">
                            <p><span /> All Available User Request</p>
                        </div>
                    </div>
                    <div className="col-xl-3 col-lg-4 d-none d-xl-block">
                        <div className="section-link mb-80 text-lg-right">
                            <button className="btn-border" onClick={() => navigate(-1)}>Go back</button>
                        </div>
                    </div>
                </div>


                    <div className="row">
                        {/*<div className="col-xl-4 col-lg-4 col-md-6">*/}
                        {/*    <div className="features text-center mb-40">*/}
                        <div className="postbox__text p-50 m-5">
                            <div className="post-meta mb-15">
                                <span><i className="far fa-calendar-check" /> Received on "{currentRequest.createdAt}" </span>
                                <span><a href="#"><i className="far fa-user" />Approved By "{currentRequest.incubatorId?currentRequest.incubatorId.username:'Your request is still Pending'}" </a></span>
                            </div>
                            <div className="table-responsive">
                                <h4>Request  details</h4>
                                <table className="table">
                                    <tbody>
                                    <tr>
                                        <th>Desired Location</th>
                                        <td >{currentRequest.desired_Location}</td>
                                    </tr>
                                    <tr>
                                        <th>Prefered starting date</th>
                                        <td >{currentRequest.preferred_Starting_Date}</td>
                                    </tr>
                                    <tr>
                                        <th>Expected ending Date</th>
                                        <td >{currentRequest.expected_Ending_Date}</td>
                                    </tr>
                                    <tr>
                                        <th>Number of employees</th>
                                        <td >{currentRequest.number_Of_Employees}</td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                            <If condition={currentRequest.furniture.length > 0}>
                                <Then>
                            <h4>User Request additional information on furniture</h4>

                            {/*If request has funriture*/}
                            <div className="table-content table-responsive">
                                <table className="table">
                                    <thead>
                                    <tr>
                                        <th className="product-thumbnail"> #Furniture id</th>
                                        <th className="product-subtotal">Furniture Type</th>
                                        <th className="product-quantity">Quantity</th>

                                    </tr>
                                    </thead>
                                    <tbody>
                                    {currentRequest.furniture && currentRequest.furniture.map((f, index) => (
                                    <tr>
                                        <td className="product-thumbnail">{f._id._id}</td>

                                        <td className="product-wis-btn"> {f._id.type}</td>
                                        <td className="product-subtotal">{f.quantity}</td>

                                    </tr>
                                    ))}
                                    </tbody>
                                </table>
                            </div>
                                </Then>

                                    <ElseIf condition={currentRequest.furnished_Requirement ===true}>
                                    <h4>User is requesting a Furnished Office Space</h4>
                                    </ElseIf>
                                    <Else>
                                        <h4>User is requesting an empty Office Space</h4>
                                    </Else>
                            </If>


                        </div>


                    </div>



            </div>
        </section>
    )
}
export default ViewUser_UserRequestDetails
