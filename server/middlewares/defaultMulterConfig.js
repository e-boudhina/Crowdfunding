var multer = require('multer');
var uuid = require('uuid')
console.log("CALLED MULTER WITH : ");
require('dotenv').config();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, `${process.env.IMAGE_STORAGE_LOCATION}/tmp`);
    },
    filename: (_req, file, cb) => cb(null, `${uuid.v4()}`),
});

const fileFilter = (_req, file, cb) => {
    if (
        file.mimetype === 'image/png' ||
        file.mimetype === 'image/jpeg' ||
        file.mimetype === 'image/jpg'
    ) {
        cb(null, true);
    } else {
        cb(new Error(`${file.mimetype} type is not accepted.`));
    }
};

module.exports = multer({ storage, fileFilter });

