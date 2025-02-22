import mongoose from "mongoose";
import { User } from "../../types/global";

const Schema = mongoose.Schema;

const UserSchema = new Schema<User>(
  {
    username: {
      type: String,
      required: [true, "Please provide Email."],
      maxlength: [60, "Name cannot be more than 60 characters"],
    },
    email: {
      type: String,
      required: [true, "Please provide Email."],
    },
    password: {
      type: String,
    },
    image: {
      type: String,
    },
  },
);

export default mongoose.model("user", UserSchema);
