import { NextFunction, Request, response, Response } from "express";
import { Yup } from "../utils/Yup";
import { Chat, CrateChatBody, DbChat } from "../types/global";
import chatService from "../services/chatService";
import { PublishMessage, SubscribeMessage } from "../utils";
import { channel } from "../routes/chatRoutes";
import CONFIG from "../config";

const chatCreateSchema = Yup.object().shape({
  user1: Yup.string().required(),
  user2: Yup.string().required(),
});

export const createChat = async (
  req: Request<{}, {}, CrateChatBody>,
  res: Response,
  next: NextFunction
) => {
  try {
    const body = req.body;
    // validate body
    const validatedData = await chatCreateSchema.validate(body, {
      abortEarly: false,
    });
    const { user1, user2 } = validatedData;

    const chat = await chatService.creteChat(user1, user2);

    res.json(chat);
  } catch (error) {
    next(error);
  }
};

export const getChatsByUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const _id = req.params.id;

    const chat: Chat[] = await chatService.getChatsByUser(_id);
      chat.map(async (val) => {
        const otherUserId = val.users.find(
          (userId) => userId !== _id
        ) as string;
        // console.log(otherUserId);
        PublishMessage(await channel, CONFIG.USER_BINDING_KEY, '{"event":"hi","data":"done"}');
      });
    res.json(chat);
  } catch (error) {
    console.log(error);
    next(error);
  }
};
