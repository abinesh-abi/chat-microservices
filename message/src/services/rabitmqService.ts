
type SubscribeEventPayload = {
  event: string;
  data: Record<string, any>;
};
export async function subscribeEvents(payloadJson: string) {
  try {
    const payload: SubscribeEventPayload = JSON.parse(payloadJson);

    const { event, data } = payload;

    switch (event) {
      // case "CREATE_USER": //crate user
      //   const { _id, email, username } = data as User;
      //   userService.createUser({ _id, email, username });
      //   break;
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
  } catch (error) {
    throw error;
  }
}
