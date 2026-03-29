import User from "../../DB/model/user.model.js";
import {
  hashPassword,
  comparePassword,
  generateToken,
  encryptPhone,
} from "../../common/utils/index.js";

//1
export const signup = async (data) => {
  const { name, email, password, phone, age } = data;

  const isEmailExist = await User.findOne({ email });
  if (isEmailExist) {
    throw new Error("Email already exists");
  }

  const user = await User.create({
    name,
    email,
    password: hashPassword(password),
    phone: encryptPhone(phone),
    age,
  });
};

//2
export const login = async (data) => {
  const user = await User.findOne({ email: data.email });
  if (!user) throw new Error("Invalid email credentials");

  const match = comparePassword(data.password, user.password);
  if (!match) throw new Error("Invalid password credentials");

  return generateToken({ userId: user._id });
};

//3
export const updateUser = async (userId, data) => {
  if (data.password) {
    throw new Error("Cannot update password");
  }

  if (data.email) {
    const emailExist = await User.findOne({ email: data.email });
    if (emailExist) {
      throw new Error("Email already exists");
    }
  }

  const user = await User.findByIdAndUpdate(
    userId,
    data,
    { new: true }
  );

  return user;
};

//4
export const deleteUser = async (userId) => {
  return await User.findByIdAndDelete(userId);
};

//5
export const getUser = async (userId) => {
  return await User.findById(userId);
};
