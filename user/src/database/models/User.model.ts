import mongoose from "mongoose";
import { DbUsers } from "../../types/user";

const Schema = mongoose.Schema;

const UserSchema = new Schema<DbUsers>(
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
    phone: {
      type: Number,
    },
    image: {
      type: String,
    },
  },
  {
    timestamps: true,
    toObject: {
      transform: (doc, ret) => {
        delete ret.password; // Remove the password field
        return ret;
      },
    },
  }
);

export default mongoose.model("user", UserSchema);
