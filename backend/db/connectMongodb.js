import mongoose from "mongoose";

const connectMongodb = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGOURI);
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(`Error Connection to MongoDB:${error.message}`);
    process.exit(1);
  }
};

export default connectMongodb;
