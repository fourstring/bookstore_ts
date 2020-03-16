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
  created_user: IUser;
  created_time: string;
}

export interface IOrderItemInput {
  product: number;
  count: number;
}

export interface IOrderInput {
  items: IOrderItemInput[];
  created_user: number;
}
