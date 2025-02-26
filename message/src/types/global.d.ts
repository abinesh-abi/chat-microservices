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

export type MessageBody = {
  chatId: string;
  sender: string;
  content?: string;
};

export type Message = {
  _id: string;
  chatId: string;
  sender: string;
  content?: string;
};

type DbMessage = mongoose.Document & Message;


