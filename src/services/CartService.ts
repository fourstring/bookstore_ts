import {BaseService} from "./BaseService";
import {ICart} from "../types/ICart";

export class CartService extends BaseService<ICart> {
  resourceName = "carts";
  endpoint = "/data/carts";
}

export const cartService = new CartService();
