import React from "react";
import axios from "axios";
import Stripe from "react-stripe-checkout";

export default function Payment() {

    try {
        axios.post("http://localhost:5000/api/stripe/pay", {

        });
    } catch (error) {
        console.log(error);
    };

    const tokenHandler = (token) => {

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

