const controller = require("../../controllers/Learning/chapter.controller");

module.exports = function(app) {
    app.use(function(req, res, next) {
      res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
      );
      next();
    });
app.post("/api/learning/add",controller.addChapter);
app.get("/api/learning/:id",controller.getChapter);
}