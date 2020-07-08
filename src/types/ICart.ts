import {IBook} from "./IBook";
import {IUser} from "./IUser";
import {IEntity} from "./IEntity";

export interface ICartItem extends IEntity {
  cart: number;
  product: IBook;
  count: number;
}

export interface ICart extends IEntity {
  items: ICartItem[];
  owner: IUser;
}

export interface ICartItemInput {
  cart: string;
  product: string;
  count: number;
}

export interface ICartItemResource extends IEntity {
  count: number;
  _embedded: {
    product: IBook,
    cart: ICart
  }
}
