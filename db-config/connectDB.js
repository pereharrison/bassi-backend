import mongoose from "mongoose";

export const connectDB = async ()=>  {
  try {
    await mongoose.connect(`${process.env.DB_URI}`);
    console.log("Database connected successfully!");
  } catch (error) {
    console.log("Database failed to connect", error);
    process.exit(1);
  }
}

export default connectDB