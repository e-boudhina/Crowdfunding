var multer = require('multer');
  
var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        console.log("FILENAME "+file.filename);
        cb(null, '../../client/public/uploads')
    },
    filename: (req, file, cb) => {
        console.log("ORIGINAL NAME "+file.originalname);
        cb(null, file.originalname )

    }

}
);
console.log("CALLED MULTER WITH : ");
var upload = multer({ storage: storage });

