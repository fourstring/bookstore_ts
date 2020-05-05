import config from "../config";
import {client} from "../utils/network";
import {AxiosInstance, AxiosResponse} from "axios";
import {EntityService, IRequestFilterOptions} from "./ServiceInterfaces";
import {mockClient} from "../mocks/mockClient";
import {IHalList, IPagedData} from "../types/IHAL";
import _ from "lodash";


export class BaseService<T, InputT = T, R = T> implements EntityService<T, InputT, R> {
  resourceName: string = '';
  endpoint: string = '';
  client: AxiosInstance;

  constructor() {
    this.client = config.globalMock ? mockClient : client;
    console.log(this.client);
    console.log(config.globalMock);
  }

  transformResource(resource: R): T {
    throw new Error("Method not implemented.");
  }

  buildParam(filterOption: IRequestFilterOptions | undefined) {
    let endpoint = this.endpoint;
    if (filterOption) {
      let {search, filters, paged, ...params} = filterOption;
      if (search) {
        params[search.by] = search.value; // searchBy include different endpoint and params.
        endpoint = `${this.endpoint}/search/searchBy${_.upperFirst(search.by)}`;
      }
      if (filters) {
        filters.forEach(value => params[value.name] = value.value);
      }
      return {endpoint, params, paged};
    }
    return {endpoint, params: {}};
  }

  async delete(id: number): Promise<boolean> {
    let result = await this.client.delete<T>(this.endpoint + `/${id}`);
    return result.status === 204;
  }

  async get(id: number, filterOption?: IRequestFilterOptions): Promise<T> {
    let {endpoint, params} = this.buildParam(filterOption);
    if (!(filterOption && filterOption.search)) {
      endpoint += `/${id}`;
    }
    let result = await this.client.get<T>(endpoint, {
      params
    });
    return result.data;
  }

  // TODO: Add paginator support( Pagination schema is unable to determine now ).
  async getAll(filterOption?: IRequestFilterOptions): Promise<IPagedData<T>> {
    const {endpoint, params, paged} = this.buildParam(filterOption);
    let result = await this.client.get<IHalList<T>>(endpoint, {
      params
    });
    return {
      data: result.data._embedded[this.resourceName],
      page: paged === false ? undefined : result.data.page
    };
  }

  async patch(id: number, data: Partial<InputT>): Promise<T> {
    let result = await this.client.patch<Partial<InputT>, AxiosResponse<R>>(this.endpoint + `/${id}`, data);
    return this.transformResource(result.data);
  }

  async post(data: InputT): Promise<T> {
    let result = await this.client.post<InputT, AxiosResponse<R>>(this.endpoint, data);
    return this.transformResource(result.data);
  }

  async put(id: number, data: InputT): Promise<T> {
    let result = await this.client.put<InputT, AxiosResponse<R>>(this.endpoint + `/${id}`, data);
    return this.transformResource(result.data);
  }

  async search(): Promise<void> {
    return undefined;
  }

  getResource(id: number): string {
    return config.baseURL + this.endpoint + `/${id}`;
  }

}
