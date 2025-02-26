import { Router } from "express";
import { CreateChannel, SubscribeMessage } from "../utils";
import validateUser from "../middlewares/validateUser";
import { createMessage, getMessageByChat } from "../controller/messageController";

const router = Router();

export const channel = // Connect to RabbitMQ
(async function connectToRabbitMQ() {
  const channel = await CreateChannel();
  SubscribeMessage(channel);
  return channel;
})();

router.post("/create", createMessage);
router.get("/msg-by-chat/:id",validateUser, getMessageByChat);

export default router;
