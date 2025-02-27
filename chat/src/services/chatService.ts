import ChatModel from "../database/models/Chat.model";
import UserModel from "../database/models/User.model";
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
  ): Promise<{ data: DbChat[]; count: number }> {
    const userObjId = new mongoose.Types.ObjectId(_id);
    try {
      let chats = await ChatModel.aggregate([
        { $match: { users: userObjId } },
        {
          $facet: {
            data: [
              // { $match: match },
              { $skip: filter.skip },
              { $limit: filter.limit },
              {
                $lookup: {
                  from: "users",
                  foreignField: "_id",
                  localField: "users",
                  as: "userDetails",
                },
              },
            ],
            count: [{ $count: "total" }],
          },
        },
        // { $skip: filter.skip },
        // { $limit: filter.limit },
        // {
        //   $lookup: {
        //     from: "users",
        //     foreignField: "_id",
        //     localField: "users",
        //     as: "userDetails",
        //   },
        // },
      ]);
      // return chats;
      const count = chats[0].count[0].total | 1;
      const data = chats[0].data || [];
      return { count, data };
    } catch (error) {
      throw error;
    }
  },
};
