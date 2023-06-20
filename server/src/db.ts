import { Request, Response } from "express";
import mongoose from "mongoose";

const connectDB = async () => {
  try {
    mongoose.set("strictQuery", false);
    await mongoose
      .connect(process.env.DB_URI!)
      .then(() => console.log("Connected to DB"))
      .catch((err: any) => console.error("Could not connect", err));
  } catch (error) {
    console.error("Erro no db.ts", error);
  }
};

export default connectDB;