import CONFIG from "../config";
import UserModel from "../database/models/User.model";
import { channel } from "../routes/userRoutes";
import { DbUsers, User } from "../types/user";
import { PublishMessage } from "../utils";
import { publishUserCreationInChat } from "./rabitmqService";

export async function createUser(user: {
  email: string;
  password: string;
  username: string;
}): Promise<DbUsers> {
  try {
    const res: DbUsers = await UserModel.create(user);
    const { _id, username, email } = res;

    // waiting for message queue
    await publishUserCreationInChat(await channel, { _id, username, email });

    return res;
  } catch (error) {
    throw error;
  }
}

export async function getUserByEmail(email: string): Promise<DbUsers> {
  try {
    const res = await UserModel.findOne({ email });
    return res;
  } catch (error) {
    throw error;
  }
}

export async function getUserById(_id: string): Promise<DbUsers> {
  try {
    const res = await UserModel.findById(_id);
    return res;
  } catch (error) {
    throw error;
  }
}

export async function getUserByUsername(username: string): Promise<User> {
  try {
    const res: DbUsers = await UserModel.findOne({ username });
    return res;
  } catch (error) {
    throw error;
  }
}
