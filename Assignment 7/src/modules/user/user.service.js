import { User } from "../../DB/model/index.js";

export const signup = async (data) => {

  const exist = await User.findOne({
    where: { email: data.email }
  });

  if (exist) {
    const error = new Error("Email already exists");
    error.cause = { status: 400 };
    throw error;
  }

  const user = User.build(data);
  await user.save();

  return user;
};

export const updateUser = async (id, data) => {

  const result = await User.upsert(
    { id, ...data },
    { validate: false }
  );

  return result;
};

export const getByEmail = async (email) => {

  return await User.findOne({
    where: { email }
  });
};

export const getById = async (id) => {

  return await User.findByPk(id, {
    attributes: { exclude: ["role"] }
  });
};
