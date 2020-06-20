import {IBook} from "./IBook";
import {IUser} from "./IUser";
import {IEntity} from "./IEntity";

export interface IOrderItem extends IEntity {
  order: number;
  product: IBook;
  count: number;
}

export interface IOrder extends IEntity {
  items: IOrderItem[];
  createdUser: IUser;
}

export interface IOrderItemInput {
  product: number;
  count: number;
}

export interface IOrderInput {
  items: IOrderItemInput[];
  created_user: number;
}

export interface IListedOrder extends IEntity {
  itemsDigest: string;
  totalCount: number;
  totalPrice: number;
  createdUsername: string;
}
