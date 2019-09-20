const mongoose = require('mongoose');

// Define a schema
const { Schema } = mongoose;

const BookSchema = new Schema(
  {
    title: { type: String, required: [true, 'title required'], index: true, unique: true },
    // author: { type: Schema.Types.ObjectId, ref: 'Author', required: true },
    summary: {
      type: String,
      // validate: {
      //   validator: () => {
      //     return new Promise(resolve => {
      //       setTimeout(() => {
      //         resolve(false);
      //       }, 1000);
      //     });
      //   },
      //   message: props => `${props.value} is not a valid phone number!`,
      // },
      required: true,
    },
    isbn: { type: String, required: true },
    // genre: [{ type: Schema.Types.ObjectId, ref: 'Genre' }],
    bookImage: { type: String },
  },
  {
    strict: false,
    autoIndex: false,
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
    skipVersioning: { dontVersionMe: true },
  },
);

// BookSchema.pre('save', function(next) {
//   if (this.created_at) {
//     this.updated_at = new Date();
//   }

//   this.created_at = new Date();
//   next();
// });

BookSchema.virtual('url').get(function() {
  // eslint-disable-next-line no-underscore-dangle
  return 'yagnesh';
});

BookSchema.statics.findByTitle = function(name) {
  return this.find({ title: new RegExp(name, 'i') });
  // .populate('author');
  // .populate('genre');
};

module.exports = mongoose.model('Book', BookSchema);
