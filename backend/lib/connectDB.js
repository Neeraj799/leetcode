import mongoose from "mongoose";
import envConfig from "../config/envConfig.js";

export const connectDB = mongoose
  .connect(envConfig.db.URL)
  .then(() => {
    console.log("Mongoose connected");
  })
  .catch((err) => {
    console.log("MongoDB connection error", err);
  });
