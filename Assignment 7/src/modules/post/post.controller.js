import * as service from "./post.service.js";

// CREATE
export const createPost = async (req, res, next) => {
  try {

    const post = await service.createPost(req.body);

    return res.status(201).json({
      message: "Post created successfully",
      data: post
    });

  } catch (error) {
    next(error);
  }
};

// DELETE
export const deletePost = async (req, res, next) => {
  try {

    const result = await service.deletePost(
      req.params.postId,
      req.body.userId
    );

    return res.status(200).json(result);

  } catch (error) {
    next(error);
  }
};

// DETAILS
export const postDetails = async (req, res, next) => {
  try {

    const posts = await service.postDetails();

    return res.status(200).json({
      message: "Posts fetched successfully",
      data: posts
    });

  } catch (error) {
    next(error);
  }
};

// COMMENT COUNT
export const commentCount = async (req, res, next) => {
  try {

    const result = await service.commentCount();

    return res.status(200).json({
      message: "Comments count fetched successfully",
      data: result
    });

  } catch (error) {
    next(error);
  }
};
