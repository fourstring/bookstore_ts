import {AxiosInstance} from "axios";
import MockAdapter from "axios-mock-adapter";
import {IPagedData} from "../types/IHAL";
import {IDataTableFilterOutput} from "../types/IDataTable";

export interface IRequestFilterOptions {
  paged?: boolean;
  page?: string | number;
  sort?: string;
  size?: string | number;
  projection?: string;
  search?: {
    by: string,
    value?: string | number
  }
  filters?: IDataTableFilterOutput[];

  [name: string]: any;
}

export interface EntityService<T, InputT = T, R = T> {
  endpoint: string;
  resourceName: string;
  client: AxiosInstance | MockAdapter;

  transformResource(resource: R): T;

  get(id: number, filterOption?: IRequestFilterOptions): Promise<T>;

  // TODO: Add paginator support( Pagination schema is unable to determine now ).
  getAll(filterOption?: IRequestFilterOptions): Promise<IPagedData<T>>;

  post(data: InputT): Promise<T>;

  put(id: number, data: InputT): Promise<T>;

  patch(id: number, data: Partial<InputT>): Promise<T>;

  delete(id: number): Promise<boolean>;

  search(): Promise<void>;

  getResource(id: number): string;
}
