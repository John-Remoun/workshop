import { hash, compare } from "bcrypt";
import { SALT_ROUND } from "../../../../config/config.service.js";
import * as argon2 from "argon2"

export const generateHash = async (password, approach) => {
  try {
    if (approach === "argon2") {
      const hashedPassword = await argon2.hash(password);
      return hashedPassword;
    } else {
      const hashedPassword = await hash(password, SALT_ROUND);
      return hashedPassword;
    }
  } catch (error) {
    throw new Error("Error hashing password: " + error.message);
  }
};

export const compareHash = async (password, hashedPassword) => {
  try {
    const isMatch = await compare(password, hashedPassword);
    return isMatch;
  } catch (error) {
    throw new Error("Error comparing password: " + error.message);
  }
}; 