import {BaseService} from "./BaseService";
import {IBook} from "../types/IBook";
import {readFileAsDataURL} from "../utils/fileUtils";
import config from "../config";

export class BookService extends BaseService<IBook> {
  resourceName = "books";
  endpoint = "/data/books";
  coverPicEndpoint = "/cover";
  descriptionPath = "update_description";


  transformResource(resource: IBook): IBook {
    return resource;
  }

  async updateCoverPic(id: number, picture: File): Promise<string> {
    let data = new FormData();
    data.append("cover", picture);
    try {
      await this.client.post(`${this.coverPicEndpoint}/${id}`, data);
    } catch (e) {
      throw e;
    }
    return await readFileAsDataURL(picture);
  }

  getCoverPicUrl(id: number): string {
    return `${config.baseURL}${this.coverPicEndpoint}/${id}`
  }

  async updateDescription(id: number, description: string): Promise<IBook> {
    let data = {
      content: description
    }
    try {
      let result = await this.client.post<IBook>(`${this.endpoint}/${id}/${this.descriptionPath}`, data);
      return result.data;
    } catch (e) {
      throw e;
    }
  }
}

export const bookService = new BookService();
