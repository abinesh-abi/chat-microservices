import MessageModel from "../database/models/Message.model";
import mongoose from "mongoose";
import { DbMessage, Message, MessageBody, PaginationOutput } from "../types/global";

export default {
  async creteMessage({
    sender,
    chatId,
    content,
  }: MessageBody): Promise<DbMessage> {
    try {
      const res = await MessageModel.create({ sender, chatId, content });
      return res;
    } catch (error) {
      throw error;
    }
  },
  async getMessagesByChat(
    chatId: string,
    filter: PaginationOutput
  ): Promise<{ data: Message[]; count: number }> {
    // const userObjId = new mongoose.Types.ObjectId(_id);
    const match = {
      chatId ,
      // username: {
      //   $regex: new RegExp(`^${filter.search}`),
      //   $options: "i",
      // },
    };
    try {
      let messages = await MessageModel.aggregate([
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
      const count = messages[0].count[0].total | 1;
      const data = messages[0].data || [];
      return { count, data };
    } catch (error) {
      throw error;
    }
  },
};
