import mongoose from 'mongoose';
import { DB_URI } from '../../config/config.service.js';


export const authentcateDB = async () => {
    try {

        await mongoose.connect(DB_URI);
        console.log('DB connected successfully 😍');
    } catch (error) {
        console.log(`DB not connected 🤦‍♂️ ${error}`);
    }
}