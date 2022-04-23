import React, {useEffect, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import {
    getIncubator_UserRequests,
    getUser_UserRequests
} from "../../../../services/UserRequests.js/UserRequest.service";
import {Else, If, Then} from "react-if-elseif-else-render";

const ListIncubatorUserRequests = () =>{


    //Setting state
    const [userRequests, setUserRequests] = useState([])
    const navigate = useNavigate()
    const location = useLocation()

    useEffect(() => {
        retrieveUserRequests();
        //console.log('Use effect')
    }, []);

    const retrieveUserRequests = () => {
        getIncubator_UserRequests().then(res=>{
            console.log(res.data)
            setUserRequests(res.data)
        })
    }

    const view = (uR)=>{
        navigate('/services/userRequests/incubator/view/'+uR._id,{state: uR})
    }

    return(
        <section className="features-area pt-120 pb-80">
            <div className="container">
                <div className="card-body">
                    <h4 className="card-title mb-4">Your Approved / Rejected User Requests </h4>
                    <div className="table-responsive">
                        <table className="table table-hover table-centered table-nowrap mb-0">
                            <thead>
                            <tr>
                                <th scope="col">(#) Request Id</th>
                                <th scope="col">Submitted At</th>
                                <th scope="col">Status</th>
                                <th scope="col">ApprovedBy</th>
                                <th scope="col" >Actions</th>
                            </tr>
                            </thead>
                            <tbody>

                            {userRequests &&
                            userRequests.map((uR, index) => (
                                <tr>
                                    <th scope="row">{uR._id}</th>
                                    <td>{uR.createdAt}</td>
                                    <td>
                                        <If condition={uR.status ===undefined}>
                                            <Then>
                                                <button className="btn-secondary" disabled >Pending</button>

                                            </Then>
                                            <Else>
                                                <If condition={uR.status ===true}>
                                                    <Then>
                                                        <button className="btn-success" disabled >Approved</button>
                                                    </Then>
                                                    <Else>
                                                        <button className="btn-danger" disabled > Rejected</button>

                                                    </Else>
                                                </If>
                                            </Else>
                                        </If>
                                    </td>
                                    <td>{uR.incubatorId?uR.incubatorId.username:'...'}</td>
                                    <td>
                                        <div>

                                            <a  onClick={()=>view(uR)} className="btn btn-info ">View details</a>
                                        </div>
                                    </td>
                                </tr>


                            ))}
                            {/*{ users ?'':'There are no user yer'}*/}


                            </tbody>
                        </table>
                    </div>
                </div>

            </div>
        </section>
    )
}
export default ListIncubatorUserRequests
