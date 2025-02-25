import { request, Request } from "express";

export type PaginationQuery = {
  page?: string | number;
  search?: string;
  size?: string | number;
};

export type PaginationOutput = {
  skip: number;
  limit: number;
  search: string;
  pipeline: CustomObj[];
  original: PaginationQuery;
};

type CustomObj = Record<string, any>;

export interface CustomRequest<
  Params = CustomObj,
  Query = CustomObj,
  Body = CustomObj
> extends Request {
  body: Body & Request["body"];
  params: Params & Request["params"];
  query: Query & Request["query"] & PaginationQuery;
  user?: User;
  pagination?: PaginationOutput;
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
