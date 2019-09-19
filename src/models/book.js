const mongoose = require('mongoose');

// Define a schema
const { Schema } = mongoose;

const BookSchema = new Schema({
  title: { type: String, required: true },
  author: { type: Schema.Types.ObjectId, ref: 'Author', required: true },
  summary: { type: String, required: true },
  isbn: { type: String, required: true },
  genre: [{ type: Schema.Types.ObjectId, ref: 'Genre' }],
});

BookSchema.virtual('url').get(function() {
  // eslint-disable-next-line no-underscore-dangle
  return `/catalog/book/${this._id}`;
});

module.exports = mongoose.model('Book', BookSchema);
