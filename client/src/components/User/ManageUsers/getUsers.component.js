import React, {useEffect, useState} from "react";
import {get_Users, ban_User, unban_User, delete_User, make_Admin,make_Incubator,make_User} from "../../../actions/User/user";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import {clearMessage} from "../../../actions/message";
import Pagination from "../../Pagination";


const Users = () => {

    function refreshPage() {
        window.location.reload();
    }
    //You can use simple functions here and call dispatch inside
    // function ban(){
    //
    // }
    // function unban(){
    //
    // }
    // function mkAdmin(){
    //
    // }
    // function mkIncubator(){
    //
    // }
    // function mkUser(){
    //
    // }
    // function dlt(){
    //
    // }

    const { message } = useSelector(state => state.message);

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const users = useSelector((state) => state.users);

    //Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [usersPerPage, setUsersPerPage] = useState(3);
    const indexOfLastUser = currentPage* usersPerPage
    const indexOfFirstUser = indexOfLastUser - usersPerPage
    const currentUsers = users.users.slice(indexOfFirstUser, indexOfLastUser)

    //Change page
    const paginate = (pageNumber)=>setCurrentPage(pageNumber)

    //console.log(users)
    useEffect( () => {
        dispatch(get_Users())
        if (message)
        toast.success(message).then(dispatch(clearMessage()))
       // return () => {dispatch(clearMessage())}
    }, [message]);

    //there is no need to execute fetch user method since we arelad have all the users | 2 method possible either props or modular
    const update = (user)=>{
        //console.log(user)
        navigate('/admin/user/update/'+user.username,{state: user})
    }

    return(
        <div className="card-body">
            <h4 className="card-title mb-4">Your Users List</h4>
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
                    currentUsers.map((user, index) => (
                        <tr key={index}>
                            <th scope="row">{user._id}</th>
                            <td>
                                <div>
                                    {/*<img src="assets/images/users/user-6.jpg" alt="" className="avatar-xs rounded-circle me-2" /> */}
                                    {user.username}
                                </div>
                            </td>
                            <td>{user.email}</td>
                            <td>{user.verified?'Yes':'No'}</td>
                            {/*<td><span className="badge bg-success">{tutorial.createdAt}</span></td>*/}
                            <td>
                                <div>
                                    {/*<a onClick={()=>update(user)}  className="btn btn-primary btn-sm">Edit</a>&nbsp;*/}
                                    {/*<Link className="btn btn-primary btn-sm"*/}
                                    {/*    to={`/admin/user/update/${user.username}`}*/}
                                    {/*    state={{ ...user }}*/}
                                    {/*>Edit</Link>*/}
                                    {user.isBanned ?
                                        <a onClick={()=>dispatch(unban_User(user.username))} className="btn btn-success btn-sm">Unban</a>
                                        :
                                        <a onClick={()=>dispatch(ban_User(user.username))} className="btn btn-blue-grey btn-sm">Ban</a>
                                    }&nbsp;


                                    <a onClick={()=>dispatch(delete_User(user._id))} className="btn btn-danger btn-sm">Delete</a>&nbsp;
                                    <a  onClick={()=>dispatch(make_Admin(user._id))}className="btn btn-outline-dark btn-sm">Make Admin</a>&nbsp;
                                    {/*{user.roles.find(o => o.name === 'user' || o.name ==='incubator')?'true':'false'}*/}
                                    {user.roles.find(o => o.name === 'user' && user.roles.length ===1 )?
                                        <a  onClick={()=>dispatch(make_Incubator(user._id))}className="btn btn-secondary btn-sm">Make Incubator</a>
                                        :
                                        <a  onClick={()=>dispatch(make_User(user._id))}className="btn btn-outline-info btn-sm">Make User</a>}
                                </div>
                            </td>
                        </tr>

                    ))}


                    </tbody>
                </table>
                <Pagination itemsPerPage={usersPerPage} totalItems={users.users.length} paginate={paginate}/>
            </div>
        </div>
    )
}
export default Users
