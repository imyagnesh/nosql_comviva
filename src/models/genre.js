const mongoose = require('mongoose');

const { Schema } = mongoose;

const GenreSchema = new Schema({
  name: {
    type: String,
    required: true,
    enum: ['Romantic', 'Action', 'Thriller', 'Fiction'],
  },
});

// Virtual for bookinstance's URL
GenreSchema.virtual('url').get(function() {
  // eslint-disable-next-line no-underscore-dangle
  return `/catalog/bookinstance/${this._id}`;
});

// Export model
module.exports = mongoose.model('Genre', GenreSchema);
