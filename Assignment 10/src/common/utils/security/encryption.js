import crypto from "node:crypto";
import { IV_LENGTH , ENC_SECRET_KEY } from "../../../../config/config.service.js";


export const generateencryption =  async (plaintext) => {

    const iv = crypto.randomBytes(IV_LENGTH);

    const cipherIV = crypto.createCipheriv('aes-256-cbc', ENC_SECRET_KEY, iv);
    let ciphertext = cipherIV.update(plaintext, 'utf8', 'hex');
    ciphertext += cipherIV.final('hex');
    return iv.toString('hex') + ':' + ciphertext;


}

export const generateDecryption = async (encryptedData) => {

    const [iv, ciphertext] = encryptedData.split(':');
    const ivLikeBinary = Buffer.from(iv, 'hex');

    let decipher = crypto.createDecipheriv('aes-256-cbc', ENC_SECRET_KEY, ivLikeBinary);
    let plaintext = decipher.update(ciphertext, 'hex', 'utf8');
    plaintext += decipher.final('utf8');
    return plaintext;
}