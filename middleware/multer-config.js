const multer = require('multer');

//Creation d 'un multer pour imporation d image 

const MIME_TYPE = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'jpg'
};

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, 'images')
    },

    filename: (req, file, callback) => {
        const name = file.originalname.split(' ').join('_');
        const extension = MIME_TYPE[file.mimetype];
        callback(null, name + Date.now() + '.' + extension);
    }
});

module.exports = multer({ storage }).single('image');