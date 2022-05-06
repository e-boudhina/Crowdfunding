const express = require('express');
const stripe = require("stripe")("sk_test_51KvTxVAOhnpchTYEG6joLmvW8nf7QlzUFXr81JIvILTOnUpt8wl4mNygn42qhsfNICtEEvSH94ShDY4UvqjD7sVt00EYK5x5m3");
const { v4: uuidv4 } = require('uuid');

const router = express.Router();

router.get('/', (req, res, next) => {
    console.log("GET response from researcher");
    res.json({
        message: 'It works'
    });

});

router.post("/pay", (req, res, next) => {
    console.log(req.body.email);
    const { token, amount } = req.body;

    const idempotencyKey = uuidv4();
    return stripe.customers.create({
        email: token.email,
        source: token
    }).then(customer => {
        console.log(customer);
        stripe.charges.create({
            amount: amount * 100,
            currency: 'usd',
            customer: customer.id,
            receipt_email: token.email,


        }, { idempotencyKey })
    }).then(result => {
        console.log(JSON.stringify(result));
        res.status(200).json(result)
    }).catch(err => {
        console.log(err);
    });
});

module.exports = router;