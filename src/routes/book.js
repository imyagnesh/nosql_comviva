const express = require('express');
const multer = require('multer');
const { bookList, bookByTitle, addBook } = require('../controllers/bookController');

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, './uploads/');
  },
  filename(req, file, cb) {
    cb(null, new Date().toISOString() + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  // reject a file
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
  fileFilter,
});

const router = express.Router();

router.get('/', bookList);

router.get('/:title', bookByTitle);

router.post('/', upload.single('bookImage'), addBook);

module.exports = router;
