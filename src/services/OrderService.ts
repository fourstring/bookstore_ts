import {BaseService} from "./BaseService";
import {IOrder} from "../types/IOrder";

export class OrderService extends BaseService<IOrder> {
  resourceName = "orders";
  endpoint = "/data/orders";
}

export const orderService = new OrderService();
