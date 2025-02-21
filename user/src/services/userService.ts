import UserModel from "../database/models/User.model";
import { DbUsers, User } from "../types/user";

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

export async function createUser(user: {
  email: string;
  password: string;
  username: string;
}): Promise<DbUsers> {
  try {
    const res = await UserModel.create(user);

    return res;
  } catch (error) {
    throw error;
  }
}

export async function getUserByEmail(email: string): Promise<DbUsers> {
  try {
    const res = await UserModel.findOne({ email });
    return res;
  } catch (error) {
    throw error;
  }
}

export async function getUserById(_id: string): Promise<DbUsers> {
  try {
    const res = await UserModel.findById(_id);
    return res;
  } catch (error) {
    throw error;
  }
}

export async function getUserByUsername(username: string): Promise<User> {
  try {
    const res:DbUsers = await UserModel.findOne({ username });
    return res;
  } catch (error) {
    throw error;
  }
}
