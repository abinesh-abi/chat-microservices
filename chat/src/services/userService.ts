import UserModel from "../database/models/User.model";
import { User } from "../types/global";

export async function createUser(user: {
  _id: string;
  email: string;
  username: string;
}): Promise<User> {
  try {
    const res = await UserModel.create(user);
    return res;
  } catch (error) {
    throw error;
  }
}
