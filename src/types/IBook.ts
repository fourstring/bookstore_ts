import {IEntity} from "./IEntity";

export interface IBook extends IEntity {
  title: string;
  author: string;
  isbn: string;
  cover_pic: string;
  price: number;
  stock: number;
}
