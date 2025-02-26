import mongoose from "mongoose";
import CONFIG from "../config";

export default async () => {
  try {
    if (CONFIG.DB_URL) {
      await mongoose.connect(CONFIG.DB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
      });
    } else {
      console.log('Please Provide "DB_URL" in env');
    }
    console.log("Db Connected");
  } catch (error) {
    console.log("Error ============");
    console.log(error);
    process.exit(1);
  }
};
