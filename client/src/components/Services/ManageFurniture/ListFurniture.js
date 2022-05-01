import React, {useEffect, useState} from "react";
import {getFurniture, deleteFurniture, updateFurniture} from "../../../services/Furniture/Furniture.service";
import {useLocation, useNavigate} from "react-router-dom";
import {toast} from "react-toastify";


const ListFurniture = () =>{

    //Setting state
    const [furniture, setFurniture] = useState([])
    const navigate = useNavigate()
    const location = useLocation()

    useEffect(() => {
        retrieveFurniture();
        //console.log('Use effect')
    }, []);

    const retrieveFurniture = () => {
        getFurniture().then(res=>{
           // console.log(res.data)
            setFurniture(res.data)
        })
    }

    const edit = (f)=>{
        navigate('/admin/furniture/edit/'+f._id,{state: f})
    }
    const add = () =>{
        navigate('/admin/furniture/add')
    }
    const dle = (id) => {
        // tried to use use effect instead of navigate to refresh the page after delete but failed console.log('delete')
        deleteFurniture(id).then(
            (res)=> {
                toast.success(res.data.message)
                // console.log(res.data.message)
                retrieveFurniture()
            })
            .catch((error)=>
                console.log(error)
            )
    }

    return (
    <div className="container">
        <div className="card-body">
            <h4 className="card-title mb-4">Furniture</h4>  <a onClick={()=>add()} className="btn btn-success btn-sm float-end">Add new</a>&nbsp;
            <div className="table-responsive">
                <table className="table table-hover table-centered table-nowrap mb-0">
                    <thead>
                    <tr>
                        <th scope="col">(#) Id</th>
                        <th scope="col">Type</th>
                        <th scope="col" >Actions</th>
                    </tr>
                    </thead>
                    <tbody>

                    {furniture && furniture.map((f, index) => (
                        <tr key={index}>
                            <th scope="row">{f._id}</th>

                            <td>{f.type}</td>
                            {/*<td>{user.verified?'Yes':'No'}</td>*/}
                            {/*<td><span className="badge bg-success">{tutorial.createdAt}</span></td>*/}
                            <td>
                                <div>
                                    <a onClick={()=>edit(f)} className="btn btn-primary btn-sm">Edit</a>&nbsp;

                                    <a onClick={()=>dle(f._id)}className="btn btn-danger btn-sm">Delete</a>&nbsp;

                                    {/*{user.roles.find(o => o.name === 'user' || o.name ==='incubator')?'true':'false'}*/}


                                </div>
                            </td>
                        </tr>

                    ))}


                    </tbody>
                </table>
            </div>
        </div>
    </div>
    )
    }
export default ListFurniture
