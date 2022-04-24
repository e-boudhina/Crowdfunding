import {useNavigate} from "react-router-dom";
import React, {useEffect, useRef, useState} from "react";
import {addFurniture, getFurniture} from "../../../../services/Furniture/Furniture.service";
import {toast} from "react-toastify";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { If, Then, ElseIf, Else } from 'react-if-elseif-else-render';

const AddUserRequest = () =>{

    const [furniture, setFurniture] = useState([])

    useEffect(() => {
        retrieveFurniture();
        //console.log('Use effect')
    }, []);

    const retrieveFurniture = () => {
        getFurniture().then(res=>{
             console.log(res.data)
            setFurniture(res.data)
        })
    }
    const navigate = useNavigate()
    const form = useRef();
    const checkBtn = useRef();
    var showCustomFurnitureForm= false

    const [data, setData] = useState({
        desired_Location: "",
        preferred_Starting_Date: "",
        expected_Ending_Date: "",
        number_Of_Employees: 0,
        furnished_Requirement: undefined,
        furniture: undefined,
    })
    function eventTriggered(e){
        const newData = { ...data}
        newData[e.target.id]= e.target.value
        setData(newData)
        console.log("here")
        // console.log(e.target.id)
        // console.log(e.target.value)

        console.log(data)
    }
    function officeSpaceType(e){
        const newData = { ...data}
        if (e.target.id ==="office_Space_Type" && e.target.value==="custom"){
            showCustomFurnitureForm = true
            console.log("target hit");
            console.log(showCustomFurnitureForm);

        }else{
            showCustomFurnitureForm = false
        }

    }

    const handleAdd = (e)=>{
        e.preventDefault()
        console.log(showCustomFurnitureForm ===true);
        // form.current.validateAll();
        // if (checkBtn.current.context._errors.length === 0) {
        //     console.log(data)
        //     addFurniture(data).then(
        //         (res) => {
        //             toast.success(res.data.message)
        //             // console.log(res.data.message)
        //             navigate('../furniture')
        //         })
        //         .catch((error) =>
        //             console.log(error)
        //         )
        // }
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
                <h4 className="card-title mb-4">Submit New User Request</h4>
                <Form onSubmit={handleAdd} ref={form}>
                    <div className="row">
                        <div className="col">


                            <label htmlFor="desired_Location">Desired location</label>
                            <Input
                                id="desired_Location"
                                type="text"
                                className="form-control"
                                onChange={(e)=> eventTriggered(e) }
                                validations={[required, vType]}
                            />

                        </div>

                        <div className="col">

                            <label htmlFor="number_Of_Employees">Number Of Employees</label>
                            <Input
                                id="number_Of_Employees"
                                type="number"
                                className="form-control"
                                onChange={(e)=> eventTriggered(e) }
                                validations={[required]}
                            />

                        </div>
                    </div>

                    <div className="row">
                        <div className="col">


                            <label htmlFor="desired_Location">Preferred Starting Date</label>
                            <Input
                                id="preferred_Starting_Date"
                                type="date"
                                className="form-control"
                                onChange={(e)=> eventTriggered(e) }
                                validations={[required, vType]}
                            />

                        </div>
                        <div className="col">


                            <label htmlFor="expected_Ending_Date">Expected Ending Date</label>
                            <Input
                                id="expected_Ending_Date"
                                type="date"
                                className="form-control"
                                onChange={(e)=> eventTriggered(e) }
                                validations={[required, vType]}
                            />

                        </div>
                    </div>

                    <div className="row">
                        <div className="col">
                            Select The Type Of office you like:
                            <div className="furnished_Requirement" onChange={(e)=> {officeSpaceType(e);eventTriggered(e)} }>
                                <input type="checkbox" id="furnished_Requirement"  value="true" />Empty Office Space
                                <input type="checkbox" id="furnished_Requirement" value="false" />Furnished Office Space
                                <input type="checkbox" id="office_Space_Type"  value="custom" />Custom
                            </div>
                        </div>

                    </div>

                    <If condition={showCustomFurnitureForm ===false}>
                        <Then>
                            {/*//Show form*/}
                    <div className="row">
                        <div className="col">
                        <div className="form-group">
                            <label>
                                Pick your the type of your office space:
                                <select  id="furnished_Requirement" onChange={(e)=> eventTriggered(e) }>
                                    <option value="" selected disabled>Please select an option</option>
                                    <option value="false">Empty Office Space</option>
                                    <option value="true">Furnished Office Space</option>
                                </select>
                            </label>

                        </div>

                            {/*showcase them like this*/}
                            <h4>Please select the furniture you would like to obtain along with the quantity</h4>

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
                                    {furniture && furniture.map((f, index) => (
                                        <tr>
                                            <td className="product-thumbnail">{f._id}</td>

                                            <td className="product-wis-btn"> {f.type}</td>
                                            <td className="product-subtotal justify-content-center"><input type="number" className="form-control col-2"/></td>

                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                            </div>
                    </div>
                    </div>
                        </Then>
                            <Else>
                                Nothing to show {showCustomFurnitureForm===false?"false":"true"}
                            </Else>
                        </If>
                    <div className="row">
                        <div className="col">
                        <div className="form-group">
                            <button className="btn btn-primary btn-block" >
                                <span>Submit Request</span>
                            </button>
                        </div>
                    </div>
                    </div>
                    <CheckButton style={{ display: "none" }} ref={checkBtn} />

                </Form>


            </div>
        </div>


    )
}
export default AddUserRequest
