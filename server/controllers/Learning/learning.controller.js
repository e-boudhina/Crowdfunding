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
      name: req.body.name,
      content : req.body.content
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
  exports.getAllChapters = asyncHandler(async (req, res) => {
  try {
    const chapters = await Chapter.find();
    return res.json(chapters);
  } catch (error) {
    res.json({ message: error });
  }
})
  exports.addCertificate = (req, res) => {
    if (!req.body.name) {
      res.status(400).send({ message: "certificate name  can not be empty!" });
      return;
    }

    const certificate = new Certificate({
      name: req.body.name,
    });
    certificate
      .save(certificate)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the certificate."
        });
      });
  };

  exports.getCertificate = (req, res) => {
    const id = req.params.id;
    Certificate.findById(id)
      .then(data => {
        if (!data)
          res.status(404).send({ message: "Not found Certificate with id " + id });
        else res.send(data);
      })
      .catch(err => {
        res
          .status(500)
          .send({ message: "Error retrieving Certificate with id=" + id });
      });
  };

  exports.getAllCertificates = asyncHandler(async (req, res) => {
    try {
      const certifs = await Certificate.find();
      return res.json(certifs);
    } catch (error) {
      res.json({ message: error });
    }
  })


  exports.addChapterToCertificate = asyncHandler(async (req, res) => {
    if (!req.params.certifId) {
      res.status(400);
      throw Error("certif name is required");
    }
    Chapter.findOne({ _id: req.body._id}, (err, chapter) => {
      if (err) {
        return;
      } else {
        console.log(chapter);
        Certificate.updateOne(
        { _id: req.params.certifId}, 
        { $push: { chapters: chapter._id } }
      ).exec(
      res.status(200).send({message:"chapter "+ chapter.name+ "added!"}))}
    })
  });