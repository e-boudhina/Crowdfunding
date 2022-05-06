import React from "react";
import axios from "axios";
import Stripe from "react-stripe-checkout";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import { isEmail } from "validator";
import { useState } from "react";
import { Button } from "reactstrap";

const required = (value) => {
    if (!value) {
      return (
        <div className="alert alert-danger" role="alert">
          This field is required!
        </div>
      );
    }
  };
const validEmail = (value) => {
    if (!isEmail(value)) {
      return (
        <div className="alert alert-danger" role="alert">
          This is not a valid email.
        </div>
      );
    }
  };


const StripeWrapper = () => {
   // const email = "iheboues@gmail.com"  //t7ott email houni
    const [isFilled , setIsFilled] = React.useState(false);
    const [email, setEmail] = useState("");
    const [amount , setAmount ] = useState(0);
    const handleToken = (totalAmount, token) => {
        try {
            axios.post("http://localhost:5000/api/project/donation/stripe/payment-intent", {
                token: token.id,
                amount: totalAmount,
                email : email
            });
        } catch (error) {
            console.log(error);
        };
    }
    const tokenHandler = (token) => {
        handleToken(amount, token);

    }
    const onChangeEmail = (e) => {
        const email = e.target.value;
        setEmail(email);
      };

      const onChangeAmount = (e) => {
        const amount = e.target.value;
        setAmount(amount);
      };
    return (
        <div className="login-area pt-120 pb-120">
            <div className="container">
                  <div className="basic-login">
              <h3 className="text-center mb-60">Please fill in the informations below</h3>
              <Form>
              <div className="form-group">
                      <label htmlFor="email">Email</label>
                      <Input
                        type="text"
                        className="form-control"
                        name="email"
                        value={email}
                        onChange={onChangeEmail}
                        validations={[required, validEmail]}
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="amount">Amount </label>
                      <Input
                        type="number"
                        className="form-control"
                        name="amount"
                        value={amount}
                        onChange={onChangeAmount}
                        validations={[required]}
                      />
                    </div>
                    <Button className="btn-border " onClick={(e)=>{
                        e.preventDefault()
setIsFilled(true)} 
                    } 
                    >
                        Proceed to payment
        </Button>
            </Form>
            {isFilled?      
                      <div className="form-group mt-5">
                     <Stripe 
                stripeKey="pk_test_51KwPH7L7Lpb9x7yHOnAuzuByoFV29HmZQa0EigNUKbNP7YP6STce0SdHet9zdr08Lq2BZ5ZvDuBPH4HS3ydSG67Z00bsrQpbT6"
                token={tokenHandler}
            /> 
            </div> : <></> }
               </div>
            </div>
        </div>

    );
}


export default StripeWrapper