import * as service from "./note.service.js";
import { verifyToken } from "../../common/utils/index.js";

const getUserId = (req) => verifyToken(req.headers.token).userId;

// 1
export const create = async (req, res) => {
  try {
    const userId = req.userId;
    const note = await service.createNote(userId, req.body);
    res.json({ message: "Note created successfully 👍", note });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating note", error: error.message });
  }
};

// 2
export const update = async (req, res) => {
  try {
    const userId = req.userId;
    if (!userId) {
      return res.status(401).json({ message: "you are not the owner" });
    }
    const note = await service.updateNote(req.params.noteId, userId, req.body);
    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }
    res.json({ message: "Note updated successfully 👍", note });
  } catch (error) {
    res.status(500).json({ message: "Error updating ", error: error.message });
  }
};

// 3
export const replace = async (req, res) => {
  try {
    const userId = req.userId;
    if (!userId) {
      return res.status(401).json({ message: "you are not the owner" });
    }
    const note = await service.replaceNote(req.params.noteId, userId, req.body);
    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }
    res.json({ message: "Note replaced successfully 👍", note });
  } catch (error) {
    res.status(500).json({ message: "Error replacing ", error: error.message });
  }
};

// 4
export const updateAll = async (req, res) => {
  try {
    const userId = req.userId;
    if (!userId) {
      return res.status(401).json({ message: "you are not the owner" });
    }
    const result = await service.updateAllTitles(userId, req.body.title);
    if (result.modifiedCount === 0) {
      return res.status(404).json({ message: "No notes found to update" });
    }
    res.json({ message: "All titles updated successfully 👍", result });
  } catch (error) {
    res.status(500).json({ message: "Error updating ", error: error.message });
  }
};

// 5
export const remove = async (req, res) => {
  try {
    const userId = req.userId;
    if (!userId) {
      return res.status(401).json({ message: "you are not the owner" });
    }
    const note = await service.deleteNote(req.params.noteId, userId);
    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }
    res.json({ message: "Note deleted successfully 👍", note });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting note", error: error.message });
  }
};

// 6
export const paginate = async (req, res) => {
  try {
    const userId = req.userId;
    const { page = 1, limit = 5 } = req.query;
    const notes = await service.paginateNotes(userId, +page, +limit);
    res.json({ message: "Notes list 👍", notes });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error paginating ", error: error.message });
  }
};

// 7
export const getById = async (req, res) => {
  try {
    const userId = req.userId;
    if (!userId) {
      return res.status(401).json({ message: "you are not the owner" });
    }
    const note = await service.getNoteById(req.params.noteId, userId);
    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }
    res.json({ message: "ther is your note 👇", note });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error retrieving note by id", error: error.message });
  }
};

// 8
export const getByContent = async (req, res) => {
  try {
    const userId = req.userId;
    if (!userId) {
      return res.status(401).json({ message: "you are not the owner" });
    }
    const note = await service.getNoteByContent(userId, req.query.content);
    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }
    res.json({ message: "ther is your note 👇", note });
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Error retrieving note by content",
        error: error.message,
      });
  }
};

// 9
export const withUser = async (req, res) => {
  try {
    const userId = req.userId;
    if (!userId) {
      return res.status(401).json({ message: "you are not the owner" });
    }
    const notes = await service.noteWithUser(userId);
    res.json({ message: "Notes retrieved successfully 👍", notes });
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Error retrieving notes with user",
        error: error.message,
      });
  }
};

// 10
export const aggregate = async (req, res) => {
  try {
    const userId = req.userId;
    if (!userId) {
      return res.status(401).json({ message: "you are not the owner" });
    }
    const { title } = req.query;

    const notes = await service.aggregateNotes(userId, title);
    res.status(200).json({ message: "Notes with details retrieved successfully 👍", notes });
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Error retrieving notes with details",
        error: error.message,
      });
  }
};

// 11
export const deleteAll = async (req, res) => {
  const userId = req.userId;
  await service.deleteAllNotes(userId);
  res.json({ message: "All notes deleted successfully 👍" });
};
