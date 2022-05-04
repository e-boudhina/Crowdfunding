const express = require('express');
const stripe = require("stripe")("sk_test_51KvTxVAOhnpchTYEG6joLmvW8nf7QlzUFXr81JIvILTOnUpt8wl4mNygn42qhsfNICtEEvSH94ShDY4UvqjD7sVt00EYK5x5m3");
var uuid = require('uuid');

const router = express.Router();

router.get('/', (req, res, next) => {
    console.log("GET response from researcher");
    res.json({
        message: 'It works'
    });

});

router.post("/pay", (req, res, next) => {
    console.log(req.body.token);
    const { token, amount } = req.body;
    const idempotencyKey = uuid();
    return stripe.customers.create({
        email: token.email,
        source: token
    }).then(customer => {
        stripe.charges.create({
            amount: amount * 100,
            currency: 'usd',
            customer: customer.id,
            receipt_email: token.email
        }, { idempotencyKey })
    }).then(result => {
        res.status(200).json(result)
    }).catch(err => {
        console.log(err);
    });
});

module.exports = router;