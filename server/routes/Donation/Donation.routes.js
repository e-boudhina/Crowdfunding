const { authJwt } = require("../../middlewares");
const controller = require("../../controllers/Donation/Donation.controller");
const db = require("../../models");
const Project = db.Project;
const organization = db.organization;
var path = require('path');
const stripe = require("stripe")("sk_test_51KwPH7L7Lpb9x7yHYGN1lCPYJmRy8HgzTVSYKFlCGWEZjEQukrFSoJGB4g6IwKK3AIkROeggw3QDi8d0SBW7mnTt00YUM3YIPt");
const { v4: uuidv4 } = require('uuid');





module.exports = function(app) {

        

//app.post("/api/project/donation/cash/:id/:idProject",controller.donateCash;
app.post("/api/project/donation/crypto/:id/:idProject",controller.donateCrypto);

app.post("/api/project/donation/stripe/payment-intent", async(req,res)=>{
  console.log("EL REQ : " + JSON.stringify(req.body));
  const { token, amount } = req.body;
  const idempotencyKey = uuidv4();
  return stripe.customers.create({
      email: token.email,
      source: token
  }).then(customer => {
      console.log("EL CUSTOMER : ="+ JSON.stringify(customer));
      stripe.charges.create({
          amount: amount * 100,
          currency: 'usd',
          customer: customer.id,
          receipt_email: token.email
    //receipt_email: req.body.email
      }, { idempotencyKey })
  }).then(result => {
      console.log("EL RESULT : ="+ JSON.stringify(result));
      res.status(200)
  }).catch(err => {
      console.log(err);
  });
});
  //res.status(200).json(paymentIntent.client_secret);







//  app.get( "/api/test/inc",controller.IncubatorBoard );
// app.get("/api/test/admin", [authJwt.verifyToken, authJwt.isAdmin],  controller.adminBoard );
  };

