import { Comment, User, Post } from "../../DB/model/index.js";
import { Op } from "sequelize";

export const bulkCreate = async (data) => {

  return await Comment.bulkCreate(data);
};

export const updateComment = async (id, data) => {

  const comment = await Comment.findByPk(id);

  if (!comment) {
    const error = new Error("Comment not found");
    error.cause = { status: 404 };
    throw error;
  }

  if (comment.userId != data.userId) {
    const error = new Error("You are not allowed to update this comment");
    error.cause = { status: 403 };
    throw error;
  }

  comment.content = data.content;
  await comment.save();

  return comment;
};

export const findOrCreate = async (data) => {

  return await Comment.findOrCreate({
    where: data
  });
};

export const search = async (word) => {

  return await Comment.findAndCountAll({
    where: {
      content: {
        [Op.like]: `%${word}%`
      }
    }
  });
};

export const newest = async (postId) => {

  return await Comment.findAll({
    where: { postId },
    order: [["createdAt", "DESC"]],
    limit: 3
  });
};

export const details = async (id) => {

  const comment = await Comment.findByPk(id, {
    include: [
      {model: User, as:"user"}, 
      {model: Post , as:"post"}
    ]
  });

  if (!comment) {
    const error = new Error("Comment not found");
    error.cause = { status: 404 };
    throw error;
  }

  return comment;
};
