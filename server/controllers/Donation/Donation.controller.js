const db = require("../../models");
var fs = require('fs');
const uploader = require("../../ImageUploader");
const paginationPipeline = require("../../helpers/paginationPipeline");
// const convert = require("crypto-convert");
const Image = require("../../models/Image/image.model");
const Project = db.Project;
const Donation = db.donation;
const User = db.user;
const organization = db.organization;
var arrayList = require('array-list')
// const ethPrice = require('eth-price');
// const convert = require("crypto-convert");







exports.tracking = (req, res) => {

  
  var list = arrayList();



  var obj={
    username:"",
    projectLabel:"",
    operation:""
  
  
  
    
  };

  // console.log( );
  // var a = convert.BTC.USD(1);
  // var pricInEth = convert.ETH.USD(1);
  // var c = convert.LINK.LTC(5);
  // var d = convert.USD.CRO(100);
  var usernameOOOO
        var    projectLabeloooo="";





  Donation.find({}, (err, result) => {
   
   

      // console.log(result);
      result.forEach(element => {
      console.log("entring forEach");
// console.log(element);
      
          Project.findById({_id:element.project})
          .exec(
        
            function (err, project) {
            // projectLabeloooo=project.labelproject
// console.log(project.labelproject);
projectLabeloooo=project.projectdescriptiob
console.log(projectLabeloooo);
// console.log(typeof(project.labelproject))



          }
  
            )
            //  usernameOOOO = userr.username;
            // obj["username"]=username;
            // console.log(username);
            var operation;
            var mail;
            if(element.operation==1){
              operation="Stripe"
              mail="arij.zitouni@gmail.com"
              list.push({
                user :element.user,
                project:element.project,
                money:element.money,
                operation:operation,
                adressemail:mail
                
              
              
              });    
            }
            else if(element.operation==0){
              operation="Crypto"
              list.push({
       user :element.user,
       project:element.project,
                money:element.money,
                operation:operation,
                adresseCrypto:element.adresseCryptoProject
                
              
              
              });    
            }
        
                  
          
      
      

   
      
    
  });

  // project.fundcollected+= req.body.priceETH*pricInEth  


console.log(list);
console.log("aaaaa");
console.log("List");
res.json(list)
  })

 

}

exports.donateCrypto = async (req, res) => {

  console.log(req.body.priceETH);
  console.log(req.params.id);
  console.log("hellllllloooo");
  console.log(req.params.idProject);
  console.log("hellllllloooo");
  // console.log( );
  // var a = convert.BTC.USD(1);
  // var pricInEth = convert.ETH.USD(1);
  // var c = convert.LINK.LTC(5);
  // var d = convert.USD.CRO(100);

var price=0.05 * 2340
  const donation = new Donation({
    user: req.params.id,
    project: req.params.idProject,
    money: price,
    operation: 0,
    adresseCryptoProject: req.body.adresseCrypto,
    // adresseCryptoDonateur:req.body.adresseDonateur,
  });

  donation.save()






  Project.findOne({ _id: req.params.idProject }, (err, project) => {
 
    
      project.fundcollected += 0.05* 2340
      console.log(project.fundcollected);
      project.save()
      res.json(project)
    
  });

  // project.fundcollected+= req.body.priceETH*pricInEth  

}

  