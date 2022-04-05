import React, {useEffect} from "react";
import {get_Users} from "../../actions/User/user";
import {useDispatch, useSelector} from "react-redux";


const Users = () => {

    const dispatch = useDispatch();
    const users = useSelector((action) => action.payload);
    console.log(users)
    useEffect(async () => {

        document.body.appendChild(document.createElement("script")).src = "assets-back/libs/jquery/jquery.min.js";
        dispatch(get_Users())
        // console.log(users.length)
    }, [users]);

    return(
        <div className="card-body">
            <h4 className="card-title mb-4">Latest Transaction</h4>
            <div className="table-responsive">
                <table className="table table-hover table-centered table-nowrap mb-0">
                    <thead>
                    <tr>
                        <th scope="col">(#) Id</th>
                        <th scope="col">User Name</th>
                        <th scope="col">email</th>
                        <th scope="col">Verified</th>
                        <th scope="col" >Actions</th>
                    </tr>
                    </thead>
                    <tbody>

                    {/*{tutorials &&*/}
                    {/*tutorials.map((tutorial, index) => (*/}
                    {/*    <tr>*/}
                    {/*        <th scope="row">{tutorial._id}</th>*/}
                    {/*        <td>*/}
                    {/*            <div>*/}
                    {/*                <img src="assets/images/users/user-6.jpg" alt="" className="avatar-xs rounded-circle me-2" /> {tutorial.name}*/}
                    {/*            </div>*/}
                    {/*        </td>*/}
                    {/*        <td>19/1/2019</td>*/}
                    {/*        <td>$120</td>*/}
                    {/*        <td><span className="badge bg-success">{tutorial.createdAt}</span></td>*/}
                    {/*        <td>*/}
                    {/*            <div>*/}
                    {/*                <a href="#" className="btn btn-primary btn-sm">Edit</a>*/}
                    {/*            </div>*/}
                    {/*        </td>*/}
                    {/*    </tr>*/}

                    {/*))}*/}


                    </tbody>
                </table>
            </div>
        </div>
    )
}
export default Users
