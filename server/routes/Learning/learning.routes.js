const controller = require("../../controllers/Learning/learning.controller");
var path = require('path');
module.exports = function(app) {
  var multer = require('multer');
  
  var storage = multer.diskStorage({
      destination: (req, file, cb) => {
          console.log("FIELDNAME "+file.fieldname);
          cb(null,path.join(__dirname, '../../../client/public/profile-uploads'))
      },
      filename: (req, file, cb) => {
          console.log("ORIGINAL NAME "+file.originalname +Date.now() );
          cb(null, file.fieldname + Date.now() + file.originalname  )
  
      }
  
  }
  );
  var upload = multer({ storage: storage });

    app.use(function(req, res, next) {
      res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
      );
      next();
    });
app.post("/api/learning/add-chapter",controller.addChapter);
app.get("/api/learning/chapter/:id",controller.getChapter);
app.get("/api/learning/chapters/",controller.getAllChapters);
app.post("/api/learning/add-certificate",upload.single('image'),controller.addCertificate);
app.get("/api/learning/certificate/:id",controller.getCertificate);
app.get("/api/learning/certificates/",controller.getAllCertificates);
app.post("/api/learning/add-chapter-certificate/:certifId",controller.addChapterToCertificate)
app.post("/api/learning/add-category-learning",controller.addCategorylearning);
app.get("/api/learning/categories-learning/",controller.getCategorieslearning);
app.delete("/api/learning/chapter/:chapterId", controller.deleteChapter);
app.get("/api/learning/certificates-search/",controller.getCertificatePagination);
app.post("/api/learning/progress-certif/",controller.ProgressCertif)
app.get("/api/learning/get-progress/",controller.getProgression)
} 