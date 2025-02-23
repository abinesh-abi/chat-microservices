import ChatModel from "../database/models/Chat.model";
import { CustomObj, DbChat, PaginationOutput } from "../types/global";
import mongoose from "mongoose";

export default {
  async creteChat(user1: string, user2: string): Promise<DbChat> {
    try {
      const res: DbChat = await ChatModel.create({ users: [user1, user2] });
      return res;
    } catch (error) {
      throw error;
    }
  },
  async getChatsByUser(
    _id: string,
    filter: PaginationOutput
  ): Promise<DbChat[]> {
    const userObjId = new mongoose.Types.ObjectId(_id);
    try {
      let chats = await ChatModel.aggregate([
        { $match: { users: userObjId } },
        { $skip: filter.limit },
        { $limit: filter.limit },
        {
          $lookup: {
            from: "users",
            foreignField: "_id",
            localField: "users",
            as: "userDetails",
          },
        },
      ]);
      return chats;
    } catch (error) {
      throw error;
    }
  },
};
