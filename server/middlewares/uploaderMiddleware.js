var fs = require("fs");
const getFilePath = (path) => path.split(`public/`)[1];

const uploaderMiddleware = (field, folder) => async (req, res, next) => {
  if (!req.file && !req.files) {
    next();

    return;
  }

  const { filename, path: oldPath, mimetype } = req.file;

  try {
    fs.mkdirSync(`${process.env.IMAGE_STORAGE_LOCATION}/${folder}` || "img", {
      recursive: true,
    });
    const newPath = `${process.env.IMAGE_STORAGE_LOCATION
      }/${folder}/${filename}.${mimetype.split("/")[1]}`;

    fs.rename(oldPath, newPath, (error) => {
      if (error) throw error;
    });

    res.locals[field] = getFilePath(newPath);

    next();
  } catch (error) {
    res.status(400).send({ message: "Something went horribly wrong", error });
  }
};

module.exports = uploaderMiddleware;
