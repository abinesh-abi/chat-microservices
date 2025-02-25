import { Router } from "express";
import { CreateChannel, SubscribeMessage } from "../utils";
import { Channel } from "amqplib";
import { createChat, getChatsByUser, getUsersListNoChat } from "../controller/chatController";
import validateUser from "../middlewares/validateUser";

const router = Router();

export const channel = // Connect to RabbitMQ
(async function connectToRabbitMQ() {
  const channel = await CreateChannel();
  SubscribeMessage(channel);
  return channel;
})();

router.post("/create", createChat);
router.get("/list",validateUser, getChatsByUser);
router.get("/user-no-chat",validateUser, getUsersListNoChat);

export default router;
