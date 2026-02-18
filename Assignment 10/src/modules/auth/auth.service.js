import { SALT_ROUND } from "../../../config/config.service.js";
import { hashApproaches } from "../../common/enums/security.enum.js";
import { conflictException } from "../../common/utils/response/index.js"
import { generateDecryption, generateencryption } from "../../common/utils/security/encryption.js";
import { generateHash } from "../../common/utils/security/hash.js";
import { create, findone } from "../../DB/database.repository.js";
import UserModel from "../../DB/model/user.model.js"
import {hash , compare } from "bcrypt";
import nodemailer from "nodemailer";

export const signup = async (inputs) => {
  const { username, email, password, phone } = inputs;
   if (!username || !email || !password || !phone) {
    throw new Error("All fields are required");
  }

  const checkEmail = await findone({
    model: UserModel,
    filter: { email },
  });

  if (checkEmail) {
    throw conflictException("Email already exists");
  }

  const user = await create({
    model: UserModel,
    data: { 
        username,
        email,
        password: await generateHash(password, hashApproaches.bcrypt),
        phone : await generateencryption(phone)
    }
  });

  const otp = Math.floor(100000 + Math.random() * 900000);

  // ابعت الايميل
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: { user: "your_email@gmail.com", pass: "your_app_password" },
  });

  await transporter.sendMail({
    from: "your_email@gmail.com",
    to: email,
    subject: "OTP Code",
    text: `Your OTP code is: ${otp}`,
  });


  return { ...user, otp };
};
export const login = async (inputs) => {
  const {email, password } = inputs;

  const user = await findone({
    model: UserModel,
    filter: { email },
    options: { lean: true },
  });

  if (!user) {
    throw conflictException("Invalid email or password  ");
  }

  if (!(await compare(password, user.password))) {
    return res.statuse(400).json({ message: "Invalid email or password" });
  }

  user.phone = await generateDecryption(user.phone);

  return user;
};