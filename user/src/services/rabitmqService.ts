import { Channel } from "amqplib";
import { PublishMessage } from "../utils";
import CONFIG from "../config";

type SubscribeEventPayload = {
  event: string;
  data: Record<string, any>;
};

export function subscribeEvents(payloadJson: string) {
  const payload: SubscribeEventPayload = JSON.parse(payloadJson);

  const { event, data } = payload;

  const { userId, product, order, qty } = data;

  switch (event) {
    // case 'ADD_TO_WISHLIST':
    // case 'REMOVE_FROM_WISHLIST':
    //     this.AddToWishlist(userId,product)
    //     break;
    // case 'ADD_TO_CART':
    //     this.ManageCart(userId,product, qty, false);
    //     break;
    // case 'REMOVE_FROM_CART':
    //     this.ManageCart(userId,product,qty, true);
    //     break;
    // case 'CREATE_ORDER':
    //     this.ManageOrder(userId,order);
    //     break;
    default:
      break;
  }
}

export async function publishUserCreationInChat(
  channel: Channel,
  data: { _id: string; username: string; email: string }
) {
  const msgJson = JSON.stringify({
    data,
    event: "CREATE_USER",
  });
  return await PublishMessage(channel, CONFIG.CHAT_BINDING_KEY, msgJson);
}
