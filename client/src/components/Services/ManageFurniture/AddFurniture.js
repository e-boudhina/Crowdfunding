import React, {useRef, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import {addFurniture} from "../../../services/Furniture/Furniture.service";
import {toast} from "react-toastify";
import {isEmail} from "validator";
import CheckButton from "react-validation/build/button";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";

const AddFurniture = () => {

    const navigate = useNavigate()
    const form = useRef();
    const checkBtn = useRef();
    const [data, setData] = useState({
        type: ""
    })
    function eventTriggered(e){
        const newData = { ...data}
        newData[e.target.id]= e.target.value
        setData(newData)
        //console.log("here")
        //  console.log(data)
    }
    const handleAdd = (e)=>{
        e.preventDefault()
        form.current.validateAll();
        if (checkBtn.current.context._errors.length === 0) {
            //console.log(data)
            addFurniture(data).then(
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

    return(
        <div className="container">
            <div className="card-body">
                <h4 className="card-title mb-4">Add Furniture</h4>
                <Form onSubmit={handleAdd} ref={form}>
                    <div className="row">
                        <div className="col">
                            <label htmlFor="type">Type</label>
                            <Input
                                id="type"
                                type="text"
                                className="form-control"
                                onChange={(e)=> eventTriggered(e) }
                                validations={[required, vType]}
                            />

                        </div>

                        <div className="form-group">
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
export default AddFurniture
