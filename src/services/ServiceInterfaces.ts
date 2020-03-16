import {AxiosInstance} from "axios";
import MockAdapter from "axios-mock-adapter";

export interface EntityService<T, InputT = T> {
  endpoint: string;
  client: AxiosInstance | MockAdapter;

  get(id: number): Promise<T>;

  // TODO: Add paginator support( Pagination schema is unable to determine now ).
  getAll(): Promise<T[]>;

  post(data: InputT): Promise<T>;

  put(id: number, data: InputT): Promise<T>;

  patch(id: number, data: Partial<InputT>): Promise<T>;

  delete(id: number): Promise<boolean>;

  search(): Promise<void>;
}
