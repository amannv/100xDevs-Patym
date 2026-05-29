import mongoose from "mongoose";

export const ConnectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log("DB Connected");
  } catch (e) {
    console.error("error while connecting to DB");
  }
};
