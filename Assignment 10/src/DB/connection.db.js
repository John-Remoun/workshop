import mongoose from 'mongoose';
import { DB_URI } from '../../config/config.service.js';
import { UserModel } from './model/user.model.js';

export const authentcateDB = async () => {
    try {

        await mongoose.connect(DB_URI , { serverSelectionTimeoutMS: 3000 });
        console.log('DB connected successfully 😍');
        await UserModel.syncIndexes();
    } catch (error) {
        console.log(`DB not connected 🤦‍♂️ ${error}`);
    }
}