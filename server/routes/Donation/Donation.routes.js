const { authJwt } = require("../../middlewares");
const controller = require("../../controllers/Donation/Donation.controller");
const db = require("../../models");
const Project = db.Project;
const organization = db.organization;
var path = require('path');
const stripe = require("stripe")("sk_test_51KvTxVAOhnpchTYEG6joLmvW8nf7QlzUFXr81JIvILTOnUpt8wl4mNygn42qhsfNICtEEvSH94ShDY4UvqjD7sVt00EYK5x5m3");
const { v4: uuidv4 } = require('uuid');
const Donation = db.donation;





module.exports = function(app) {

        

//app.post("/api/project/donation/cash/:id/:idProject",controller.donateCash;
app.get("/api/project/donation/crypto/tracking",controller.tracking);
app.post("/api/project/donation/crypto/:id/:idProject",controller.donateCrypto);

app.post("/api/project/donation/stripe/payment-intent/:id/:idProject", async(req,res)=>{
  console.log("EL REQ : " + JSON.stringify(req.body));
  const { token, amount } = req.body;
  const idempotencyKey = uuidv4();
console.log("entered customers.creacte");
console.log(req.params.idProject);
console.log(req.params.id);
  return stripe.customers.create({
      email: token.email,
      source: token
  }).then(customer => {

console.log("entered then customer");
    
    
    
    console.log("EL CUSTOMER : ="+ JSON.stringify(customer));
console.log("entered customer");

    stripe.charges.create({
      amount: amount * 100,
      currency: 'usd',
      customer: customer.id,
      receipt_email: token.email
      //receipt_email: req.body.email
    }, { idempotencyKey })
console.log("entered charges");

  }).then(result => {
      console.log("EL RESULT : ="+ JSON.stringify(result));
      const donation = new Donation({
        user: req.params.id,
        project: req.params.idProject,
        money: amount,
        email:token.email,
        operation: 1,
      
  
    
      })
console.log("left  donation");

      donation.save()
console.log("left donation save");


Project.findOne({ _id: req.params.idProject }, (err, project) => {
  if (err) {
 res.json(err)
    
  }
  else {

    project.fundcollected+= donation.money
    console.log( project.fundcollected);
    project.save()
    res.json(project)
  }
});  



      res.status(200)
    }).catch(err => {
      console.log(err);
  });
});
  //res.status(200).json(paymentIntent.client_secret);







//  app.get( "/api/test/inc",controller.IncubatorBoard );
// app.get("/api/test/admin", [authJwt.verifyToken, authJwt.isAdmin],  controller.adminBoard );
  };

