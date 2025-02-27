import { NextFunction, Request, response, Response } from "express";
import { Yup } from "../utils/Yup";
import {
  CustomRequest,
  Message,
  MessageBody,
  PaginationOutput,
} from "../types/global";
import messageService from "../services/messageService";

const chatCreateSchema = Yup.object().shape({
  chatId: Yup.string().required(),
  content: Yup.string().required(),
  sender: Yup.string().required(),
});

export const createMessage = async (
  req: Request<{}, {}, MessageBody>,
  res: Response,
  next: NextFunction
) => {
  try {
    const body = req.body;
    // validate body
    const validatedData = await chatCreateSchema.validate(body, {
      abortEarly: false,
    });
    const { chatId, content, sender } = validatedData;

    const chat = await messageService.creteMessage({ chatId, sender, content });

    res.json(chat);
  } catch (error) {
    next(error);
  }
};

export const getMessageByChat = async (
  req: CustomRequest<{ id: string }>,
  res: Response,
  next: NextFunction
) => {
  try {
    const _id = req.params?.id;

    const filter = req.pagination as PaginationOutput;

    const { data, count } = await messageService.getMessagesByChat(_id, filter);

    res.json({ ...filter.original, data, count });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
