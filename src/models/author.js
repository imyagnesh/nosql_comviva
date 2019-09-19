const mongoose = require('mongoose');

// Define a schema
const { Schema } = mongoose;

const AuthorSchema = new Schema({
  first_name: { type: String, required: true, max: 100 },
  family_name: { type: String, required: true, max: 100 },
  date_of_birth: Date,
  date_of_death: Date,
});

AuthorSchema.virtual('name').get(function() {
  // eslint-disable-next-line no-underscore-dangle
  return `${this.first_name} ${this.family_name}`;
});

AuthorSchema.virtual('lifespan').get(function() {
  // eslint-disable-next-line no-underscore-dangle
  return (this.date_of_death.getYear() - this.date_of_birth.getYear()).toString();
});

AuthorSchema.virtual('url').get(function() {
  // eslint-disable-next-line no-underscore-dangle
  return `/catalog/author/${this._id}`;
});

module.exports = mongoose.model('Author', AuthorSchema);
