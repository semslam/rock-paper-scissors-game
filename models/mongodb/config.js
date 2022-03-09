import mongoose from "mongoose";
import "dotenv/config";

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DATABASE_CONFIG, {   
        maxPoolSize: 50,
        wtimeoutMS: 2500,
        useNewUrlParser: true
        });
    } catch (err) {
        console.error(err);
    }
}


mongoose.connection.on('connecting', () => console.info('database connecting....'));
mongoose.connection.on('connected', () => console.info('database connected'));
mongoose.connection.on('disconnecting', () => console.info('database disconnecting....'));
mongoose.connection.on('disconnected', () => console.info('database disconnected'));
mongoose.connection.on('error', () => console.error('database error'));

export default connectDB