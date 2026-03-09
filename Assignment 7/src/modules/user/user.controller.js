import * as service from "./user.service.js";

export const signup = async (req, res, next) => {
  try {

    const user = await service.signup(req.body);

    return res.status(201).json({
      message: "User created successfully",
      data: user
    });

  } catch (error) {
    next(error);
  }
};

export const updateUser = async (req, res, next) => {
  try {

    const result = await service.updateUser(req.params.id, req.body);

    return res.status(200).json({
      message: "User created or updated successfully",
      data: result
    });

  } catch (error) {
    next(error);
  }
};

export const getByEmail = async (req, res, next) => {
  try {

    const user = await service.getByEmail(req.query.email);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({
      message: "User fetched successfully",
      data: user
    });

  } catch (error) {
    next(error);
  }
};

export const getById = async (req, res, next) => {
  try {

    const user = await service.getById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({
      message: "User fetched successfully",
      data: user
    });

  } catch (error) {
    next(error);
  }
};
