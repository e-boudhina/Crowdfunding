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


exports.donateCrypto = (req, res) => {
  if (!req.body.adresseCrypto) {
    res.status(400).send({ message: "Donate field cannot be empty   can not be empty!" });
    return;
  }
  var a =convert.BTC.USD(1);
  var pricInEth =convert.ETH.USD(1);
  var c =	convert.LINK.LTC(5);
  var d =convert.USD.CRO(100);


          const donation = new Donation({
            user: req.params.id,
            project: req.params.idProject,
            money: req.body.priceETH*pricInEth,
            operation: 0 ,
            adresseCryptoProject:req.body.adresseCrypto,
            adresseCryptoDonateur:req.body.adresseDonateur,

        
          });

          donation.save()
          console.log(req.body.priceETH);
          console.log(req.params.id);
          console.log(req.params.idProject);


          Project.find({ _id: req.params.idProject }, (err, project) => {
            if (err) {
              project.fundcollected+= req.body.priceETH*pricInEth  
            }
            else {
              console.log(result);
              res.json(result)
            }
          });  

          // project.fundcollected+= req.body.priceETH*pricInEth  
      
        }
      

// exports.getChapter = (req, res) => {
//   const id = req.params.id;
//   Chapter.findById(id)
//     .then((data) => {
//       if (!data) {
//         res.status(404).send({ message: "Not found Chapter with id " + id });
//       } else {
//         console.log(data);
//         res.send(data);
//       }
//     })
//     .catch((err) => {
//       res
//         .status(500)
//         .send({ message: "Error retrieving Chapter with id=" + id });
//     });
// };
// exports.getAllChapters = asyncHandler(async (req, res) => {
//   try {
//     const chapters = await Chapter.find();
//     return res.json(chapters);
//   } catch (error) {
//     res.json({ message: error });
//   }
// });