import crypto from "crypto";

export const encryptPhone = (phone) => {
  try {
    const cipher = crypto.createCipheriv(
      "aes-256-ctr",
      process.env.ENCRYPT_KEY,
      process.env.ENCRYPT_IV
    );
    let encrypted = cipher.update(phone, "utf8", "hex");
    encrypted += cipher.final("hex");
    return encrypted;
  } catch (error) {
    console.log("Error encrypting phone:", error);
    
  }
};
