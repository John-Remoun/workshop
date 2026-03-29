import * as service from "./comment.service.js";

export const bulkCreate = async (req, res, next) => {
  try {

    const comments = await service.bulkCreate(req.body);

    return res.status(201).json({
      message: "Comments created ",
      data: comments
    });

  } catch (error) {
    next(error);
  }
};

export const updateComment = async (req, res, next) => {
  try {

    const result = await service.updateComment(
      req.params.commentId,
      req.body
    );

    return res.status(200).json({
      message: "Comment updated ",
      data: result
    });

  } catch (error) {
    next(error);
  }
};

export const findOrCreate = async (req, res, next) => {
  try {

    const result = await service.findOrCreate(req.body);

    return res.status(200).json({
      message: "Done",
      data: result
    });

  } catch (error) {
    next(error);
  }
};

export const search = async (req, res, next) => {
  try {

    const result = await service.search(req.query.word);

    return res.status(200).json({
      message: "Search completed",
      data: result
    });

  } catch (error) {
    next(error);
  }
};

export const newest = async (req, res, next) => {
  try {

    const result = await service.newest(req.params.postId);

    return res.status(200).json({
      message: "Newest comments fetched",
      data: result
    });

  } catch (error) {
    next(error);
  }
};

export const details = async (req, res, next) => {
  try {

    const result = await service.details(req.params.id);

    return res.status(200).json({
      message: "Comment details fetched",
      data: result
    });

  } catch (error) {
    next(error);
  }
};
