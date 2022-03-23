const db = require('../../models');
const Chapter = db.chapter ;
const Certificate = db.certificate;
const asyncHandler = require("express-async-handler");

exports.addChapter = (req, res) => {
    if (!req.body.name) {
      res.status(400).send({ message: "chapter name  can not be empty!" });
      return;
    }
    const chapter = new Chapter({
      name: req.body.name
    });
    chapter
      .save(chapter)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the chapter."
        });
      });
  };

  exports.getChapter = (req, res) => {
    const id = req.params.id;
    Chapter.findById(id)
      .then(data => {
        if (!data)
          res.status(404).send({ message: "Not found Chapter with id " + id });
        else res.send(data);
      })
      .catch(err => {
        res
          .status(500)
          .send({ message: "Error retrieving Chapter with id=" + id });
      });
  };