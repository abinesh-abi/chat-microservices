import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import amqplib, { Channel } from "amqplib";
import CONFIG from "../config";
import { subscribeEvents } from "../services/rabitmqService";

//Utility functions
export const generateSalt = async () => {
  return await bcrypt.genSalt(10);
};

export const generatePassword = async (password: string) => {
  return await bcrypt.hash(password, await generateSalt());
};

export const validatePassword = async (
  enteredPassword: string,
  savedPassword: string
) => {
  return await bcrypt.compare(enteredPassword, savedPassword);
};

export const generateAccessToken = (payload: Record<string, any>) => {
  return jwt.sign(payload, CONFIG.APP_SECRET, { expiresIn: "1d" });
};
export const generateRefreshToken = (payload: Record<string, any>) => {
  return jwt.sign(payload, CONFIG.APP_SECRET, { expiresIn: "30d" });
};

export const validateAccessToken = (token: string) => {
  try {
    const tokenObj = jwt.verify(token, CONFIG.APP_SECRET);
    return tokenObj as { _id: string; name: string; email: string };
  } catch (error) {
    return false;
  }
};

/**----------- Message Broker ---------------------- */

// create channel
export const CreateChannel = async () => {
  try {
    const connection = await amqplib.connect(CONFIG.MESSAGE_BROKER_URL);
    const channel = await connection.createChannel();
    await channel.assertExchange(CONFIG.EXCHANGE_NAME, "direct");
    return channel;
  } catch (error) {
    throw error;
  }
};

// subscribe message
export const SubscribeMessage = async (
  channel: amqplib.Channel
  // service: any
) => {
  const appQueue = await channel.assertQueue(CONFIG.QUEUE_NAME);
  channel.bindQueue(
    appQueue.queue,
    CONFIG.EXCHANGE_NAME,
    CONFIG.CHAT_BINDING_KEY
  );

  channel.consume(appQueue.queue, (data) => {
    console.log("received data");
    console.log(data?.content.toString());
    subscribeEvents(data?.content.toString() || "{}");
    if (data) channel.ack(data);
  });
};

// publish message
export const PublishMessage = async (
  channel: amqplib.Channel,
  binding_key: string,
  message: string
) => {
  try {
    await channel.publish(
      CONFIG.EXCHANGE_NAME,
      binding_key,
      Buffer.from(message)
    );
    console.log("Message has been sent: " + message);
  } catch (error) {
    throw error;
  }
};
