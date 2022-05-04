import React, { useState , useEffect  } from "react";
import { Navigate , Link } from 'react-router-dom';
import { useDispatch, useSelector  } from "react-redux";
import { useNavigate  } from "react-router-dom";
import { BrowserRouter as Router, Routes, Route , Outlet} from "react-router-dom";

const Stripetest = (props) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();


    return (
    <>   
   <div className="container">
    <payment></payment>
</div>

        </>

);
};
export default Stripetest;