import Note from "../../DB/model/note.model.js";
import mongoose from "mongoose";

// 1
export const createNote = async (userId, data) => {
  return await Note.create({ ...data, userId });
};

// 2
export const updateNote = async (noteId, userId, data) => {
  return await Note.findOneAndUpdate({ _id: noteId, userId }, data, {
    new: true,
  });
};

// 3
export const replaceNote = async (noteId, userId, data) => {
  return await Note.findOneAndReplace(
    { _id: noteId, userId },
    { ...data, userId },
    { new: true },
  );
};

// 4
export const updateAllTitles = async (userId, title) => {
  return await Note.updateMany({ userId }, { title });
};

// 5
export const deleteNote = async (noteId, userId) => {
  return await Note.findOneAndDelete({ _id: noteId, userId });
};

// 6
export const paginateNotes = async (userId, page, limit) => {
  return await Note.find({ userId })
    .sort({ createdAt: -1 })
    .skip((page - 1) * limit)
    .limit(limit);
};

// 7
export const getNoteById = async (noteId, userId) => {
  return await Note.findOne({ _id: noteId, userId });
};

// 8
export const getNoteByContent = async (userId, content) => {
  return await Note.findOne({ userId, content });
};

// 9
export const noteWithUser = async (userId) => {
  return await Note.find({ userId })
    .select({ title: 1, createdAt: 1, userId: 1 })
    .populate("userId", "email");
};

// 10
export const aggregateNotes = async (userId, title) => {
  const pipeline = [
    {
      $match: {
        userId: new mongoose.Types.ObjectId(userId),
      },
    },
    {
      $match: title ? { title: { $regex: title, $options: "i" } } : {},
    },
    {
      $lookup: {
        from: "users",
        localField: "userId",
        foreignField: "_id",
        as: "user",
      },
    },
    {
      $unwind: "$user",
    },
    {
      $project: {
        title: 1,
        userId: 1,
        createdAt: 1,
        "user.name": 1,
        "user.email": 1,
      },
    },
  ];

  return await Note.aggregate(pipeline);
};

// 11
export const deleteAllNotes = async (userId) => {
  return await Note.deleteMany({ userId });
};
