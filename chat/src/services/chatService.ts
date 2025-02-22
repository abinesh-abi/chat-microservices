import ChatModel from "../database/models/Chat.model";
import { DbChat } from "../types/global";

export default {
  async creteChat(user1: string, user2: string): Promise<DbChat> {
    try {
      const res: DbChat = await ChatModel.create({ users: [user1, user2] });
      return res;
    } catch (error) {
      throw error;
    }
  },
  async getChatsByUser(_id: string): Promise<DbChat[]> {
    try {
      let chats = await ChatModel.aggregate([
        { $match: { users: _id } },
        // {
        //   $project: {
        //     name: 1,
        //     user /*name*/: {
        //       $filter: {
        //         input: "$users",
        //         as: "user",
        //         cond: {
        //           $ne: ["$$user", userId],
        //         },
        //       },
        //     },
        //   },
        // },
        // { $unwind: "$user" },
        // {
        //   $lookup: {
        //     from: "users",
        //     foreignField: "_id",
        //     localField: "user",
        //     as: "userDetails",
        //   },
        // },
        // { $unwind: "$userDetails" },
      ]);
      return chats;
    } catch (error) {
      throw error;
    }
  },
};
