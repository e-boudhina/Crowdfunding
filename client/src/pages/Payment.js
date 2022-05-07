import React from "react";
import axios from "axios";
import Stripe from "react-stripe-checkout";

const Payment = () => {

    const handleToken = (totalAmount, token) => {
        try {
            axios.post("http://localhost:5000/api/stripe/pay", {
                token: token.id,
                amount: totalAmount
            });
        } catch (error) {
            console.log(error);
        };
    }
    const tokenHandler = (token) => {
        handleToken(100, token);

    }

    return (
        <div>
            <Stripe
                stripeKey="pk_test_51KvTxVAOhnpchTYEpyfhHVAEBvX442cJQeBSJg4jukxdxmd7zEuz1NI1ZHFwhbtgXBX9lymH2AD4x77z9kyaz3YH003Luidc8f"
                token={tokenHandler}

            />
        </div>

    );
}


export default Payment