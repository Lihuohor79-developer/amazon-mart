import mongoose from "mongoose";

export const connectDB = async () => {
  await mongoose
    .connect(
      "mongodb+srv://lyhoursciencekh29_db_user:EOjMqSNlEI1rSAEi@cluster0.tqflhoz.mongodb.net/AmazonMart",
    )
    .then(() => {
      console.log("Database connected");
    });
};
