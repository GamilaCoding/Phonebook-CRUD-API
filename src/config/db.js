import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("  success connect MongoDB ! ");
    } catch (err) {
        console.error("failed to connect MongoDB", err);
        process.exit(1);
    }
};

export default connectDB;
