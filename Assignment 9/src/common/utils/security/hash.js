import bcrypt from "bcrypt";

export const hashPassword = (password) =>{
  try {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
  } catch (error) {
     console.log("Error hashing password:", error);
  }
}

export const comparePassword = (password, hash) =>{
  try {
    return bcrypt.compareSync(password, hash);
  } catch (error) {
    console.log("Error comparing password:", error);
  }
}
 
