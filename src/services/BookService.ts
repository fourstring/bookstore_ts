import {BaseService} from "./BaseService";
import {IBook} from "../types/IBook";

export class BookService extends BaseService<IBook> {
  endpoint = "/books"
}

export const bookService = new BookService();
