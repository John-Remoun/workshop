import mongoose from 'mongoose';
import { jj } from '../../config/config.service.js';
import { UserModel } from './model/user.model.js';

export const authentcateDB = async () => {
    try {

        await mongoose.connect(jj , { serverSelectionTimeoutMS: 3000 });
        console.log('DB connected successfully 😍');
        await UserModel.syncIndexes();
    } catch (error) {
        console.log(`DB not connected ${error}, URI: ${jj}`);
    }
}