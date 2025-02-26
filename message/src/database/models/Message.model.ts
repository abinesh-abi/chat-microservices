import mongoose from "mongoose";
import { DbMessage } from "../../types/global";

const Schema = mongoose.Schema;

const MessageSchema = new Schema<DbMessage>(
  {
    content: {
      type: String,
      // maxlength: [200, "Name cannot be more than 200 characters"],
    },
    chatId: {
      type: String,
      required:true,
    },
    sender: {
      type: String,
      required:true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("message", MessageSchema);
