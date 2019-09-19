const Model = require('../models/book');

const handleError = error => {
  return {
    status: error.status || 'INVALID_REQUEST',
    error_message: error.message,
  };
};

exports.todList = async function(_, res) {
  try {
    const books = Model.find({});
    return res.status(200).json({ result: books, status: 'OK' });
  } catch (err) {
    return res.status(404).send(handleError(err));
  }
};
