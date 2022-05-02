import React, {useRef, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import { updateFurniture} from "../../../services/Furniture/Furniture.service";
import CheckButton from "react-validation/build/button";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import {toast} from "react-toastify";

const EditFurniture = () => {

    const form = useRef();
    const checkBtn = useRef();
    const navigate = useNavigate()
    const location = useLocation()
    const currentFurniture= location.state
    const [data, setData] = useState({
        newType: currentFurniture.type
    })
    function eventTriggered(e){

        const newData = { ...data}
        newData[e.target.id]= e.target.value
        setData(newData)
        //console.log("here")
      //  console.log(data)
    }
    const handleUpdate = (e)=>{
        e.preventDefault()
        form.current.validateAll();
        //console.log(data)
        if (checkBtn.current.context._errors.length === 0) {

            updateFurniture(currentFurniture._id, data).then(
                (res) => {
                    toast.success(res.data.message)
                    // console.log(res.data.message)
                    navigate('../furniture')
                })
                .catch((error) =>
                    console.log(error)
                )
        }
    }

    const required = (value) => {
        if (!value) {
            return (
                <div className="alert alert-danger" role="alert">
                    This field is required!
                </div>
            );
        }
    };
    const vType = (value) => {
        if (value.length < 4 || value.length > 15) {
            return (
                <div className="alert alert-danger" role="alert">
                    The type must be between 4 and 15 characters.
                </div>
            );
        }
    };

    return (
        <div className="container">
            <div className="card-body">
                <h4 className="card-title mb-4">Edit Furniture</h4>
                <Form onSubmit={handleUpdate} ref={form}>
                    <div className="row">
                        <div className="col">
                            <label className="mb-2" htmlFor="type">Type</label>

                            <Input
                                id="newType"
                                type="text"
                                className="form-control"
                               value={data.newType}
                                onChange={(e)=> eventTriggered(e) }
                                validations={[required, vType]}
                            />

                        </div>

                        <div className="form-group" style={{display: 'flex',  justifyContent:'center', alignItems:'center', marginTop:'10px'}}>
                            <button className="btn btn-primary btn-block" >
                                <span>Update</span>
                            </button>
                        </div>

                    </div>
                    <CheckButton style={{ display: "none" }} ref={checkBtn} />

                </Form>

            </div>
        </div>


    )

}
export default EditFurniture
