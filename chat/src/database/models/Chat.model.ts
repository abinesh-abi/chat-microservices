import mongoose from "mongoose";
import { DbChat } from "../../types/global";

const Schema = mongoose.Schema;

const ChatSchema = new Schema<DbChat>(
  {
    description: {
      type: String,
      maxlength: [200, "Name cannot be more than 200 characters"],
    },
    users: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true }
);

export default mongoose.model("chat", ChatSchema);
