import React, {useEffect} from "react";
import {get_Users, ban_User, unban_User, delete_User, make_Admin} from "../../../actions/User/user";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";


const Users = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const users = useSelector((state) => state.users);
    console.log(users)
    useEffect(async () => {
        dispatch(get_Users())
        // console.log(users.length)
    }, []);

    //there is no need to execute fetch user method since we arelad have all the users | 2 method possible either props or modular
    const update = (user)=>{
        //console.log(user)
        navigate('/admin/user/update/'+user.username)
    }

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

                    {users &&
                    users.users.map((user, index) => (
                        <tr>
                            <th scope="row">{user._id}</th>
                            <td>
                                <div>
                                    <img src="assets/images/users/user-6.jpg" alt="" className="avatar-xs rounded-circle me-2" /> {user.username}
                                </div>
                            </td>
                            <td>{user.email}</td>
                            <td>{user.verified?'Yes':'No'}</td>
                            {/*<td><span className="badge bg-success">{tutorial.createdAt}</span></td>*/}
                            <td>
                                <div>
                                    <a onClick={()=>update(user)}  className="btn btn-primary btn-sm">Edit</a>&nbsp;
                                    {user.isBanned ?
                                        <a onClick={()=>dispatch(unban_User(user.username))} className="btn btn-success btn-sm">Unban</a>
                                        :
                                        <a onClick={()=>dispatch(ban_User(user.username))} className="btn btn-blue-grey btn-sm">Ban</a>
                                    }&nbsp;


                                    <a onClick={()=>dispatch(delete_User(user._id))} className="btn btn-danger btn-sm">Delete</a>&nbsp;
                                    <a  onClick={()=>dispatch(make_Admin(user._id))}className="btn btn-outline-dark btn-sm">Make Admin</a>

                                </div>
                            </td>
                        </tr>

                    ))}


                    </tbody>
                </table>
            </div>
        </div>
    )
}
export default Users
