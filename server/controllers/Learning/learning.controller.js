const db = require("../../models");
const Chapter = db.chapter;
const Certificate = db.certificate;
const Progression = db.progression;
const asyncHandler = require("express-async-handler");
const { chapter } = require("../../models");
const Category = db.categorylearning


exports.addChapter = (req, res) => {
  if (!req.body.name) {
    res.status(400).send({ message: "chapter name  can not be empty!" });
    return;
  }
  const chapter = new Chapter({
    name: req.body.name,
    content: req.body.content,
  });
  chapter
    .save(chapter)
    .then((data) => {
      console.log("Calling certif update wit hID  " + req.body.certifId);
      Certificate.updateOne(
        { _id: req.body.certifId },
        { $push: { chapters: chapter._id },$set : {published : true} }
      ).exec(res.send(data));
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the chapter.",
      });
    });
};

exports.getChapter = (req, res) => {
  const id = req.params.id;
  Chapter.findById(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({ message: "Not found Chapter with id " + id });
      } else {
        console.log(data);
        res.send(data);
      }
    })
    .catch((err) => {
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
});


exports.addCertificate = (req, res) => {
 /* if (!req.body.name || !req.body.category) {
    res.status(400).send({ message: "certificate name/category  can not be empty!" });
    return;
  }*/
  console.log("FROM LEARNING CONTROLLER body = ");
  console.log(req.body);
  const certificate = new Certificate({
    name: req.body.name,
    published : false ,
    category: req.body.category,
    tutor: req.body.tutor,
    img: {
      data: req.file.filename,
      contentType: 'image/png'
  }
  });
  certificate
    .save(certificate)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the certificate.",
      });
    });
};

exports.getCertificate = (req, res) => {
  const id = req.params.id;
  Certificate.findById(id).populate("chapters")
    .then((data) => {
      if (!data)
        res
          .status(404)
          .send({ message: "Not found Certificate with id " + id });
      else res.send(data);
    })
    .catch((err) => {
      res
        .status(500)
        .send({ message: "Error retrieving Certificate with id=" + id });
    });
};

exports.getAllCertificates = (req, res) => {
  Certificate.find().populate("chapters").populate("category")
    .then((data) => {
      if (!data)
        res.status(404).send({ message: "Not found Certificate with id " });
      else {
        console.log(data);
        res.send(data);
      }
    })
    .catch((err) => {
      res
        .status(500)
        .send({ message: "Error retrieving Certificate with id=" });
    });
};

exports.addChapterToCertificate = asyncHandler(async (req, res) => {
  if (!req.params.certifId) {
    res.status(400);
    throw Error("certif name is required");
  }
  Chapter.findOne({ _id: req.body._id }, (err, chapter) => {
    if (err) {
      return;
    } else {
      console.log("ABOUT TO UPDATE CERTIF ");
      Certificate.updateOne(
        { _id: req.params.certifId  },
        {$set : { published : true},  $push: { chapters: chapter._id } }
      ).exec(
        res.status(200).send({ message: "chapter " + chapter.name + "added!" })
      );
    }
  });
});

exports.addCategorylearning = (req, res) => {
  if (!req.body.name) {
    res.status(400).send({ message: "Category name  can not be empty!" });
    return;
  }
  const category = new Category({
    name: req.body.name,
  });
  category
    .save(category)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the category.",
      });
    });
};


exports.getCategorylearning = (req, res) => {
  const id = req.body._id;
  Category.findById(id)
    .then((data) => {
      if (!data)
        res
          .status(404)
          .send({ message: "Not found Category with id " + id });
      else res.send(data);
    })
    .catch((err) => {
      res
        .status(500)
        .send({ message: "Error retrieving Category with id=" + id });
    });
}

exports.getCategorieslearning = async(req, res) => {
  Category.find()
    .then((data) => {
      if (!data)
        res.status(404).send({ message: "Not found Categories " });
      else {
        console.log(data);
        res.send(data);
      }
    })
    .catch((err) => {
      res
        .status(500)
        .send({ message: "Error retrieving Categories" });
    });
}

exports.deleteChapter = (req, res) => {
  const {chapterId} = req.params;
  if (!chapterId) {
    res.status(400);
    throw Error("chapter Id is required");
  } 
  Chapter.findByIdAndRemove(chapterId)
    .then((data) => {
      if (!data) {
        console.log("controller : 404 chapter not found " + chapterId);
        res.status(404).send({
          message: `Cannot delete chapter  with id=${chapterId}. Maybe chapter  was not found!`,
        });
      } else {
        res.send({
          message: "chapter was deleted successfully!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete chapter with id=" + chapterId,
      });
    });
};


const getPagination = (page, size) => {
  const limit = size ? +size : 3;
  const offset = page ? page * limit : 0;
  return { limit, offset };
};
// Retrieve all Tutorials from the database.
exports.getCertificatePagination = (req, res) => {
  const { page, size, name } = req.query;
  var condition = name
    ? { published : true ,name: { $regex: new RegExp(name), $options: "i" } }
    : {published : true};
  const { limit, offset } = getPagination(page, size);
  Certificate.paginate(condition, { offset, limit , populate:"category" })
    .then((data) => {
      console.log(data);
      res.send({
        totalItems: data.totalDocs,
        certificates: data.docs,
        totalPages: data.totalPages,
        currentPage: data.page - 1,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving certificates.",
      });
    });
};

exports.getProgression = asyncHandler(async (req, res) => {
  console.log("Called controller with data "+req.body);
  console.log("Called controller with data "+ req.query.user);
  console.log("Called controller with data "+ req.query.certificate);
  Progression.find({user:req.query.user , certificate:req.query.certificate}).populate({
    path: 'certificate',
    populate: [
        {
            path: 'chapters',
            model: 'Chapter',
        }
    ]
})
    .then((data) => {
      if (!data || data.length === 0)
        res
          .status(404)
          .send({ message: "Not found Progression " });
      else {
        console.log("Get progression data : " + data);
        res.send(data); }
    })
    .catch((err) => {
      res
        .status(500)
        .send({ message: "Error retrieving Progression with "});
    });
})

exports.ProgressCertif = asyncHandler(async (req, res) => {
  if (!req.body.user) {
    res.status(400);
    throw Error("user id is required");
  }
  if (!req.body.certificate) {
    res.status(400);
    throw Error("certificate id is required");
  }
  if (!req.body.currentChapter) {
    res.status(400);
    throw Error("chapter id is required");
  }
  Progression.findOne({ certificate : req.body.certificate , user : req.body.user }).exec((err, prog) => {
    if (err) {
      return res.status(400).send({ message: err });
    }
    if (!prog) {  //ken famech progress yasna3 progress
      const progression = new Progression({
        user: req.body.user,
        certificate: req.body.certificate,
        currentChapter : req.body.currentChapter,
        isCompleted : 0 ,
      });
      progression
        .save(progression)
        .then((data) => {
          res.send(data);
        })
        .catch((err) => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while creating the progression.",
          });
        });
    }
    if (prog) { //ken fama progress bech imodify 7asb el chapter li khlatlou
      if (!prog.isCompleted) {
      Progression.updateOne({ 
       certificate : req.body.certificate , user : req.body.user 
      }, {
        currentChapter: req.body.currentChapter,
        isCompleted: req.body.isCompleted ?  req.body.isCompleted : 0  //fel component , if it's last chapter completed , set this to 1
      }).then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while updating the progression.",
        });
      });
    }
    else {
      res.status(400).send({ message: "Certificate already completed" });
    }
  }
  }) //end user find
  
})