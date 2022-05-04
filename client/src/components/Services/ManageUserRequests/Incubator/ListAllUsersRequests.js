import React, {useEffect, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import {getUserRequests} from "../../../../services/UserRequests.js/UserRequest.service";
import { If, Then, ElseIf, Else } from 'react-if-elseif-else-render';
import TimeAgo from 'javascript-time-ago'

import en from 'javascript-time-ago/locale/en.json'

import ReactTimeAgo from "react-time-ago";

TimeAgo.addDefaultLocale(en)
TimeAgo.addLocale(en)

const ListUserRequests = () =>{

    //Setting state
    const [userRequests, setUserRequests] = useState([])
    const navigate = useNavigate()
    const location = useLocation()

    useEffect(() => {
        retrieveUserRequests();
        //console.log('Use effect')
    }, []);

    const retrieveUserRequests = () => {
        getUserRequests().then(res=>{
            console.log(res.data)
            setUserRequests(res.data)
        })
    }
    const view = (uR)=>{
        navigate('/services/userRequests/view/'+uR._id,{state: uR})
    }
    return(
        <section className="features-area pt-120 pb-80">
            <div className="container">
                <div className="row align-items-center">
                    <div className="col-xl-9 col-lg-8">
                        <div className="section-title mb-65">
                            <p><span /> User Requests</p>
                        </div>
                    </div>
                    <div className="col-xl-3 col-lg-4 d-none d-xl-block">
                        <div className="section-link mb-80 text-lg-right">
                            <a className="btn-border" href="#">features</a>
                        </div>
                    </div>
                </div>
                {userRequests && userRequests.map((uR, index) => (
                <div className="row" key={index}>
                    {/*<div className="col-xl-4 col-lg-4 col-md-6">*/}
                    {/*    <div className="features text-center mb-40">*/}
                    <div className="postbox__text p-50 m-5">
                        <div className="post-meta mb-15">
                            <span><i className="far fa-calendar-check" /> Received <ReactTimeAgo date={ Date.parse(uR.createdAt)} /></span>
                            <span><a href="#"><i className="far fa-user" />{uR.userId.username}</a></span>
                        </div>
                        <h3 className="blog-title">
                            <a onClick={()=>view(uR)}>


                                <If condition={uR.furnished_Requirement !== undefined}>
                                    <Then>
                                        <If condition={uR.furnished_Requirement}>
                                            <Then>
                                                Requesting a furnished Office Space
                                            </Then>
                                            <Else>
                                                Requesting an Empty Office Space
                                            </Else>
                                            </If>
                                    </Then>
                                    <Else>
                                        Requesting a custom Office Space
                                    </Else>
                                    </If>


                            </a>
                        </h3>
                        <div className="post-text mb-20">
                            <p> {uR.userId.firstName +" "+uR.userId.lastName} request is pending your review <br/>
                            You can email this user : {uR.userId.email} or call him directly at : {uR.userId.phone}</p>
                        </div>
                        <div className="read-more mt-30">
                            <a onClick={()=>view(uR)} className="btn btn-black">View Details</a>
                        </div>
                    </div>
                    {/*    </div>*/}
                    {/*</div>*/}

                </div>

                ))}
                {userRequests.length ===0 ?<h3 className="blog-title" >There are no pending userRequests Yet</h3>:""}
            </div>
        </section>
    )
}
export default ListUserRequests
