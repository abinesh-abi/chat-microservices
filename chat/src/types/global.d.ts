import { Request } from "express";

export interface CustomRequest extends Request {
  user?: User;
}

export type Chat = {
  _id: string;
  users: string[];
  description: string;
  createdAt: string;
  updatedAt: string;
};

type DbChat = mongoose.Document & Chat;

type CrateChatBody = {
  user1: string;
  user2: string;
};

export type User = {
  _id: string;
  username: string;
  email: string;
  image?: string;
};
