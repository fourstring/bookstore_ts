import config from "../config";
import {client} from "../utils/network";
import {AxiosInstance, AxiosResponse} from "axios";
import {EntityService} from "./ServiceInterfaces";
import {mockClient} from "../mocks/mockClient";


export class BaseService<T, InputT = T> implements EntityService<T, InputT> {
  endpoint: string = '/';
  client: AxiosInstance;

  constructor() {
    this.client = config.globalMock ? mockClient : client;
    console.log(this.client);
    console.log(config.globalMock);
  }

  async delete(id: number): Promise<boolean> {
    let result = await this.client.delete<T>(this.endpoint + `/${id}`);
    return result.status === 205;
  }

  async get(id: number): Promise<T> {
    let result = await this.client.get<T>(this.endpoint + `/${id}`);
    return result.data;
  }

  // TODO: Add paginator support( Pagination schema is unable to determine now ).
  async getAll(): Promise<T[]> {
    let result = await this.client.get<T[]>(this.endpoint);
    return result.data;
  }

  async patch(id: number, data: Partial<InputT>): Promise<T> {
    let result = await this.client.patch<Partial<InputT>, AxiosResponse<T>>(this.endpoint + `${id}`, data);
    return result.data;
  }

  async post(data: InputT): Promise<T> {
    let result = await this.client.post<InputT, AxiosResponse<T>>(this.endpoint, data);
    return result.data;
  }

  async put(id: number, data: InputT): Promise<T> {
    let result = await this.client.put<InputT, AxiosResponse<T>>(this.endpoint, data);
    return result.data;
  }

  async search(): Promise<void> {
    return undefined;
  }

}
