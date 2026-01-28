import { Book, Log } from "../../DB/model/index.js";
import mongoose from "mongoose";

// 1 Create Collections
export const createBooksCollection = async (req, res) => {
  await mongoose.connection.createCollection("books", {
    validator: {
      $jsonSchema: {
        bsonType: "object",
        required: ["title"],
        properties: {
          title: { bsonType: "string", minLength: 1 },
        },
      },
    },
  });
  res.status(201).json({ message: "Books collection created 👍" });
};

// 2 Create Authors
export const createAuthors = async (req, res) => {
  await mongoose.connection
    .collection("authors")
    .insertOne({ name: "john remoun" });
  res.status(201).json({ message: "Authors collection created 👍" });
};

// 3 Create Capped Logs
export const createCappedLogs = async (req, res) => {
  await mongoose.connection.createCollection("logs", {
    capped: true,
    size: 1024 * 1024,
  });
  res.status(201).json({ message: "Capped logs created 👍" });
};

// 4 Create Book Index
export const createBookIndex = async (req, res) => {
  await Book.collection.createIndex({ title: 1 });
  res.json({ message: "Index created 👍" });
};

// 5 Insert One Book
export const insertOneBook = async (req, res) => {
  const book = await Book.create(req.body);
  res.status(201).json({ message: "Book inserted 👍", book });
};

// 6 Insert Many Books
export const insertManyBooks = async (req, res) => {
  const books = await Book.insertMany(req.body);
  res.status(201).json({ message: "Books inserted 👍", books });
};

// 7 Insert Log
export const insertLog = async (req, res) => {
  const log = await Log.create(req.body);
  res.status(201).json({ message: "Log inserted 👍", log });
};

// 8 Update Book Year
export const updateBookYear = async (req, res) => {
  await Book.updateOne({ title: req.params.title }, { year: 2022 });
  res.json({ message: "Updated 👍" });
};

// 9 Find By Title
export const findByTitle = async (req, res) => {
  const book = await Book.findOne(req.query.title);
  if (!book) {
    return res.status(404).json({ message: "Book not found 👎" });
  }
  res.json(book);
};

// 10 Find Between Years
export const findBetweenYears = async (req, res) => {
  const books = await Book.find({
    year: { $gte: +req.query.from, $lte: +req.query.to },
  });
  if (books.length === 0) {
    return res.status(404).json({ message: "No books found 👎" });
  }
  res.json(books);
};

// 11 Find By Genre
export const findByGenre = async (req, res) => {
  const books = await Book.find({ genres: req.params.genre });
  if (books.length === 0) {
    return res.status(404).json({ message: "No books found 👎" });
  }
  res.json(books);
};

// 12 Skip Limit
export const skipLimit = async (req, res) => {
  const books = await Book.find().sort({ year: -1 }).skip(2).limit(3);
  if (books.length === 0) {
    return res.status(404).json({ message: "No books found 👎" });
  }
  res.json({ message: "there is your elements 👍", books });
};

// 13 Year Integer
export const yearInteger = async (req, res) => {
  const books = await Book.find({ year: { $type: "int" } });
  if (books.length === 0) {
    return res.status(404).json({ message: "No books found 👎" });
  }
  res.json(books);
};

// 14 Exclude Genres
export const excludeGenres = async (req, res) => {
  const books = await Book.find({
    genres: { $nin: ["Horror", "Science Fiction"] },
  });
    if (books.length === 0) {   
    return res.status(404).json({ message: "No books found 👎" });
  }
  res.json(books);
};

// 15 Delete Before Year
export const deleteBeforeYear = async (req, res) => {
   const books = await Book.deleteMany({ year: { $lt: +req.query.year } });
  res.json({ message: "Deleted 👍", books});
};

// 16 Aggregate >2000 and sort
export const aggregate1 = async (req, res) => {
  const data = await Book.aggregate([
    { $match: { year: { $gt: 2000 } } },
    { $sort: { year: -1 } },
  ]);
  res.json({ message: "there is your elements 👍", data });
};

//ggregate >2000 and show title, author, year
export const aggregate2 = async (req, res) => {
  const data = await Book.aggregate([
    { $match: { year: { $gt: 2000 } } },
    { $project: { title: 1, author: 1, year: 1 } },
  ]);
  res.json({ message: "there is your elements 👍", data });
};

// 18 Aggregate Unwind Genres
export const aggregate3 = async (req, res) => {
  const data = await Book.aggregate([{ $unwind: "$genres" }]);
  res.json({ message: "there is your elements 👍", data });
};

// 19 Aggregate Lookup Logs
export const aggregate4 = async (req, res) => {
  const data = await Book.aggregate([
    {
      $lookup: {
        from: "logs",
        localField: "_id",
        foreignField: "_id",
        as: "logs",
      },
    },
  ]);
  res.json({ message: "there is your elements 👍", data });
};
