const controller = require("../../controllers/Learning/learning.controller");

module.exports = function(app) {
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
app.post("/api/learning/add-certificate",controller.addCertificate);
app.get("/api/learning/certificate/:id",controller.getCertificate);
app.get("/api/learning/certificates/",controller.getAllCertificates);
app.post("/api/learning/add-chapter-certificate/:certifId",controller.addChapterToCertificate)
} 