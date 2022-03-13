//var createError = require('http-errors');
var express = require('express');
var  cors = require('cors');
var path = require('path');
const db = require('./models')
const mongoose =db.mongoose ; 
const  dotenv = require('dotenv').config();
const init_functions = require('./utils/init_functions')
var imgModel = require('./models/Image/image.model');
var fs = require('fs');


var app = express();
var corsOptions = {
    origin: "*"
  };
const port = process.env.PORT || 5001 ;

app.use(cors(corsOptions));
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));

// app.set("view engine", "ejs");


var multer = require('multer');
  
var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now())
    }
});
  
var upload = multer({ storage: storage });


// app.get('/image', (req, res) => {
//   imgModel.find({}, (err, items) => {
//       if (err) {
//           console.log(err);
//           res.status(500).send('An error occurred', err);
//       }
//       else {
//           res.render('imagesPage', { items: items });
//       }
//   });
// });


// app.post('/images', upload.single('image'), (req, res, next) => {
  
//   var obj = {

//       name: req.body.name,
//       desc: req.body.desc,
//       img: {
//           data: fs.readFileSync(path.join(__dirname + '/uploads/' + req.file.filename)),
//           contentType: 'image/png'
//       }
//   }
//   imgModel.create(obj, (err, item) => {
//       if (err) {
//           console.log(err);
//           res.redirect('/erreur9ahba');
//       }
//       else {
//           // item.save();
//           // res.send({ id: item.id})
//           res.redirect(307,'/api/test/add');
          
//       }
//   });
// });






require('./routes/User/auth.routes')(app);
require('./routes/User/user.routes')(app);

//Project routes
require('./routes/Project/Project.routes')(app);
require('./routes/Organization/Organization.routes')(app);

const uri = process.env.LOCAL_URI ;
//const uri = process.env.MONGO_URI ;
async function run() {
    try {
       mongoose.connect(uri) ;
     console.log("connected");
     console.log(process.env.PORT);

   //  `MongoDB connected ${conn.connection.host}`.cyan.underline
    } catch (err) {
        console.log(err) ;
    }
  }
  run();

  init_functions.initRoles();

  app.listen(port , () => `Server running on port ${port} `);

module.exports = app;
