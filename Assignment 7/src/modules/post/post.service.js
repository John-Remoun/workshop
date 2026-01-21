import { Post, User, Comment } from "../../DB/model/index.js";
import { Sequelize } from "sequelize";

// CREATE
export const createPost = async (data) => {

  const post = await Post.create(data);

  return post;
};

// DELETE
export const deletePost = async (postId, userId) => {

  const post = await Post.findByPk(postId);

  if (!post) {
    const error = new Error("Post not found");
    error.cause = { status: 404 };
    throw error;
  }

  if (post.userId != userId) {
    const error = new Error("You are not allowed to delete this post");
    error.cause = { status: 403 };
    throw error;
  }

  await post.destroy();

  return { message: "Post deleted successfully" };
};

// DETAILS
export const postDetails = async () => {

  return await Post.findAll({
    attributes: ["id", "title"],
    include: [
      { model: User,as:"user" ,attributes: ["id", "name"] },
      { model: Comment,as:"comments", attributes: ["id", "content"] }
    ]
  });
};

// COMMENT COUNT
export const commentCount = async () => {

  return await Post.findAll({
    attributes: [
      "id",
      "title",
      [Sequelize.fn("COUNT", Sequelize.col("Comments.id")), "commentsCount"]
    ],
    include: [
      { model: Comment, as:"comments" }
    ],
    group: ["Post.id"]
  });
};
