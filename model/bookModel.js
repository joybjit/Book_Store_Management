const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Title was not Provided!"],
    maxlength: 30,
  },
  author: {
    type: String,
    required: [true, "Author was not Provided!"],
    maxlength: 30,
  },
  price: {
    type: Number,
    required: [true, "Price must be greater than 0"],
    min: 1,
  },
  genre: [
    {
      type: String,
      required: true,
      default: [],
    },
  ],
  year: {
    type: Number,
    required: true,
  },
  pages: {
    type: Number,
    required: true,
  },
  rating: {
    type: Number,
    required: [true, "rating must be between 0 and 5"],
    min: 0,
    max: 5,
    default: 0,
  },
  stock: {
    type: Number,
    required: [true, "Stock must be greater than or equal to 0"],
  },
});

const Book = mongoose.model("Book", bookSchema);
module.exports = Book;
