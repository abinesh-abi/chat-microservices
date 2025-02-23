import { NextFunction, Request, response, Response } from "express";
import { Yup } from "../utils/Yup";
import {
  Chat,
  CrateChatBody,
  CustomRequest,
  DbChat,
  PaginationOutput,
  PaginationQuery,
} from "../types/global";
import chatService from "../services/chatService";

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
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const _id = req.user?._id as string;

    const filter = req.pagination as PaginationOutput;

    const chat: Chat[] = await chatService.getChatsByUser(_id, filter);

    res.json(chat);
  } catch (error) {
    console.log(error);
    next(error);
  }
};
