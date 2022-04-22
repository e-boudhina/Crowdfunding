import React, {useEffect, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import {getUserRequests} from "../../../../services/UserRequests.js/UserRequest.service";
import { If, Then, ElseIf, Else } from 'react-if-elseif-else-render';
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
                <div className="row">
                    {/*<div className="col-xl-4 col-lg-4 col-md-6">*/}
                    {/*    <div className="features text-center mb-40">*/}
                    <div className="postbox__text p-50 m-5">
                        <div className="post-meta mb-15">
                            <span><i className="far fa-calendar-check" /> {uR.createdAt} </span>
                            <span><a href="#"><i className="far fa-user" />{uR.userId.username}</a></span>
                        </div>
                        <h3 className="blog-title">
                            <a onClick={()=>view(uR)}>


                                <If condition={uR.furnished_Requirement !== undefined}>
                                    <Then>
                                        <If condition={uR.furnished_Requirement}>
                                            <Then>
                                                User is requesting a furnished Office Space
                                            </Then>
                                            <Else>
                                                User is requesting an Empty Office Space
                                            </Else>
                                            </If>
                                    </Then>
                                    <Else>
                                        User is requesting a custom Office Space
                                    </Else>
                                    </If>


                            </a>
                        </h3>
                        <div className="post-text mb-20">
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
                                aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo.</p>
                        </div>
                        <div className="read-more mt-30">
                            <a href="#" className="btn btn-black">View Details</a>
                        </div>
                    </div>
                    {/*    </div>*/}
                    {/*</div>*/}

                </div>

                ))}
            </div>
        </section>
    )
}
export default ListUserRequests
