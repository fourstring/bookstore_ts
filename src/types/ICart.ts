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
