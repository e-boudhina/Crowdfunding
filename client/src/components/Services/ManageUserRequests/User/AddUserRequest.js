import { useNavigate } from "react-router-dom";
import React, { useEffect, useRef, useState } from "react";
import {
    addFurniture,
    getFurniture,
} from "../../../../services/Furniture/Furniture.service";
import { toast } from "react-toastify";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { If, Then, ElseIf, Else } from "react-if-elseif-else-render";
import {addUserRequest} from "../../../../services/UserRequests.js/UserRequest.service";

const AddUserRequest = () => {
    //retrieved database furniture
    const [furniture, setFurniture] = useState([]);

    useEffect(() => {
        retrieveFurniture();
        //console.log('Use effect')
    }, []);

    const retrieveFurniture = () => {
        getFurniture().then((res) => {
            console.log(res.data);
            setFurniture(res.data);
        });
    };
    const navigate = useNavigate();
    const form = useRef();
    const checkBtn = useRef();
    const [showCustomFurnitureForm, setShowCustomFurnitureForm] = useState(false);



    const [data, setData] = useState({
        desired_Location: "",
        preferred_Starting_Date: "",
        expected_Ending_Date: "",
        number_Of_Employees: 0,

        furnished_Requirement: undefined,
        furniture: [],

        officeType: "",
    });

    console.log("here : my data",data);
    // console.log(data);

    function eventTriggered(e) {
        const newData = { ...data };
        newData[e.target.id] = e.target.value;
        setData(newData);
       // console.log("here");
        // console.log(e.target.id)
        // console.log(e.target.value)
        //console.log(data);
    }
    function officeSpaceType(e) {
        const newData = { ...data };
        if (e.target.id === "office_Space_Type" && e.target.value === "custom") {
            setShowCustomFurnitureForm(true);
            console.log("target hit");
            //  setShowCustomFurnitureForm(true)
        } else {
            setShowCustomFurnitureForm(false);
        }
    }

    const normalizeParams = (data) =>{
        if(data.officeType==="true_Furnished_Requirement"){
            return {
                desired_Location: data.desired_Location,
                preferred_Starting_Date: data.preferred_Starting_Date,
                expected_Ending_Date:  data.expected_Ending_Date,
                number_Of_Employees:  data.number_Of_Employees,

                furnished_Requirement: true,
            }
        }
        if(data.officeType==="false_Furnished_Requirement"){
            return {
                desired_Location: data.desired_Location,
                preferred_Starting_Date: data.preferred_Starting_Date,
                expected_Ending_Date:  data.expected_Ending_Date,
                number_Of_Employees:  data.number_Of_Employees,

                furnished_Requirement: false,
            }
        }
        if(data.officeType==="custom"){
            return {
                desired_Location: data.desired_Location,
                preferred_Starting_Date: data.preferred_Starting_Date,
                expected_Ending_Date:  data.expected_Ending_Date,
                number_Of_Employees:  data.number_Of_Employees,
                furniture: data.furniture,
            }
        }

        //increase you don't select office type
        return {
            desired_Location: data.desired_Location,
            preferred_Starting_Date: data.preferred_Starting_Date,
            expected_Ending_Date:  data.expected_Ending_Date,
            number_Of_Employees:  data.number_Of_Employees,
        }
    }
    const handleAdd = (e) => {
        e.preventDefault();
        const params = normalizeParams(data)
        console.log("++++++++++++++++++++++++++++++++++++++Data to send",params)
     if(data.officeType==="") {
         toast.info("Please select one of the three available office options")
     }else
     {
        addUserRequest(params).then(
            (res) => {
                const msg = res.data.message
                if (msg.includes("Your previous")) {
                    toast.info(res.data.message)
                }else {
                    toast.success(res.data.message)
                }
                // console.log(res.data.message)
                navigate('../services/userRequests/user')
            })
            .catch(
                (error) =>{
                toast.error(error.message)
                toast.error(error.response.data.message)
                console.log(error.response)
                }
            )
     }

        //console.log(showCustomFurnitureForm === true);

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
    };

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
        if (value.length < 4 || value.length > 30) {
            return (
                <div className="alert alert-danger" role="alert">
                    The type must be between 4 and 30 characters.
                </div>
            );
        }
    };

    const handleSelectOffice = (value) => {
        setData((previousState) => ({
            ...previousState,
            officeType: value,
        }));
    };

    const handleFurniture = (qte,id) => {
    console.log(qte, id)
        setData((previousState) => {

            if (previousState.furniture.length ===0){
               return {...previousState,
                   furniture: [{
                   _id: id,
                   quantity: qte
               }]
               }
            }

            const foundFurniture = previousState.furniture.find((f)=>{
                return f._id ===id
            })

            if (foundFurniture === undefined){
                return {...previousState,
                    furniture: [...previousState.furniture, {
                        _id: id,
                        quantity: qte
                    }]
                }
            }

            const newFurniture = previousState.furniture.map((f)=>{
                if (f._id === id){
                    return {...f, quantity: qte}
                }
                return f
            })

            return {
            ...previousState,
                furniture: newFurniture
        }});
    };

    return (
        <div className="login-area pt-120 pb-120">
        <div className="container">
            <div className="row">
                <div className="col-lg-8 offset-lg-2">

            <div className="card-body ">
                <h4 className="card-title mb-4 text-center" >Submit A New User Request</h4>
                <Form onSubmit={handleAdd} ref={form}>
                    <div className="row">
                        <div className="col">
                            <label htmlFor="desired_Location">Desired location</label>
                            <Input
                                id="desired_Location"
                                type="text"
                                className="form-control"
                                onChange={(e) => eventTriggered(e)}
                                validations={[required, vType]}
                            />
                        </div>

                        <div className="col">
                            <label htmlFor="number_Of_Employees">Number Of Employees</label>
                            <Input
                                id="number_Of_Employees"
                                type="number"
                                className="form-control"
                                onChange={(e) => eventTriggered(e)}
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
                                onChange={(e) => eventTriggered(e)}
                                validations={[required, vType]}
                            />
                        </div>
                        <div className="col">
                            <label htmlFor="expected_Ending_Date">Expected Ending Date</label>
                            <Input
                                id="expected_Ending_Date"
                                type="date"
                                className="form-control"
                                onChange={(e) => eventTriggered(e)}
                                validations={[required, vType]}
                            />
                        </div>
                    </div>

                    <div className="row">
                        <div className="col mt-4">

                            <label className="form-label"><h4>Select The Type Of office you like:</h4></label>

                            <div className="form-check">
                                <input
                                    type="checkbox"
                                    id="false_Furnished_Requirement"
                                    checked={data.officeType === "false_Furnished_Requirement"}
                                    onClick={() =>
                                        handleSelectOffice("false_Furnished_Requirement")
                                    }
                                    className="form-check-input"
                                />
                                <label className="form-check-label"> Empty Office Space</label>
                            </div>

                            <div className="form-check">

                            <input
                                    type="checkbox"
                                    id="true_Furnished_Requirement"
                                    checked={data.officeType === "true_Furnished_Requirement"}
                                    onClick={() =>
                                        handleSelectOffice("true_Furnished_Requirement")
                                    }
                                    className="form-check-input"
                                />
                                <label className="form-check-label"> Furnished Office Space</label>

                            </div>

                            <div className="form-check">

                            <input
                                    type="checkbox"
                                    id="custom"
                                    checked={data.officeType === "custom"}
                                    onClick={() => handleSelectOffice("custom")}
                                    className="form-check-input"

                            />
                                <label className="form-check-label"> Custom</label>


                            </div>

                        </div>
                    </div>

                    <If condition={data.officeType === "custom"}>
                        <Then>
                            {/*//Show form*/}
                            <div className="row">
                                <div className="col">
                                    {/*<div className="form-group">*/}
                                    {/*    <label>*/}
                                    {/*        Pick your the type of your office space:*/}
                                    {/*        <select  id="furnished_Requirement" onChange={(e)=> eventTriggered(e) }>*/}
                                    {/*            <option value="" selected disabled>Please select an option</option>*/}
                                    {/*            <option value="false">Empty Office Space</option>*/}
                                    {/*            <option value="true">Furnished Office Space</option>*/}
                                    {/*        </select>*/}
                                    {/*    </label>*/}

                                    {/*</div>*/}

                                    {/*showcase them like this*/}
                                    <h4>
                                        Please select the furniture you would like to obtain along
                                        with the quantity
                                    </h4>

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
                                            {furniture &&
                                            furniture.map((f, index) => (
                                                <tr>
                                                    <td className="product-thumbnail">{f._id}</td>

                                                    <td className="product-wis-btn"> {f.type}</td>
                                                    <td className="product-subtotal justify-content-center">


                                                        <input
                                                            id={"requested_Quantity_" + index}
                                                            type="number"
                                                            className="form-control col-2"
                                                             onChange={(e)=>handleFurniture(e.target.value,f._id)}
                                                            value={data.furniture.find(item => item._id === f._id)?.quantity || 0}
                                                        />


                                                    </td>
                                                </tr>
                                            ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </Then>
                        {/*<Else>*/}
                        {/*    Nothing to show{" "}*/}
                        {/*    {showCustomFurnitureForm === false ? "false" : "true"}*/}
                        {/*</Else>*/}
                    </If>
                    <div className="row">
                        <div className="col">
                            <div className="form-group">
                                <button className="btn btn-primary btn-block">
                                    <span>Submit Request</span>
                                </button>
                            </div>
                        </div>
                    </div>
                    <CheckButton style={{ display: "none" }} ref={checkBtn} />
                </Form>
            </div>
            </div>
        </div>
    </div>
</div>
    );
};
export default AddUserRequest;
