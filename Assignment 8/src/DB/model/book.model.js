import mongoose from "mongoose";

const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      minlength: 1
    },
    author: {
      type: String,
      required: true
    },
    year: {
      type: Number,
      required: true
    },
    genres: {
      type: [String],
      default: []
    }
  },
  {
    timestamps: true
  }
);

export const Book = mongoose.model("Book", bookSchema);
