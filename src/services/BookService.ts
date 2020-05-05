import {BaseService} from "./BaseService";
import {IBook} from "../types/IBook";

export class BookService extends BaseService<IBook> {
  resourceName = "books";
  endpoint = "/data/books";
}

export const bookService = new BookService();
