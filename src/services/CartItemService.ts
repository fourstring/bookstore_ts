import {BaseService} from "./BaseService";
import {ICart, ICartItem, ICartItemInput, ICartItemResource} from "../types/ICart";

export interface ICheckoutInput {
  items: number[];
}

export class CartItemService extends BaseService<ICartItem, ICartItemInput, ICartItemResource> {
  endpoint = "/data/cart_items";
  resourceName = "cartItems";

  async checkout(input: ICheckoutInput): Promise<ICartItem[]> {
    let res = await this.client.post<ICart>('/checkout', input);
    return res.data.items;
  }

  transformResource(resource: ICartItemResource): ICartItem {
    const {id, createAt, updateAt, count, _embedded: {product, cart}} = resource;
    return {
      id,
      createAt,
      updateAt,
      count,
      product,
      cart: cart.id
    }
  }
}

export const cartItemService = new CartItemService();
