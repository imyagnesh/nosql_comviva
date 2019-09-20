/* eslint-disable no-underscore-dangle */
const Book = require('../models/book');
// const Author = require('../models/author');
// const Genre = require('../models/genre');

const handleError = error => {
  return {
    status: error.status || 'INVALID_REQUEST',
    error_message: error.message,
  };
};

exports.bookList = async function(_, res) {
  try {
    const books = await Book.find({}).exec();
    return res.status(200).json({ result: books, status: 'OK' });
  } catch (err) {
    return res.status(404).send(handleError(err));
  }
};

exports.bookByTitle = async function(req, res) {
  try {
    const books = await Book.findByTitle(req.params.title).exec();
    return res.status(200).json({ result: books, status: 'OK' });
  } catch (err) {
    return res.status(404).send(handleError(err));
  }
};

exports.addBook = async function(req, res) {
  try {
    // const author = Author(req.body.author);

    // const genre = Genre(req.body.genre);

    // const isValidate = await author.validate();
    // if (!isValidate) {
    //   return res.status(404).send(handleError(new Error(isValidate)));
    // }

    // const authorRes = await author.save();
    // const genreRes = await genre.save();

    const book = Book({
      ...req.body,
      bookImage: req.file.path,
      // author: authorRes._id,
      // genre: genreRes._id,
    });

    const bookRes = await book.save();

    return res.status(200).json({ result: bookRes, status: 'OK' });
  } catch (err) {
    return res.status(404).send(handleError(err));
  }
};
