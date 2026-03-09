import * as service from "./user.service.js";
import { verifyToken } from "../../common/utils/index.js";

//1
export const signup = async (req, res) => {
  try {
    const user = await service.signup(req.body);
    res.status(201).json({ message: "Signed up successfully 👍", user });
  } catch (error) {
    res.status(400).json({ message: "user not created 👎", error: error.message });
  }
};

//2
export const login = async (req, res) => {
  try {
    const token = await service.login(req.body);
    res.status(200).json({ message: "Logged in successfully 👍", token });
  } catch (error) {
    res.status(400).json({ message: "login failed 👎", error: error.message });
  }
};

//3
export const updateUser = async (req, res ) => {
  try {
    const userId = req.userId;
    const user = await service.updateUser(userId, req.body);
    res.status(200).json({ message: "Updated successfully 👍", user });
  } catch (error) {
    res.status(400).json({ message: "Update failed 👎", error: error.message });
    console.log(error);
  }
};

//4
export const deleteUser = async (req, res) => {
  try {
    const userId = req.userId;
    await service.deleteUser(userId);
    res.status(200).json({ message: "Deleted successfully 👍" });
  } catch (error) {
    res.status(400).json({ message: "Delete failed 👎", error: error.message });
  }
};

//5
export const getUser = async (req, res) => {
  try {
    const userId = req.userId;
    const user = await service.getUser(userId);
    res.status(200).json({ message: "Retrieved successfully 👍", user });
  } catch (error) {
    res.status(400).json({ message: "Retrieval failed 👎", error: error.message });
  }
};
