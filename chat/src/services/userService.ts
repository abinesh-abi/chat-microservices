import UserModel from "../database/models/User.model";
import { PaginationOutput, User } from "../types/global";
import mongoose from "mongoose";

export default {
  async createUser(user: {
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
  },
  async usersNotInChat(
    _id: string,
    filter: PaginationOutput
  ): Promise<{ data: User[]; count: number }> {
    const userObjId = new mongoose.Types.ObjectId(_id);
    const match = {
      _id: { $ne: userObjId },
      username: {
        $regex: new RegExp(`^${filter.search}`),
        $options: "i",
      },
    };
    try {
      let chats = await UserModel.aggregate([
        {
          $match: match,
        },
        {
          $facet: {
            data: [
              // { $match: match },
              { $skip: filter.skip },
              { $limit: filter.limit },
            ],
            count: [{ $count: "total" }],
          },
        },
        // { $skip: filter.skip },
        // { $limit: filter.limit },
      ]);
      const count = chats[0].count[0].total | 1;
      const data = chats[0].data || [];
      return { count, data };
    } catch (error) {
      throw error;
    }
  },
};
