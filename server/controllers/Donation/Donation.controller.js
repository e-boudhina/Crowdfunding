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
const ethPrice = require('eth-price');
const convert = require("crypto-convert");

// exports.getProjects = async (req, res) => {
//   const {page = "1", keyword = "", ...restOfQuery} = req.query;

//   if (keyword !== "")
//     restOfQuery.labelproject = new RegExp(
//       keyword.text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&") || "",
//       "gi"
//     );

//   try {
//     const projects = await Project.aggregate(
//       paginationPipeline({
//         page,
//         filter: restOfQuery,
//         pageLimit: 1,
//       })
//     );
//     console.log(projects);
//     res.send(projects?.[0] || emptyPaginationPayload);
//   } catch (error) {
//     res.status(500).send({message: error.message, stack: error.stack});
//   }
// };

exports.tracking = (req, res) => {

  
  var list = arrayList();

  var usernameOOOO=''
  var    projectLabeloooo=''
  var operation=0

  var obj={
    username:"",
    projectLabel:"",
    operation:""
  
  
  
    
  };

  // console.log( );
  var a = convert.BTC.USD(1);
  var pricInEth = convert.ETH.USD(1);
  var c = convert.LINK.LTC(5);
  var d = convert.USD.CRO(100);
 





  Donation.find({}, (err, result) => {
   
    if (err) {
      res.json(err);
    }
    else {
      // console.log(result);
      result.forEach(element => {
      

        User.findOne({ _id: element.user }, (err, userr) => {

          if (err) {
            res.json(err);
          }
          
          else {
             usernameOOOO = userr.username;
            // obj["username"]=username;
            // console.log(username);
            
            Project.findOne({ _id: element.project }, (err, projectt) => {
              
              if (err) {
                res.json(err);
              }
              
              else {
                 projectLabeloooo = projectt.labelproject;
                 

                // console.log(projectLabel);
                

                // if(element.operation==0){
                //   // var operation="Etherieum"
                  
                //   console.log("eth");
                // }
                
                // if(element.operation==1){
                //   // var operation="Stripe"
                //   console.log("Stripe");
                  

                // }

              }




            }



            )

          };
          list.unshift({
            username:userr.username,
            projectLabel: projectt.labelproject,
            operation:element.operation
    
    
          }); 
      
      })

   
     
        
    
  });

  // project.fundcollected+= req.body.priceETH*pricInEth  

}
console.log(list);

console.log("List");
res.json(list)
  })

 

}






exports.donateCrypto = (req, res) => {


  console.log("hellllllloooo");
  if (!req.body.adresseCrypto) {
    res.status(400).send({ message: "Donate field cannot be empty   can not be empty!" });
    return;
  }
  console.log(req.params.id);
  console.log("hellllllloooo");
  console.log(req.params.idProject);
  console.log("hellllllloooo");
  // console.log( );
  var a = convert.BTC.USD(1);
  var pricInEth = convert.ETH.USD(1);
  var c = convert.LINK.LTC(5);
  var d = convert.USD.CRO(100);


  const donation = new Donation({
    user: req.params.id,
    project: req.params.idProject,
    money: req.body.priceETH * pricInEth,
    operation: 0,
    adresseCryptoProject: req.body.adresseCrypto,
    // adresseCryptoDonateur:req.body.adresseDonateur,


  });

  donation.save()
  console.log(req.body.priceETH);
  console.log(req.params.id);
  console.log(req.params.idProject);




  Project.findOne({ _id: req.params.idProject }, (err, project) => {
    if (err) {
      res.json(err)

    }
    else {

      project.fundcollected += req.body.priceETH * pricInEth
      console.log(project.fundcollected);
      project.save()
      res.json(project)
    }
  });

  // project.fundcollected+= req.body.priceETH*pricInEth  

}

  