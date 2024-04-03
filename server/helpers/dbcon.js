import "dotenv/config";
import mongoose from "mongoose";

export const dbCon = async () => {
  await mongoose.connect(process.env.MONGO_URL);
};
