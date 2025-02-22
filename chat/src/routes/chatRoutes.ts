import { Router } from "express";
import { CreateChannel, SubscribeMessage } from "../utils";
import { Channel } from "amqplib";
import { createChat, getChatsByUser } from "../controller/chatController";

const router = Router();

export const channel = // Connect to RabbitMQ
(async function connectToRabbitMQ() {
  const channel = await CreateChannel();
  SubscribeMessage(channel);
  return channel;
})();

router.post("/create", createChat);
router.get("/list/:id", getChatsByUser);

export default router;
