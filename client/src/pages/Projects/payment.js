/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState , useEffect  } from "react";
import { Navigate , Link } from 'react-router-dom';
import { useDispatch, useSelector  } from "react-redux";
import { useNavigate  } from "react-router-dom";
import { BrowserRouter as Router, Routes, Route , Outlet} from "react-router-dom";
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
const Payment = (props) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [stripeSelected , setStripeSelected ] = useState(true);
    const [cryptoSelected , setCryptoSelected ] = useState(false);

const selectCrypto = () => {
    setStripeSelected(false);
    setCryptoSelected(true);
    navigate("/payment/crypto");
}
const selectStripe = () => {
    setStripeSelected(true);
    setCryptoSelected(false);
    navigate("/payment/stripe");
}
    return (
    <>   
    <div className="container mt-5">
       <div className="row">
        <div className="col-12">
          <div className="bakix-details-tab">
            <ul className="nav text-center justify-content-center pb-30 mb-50" id="myTab" role="tablist">
              <li className="nav-item">
                <a className={"nav-link   " + (cryptoSelected ? 'active show' : '')} id="profile-tab1" 
                data-toggle="tab" onClick={()=> selectCrypto()} href="#" role="tab" aria-controls="profile" aria-selected={cryptoSelected ? 'true' : 'false'}>Crypto</a>
              </li>
              <li className="nav-item"> 
                <a className={"nav-link  " + (stripeSelected ? 'active show' : '')} id="profile-tab2" 
                data-toggle="tab" onClick={()=> selectStripe()}  href="#" role="tab" aria-controls="profile" aria-selected={stripeSelected ? 'true' : 'false'}>Stripe</a>
              </li>
            </ul>
          </div>
          </div>
          </div>
          </div>
<Outlet/>
        </>

);
};

export default  Payment;