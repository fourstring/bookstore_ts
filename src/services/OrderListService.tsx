import {orderService} from "./OrderService";
import {IRequestFilterOptions} from "./ServiceInterfaces";
import {IPagedData} from "../types/IHAL";
import {IListedOrder} from "../types/IOrder";
import {BaseService} from "./BaseService";

// Only for usage of orders admin.
export class OrderListService extends BaseService<IListedOrder> {
  async getAll(filterOption?: IRequestFilterOptions): Promise<IPagedData<IListedOrder>> {
    let orders = await orderService.getAll(filterOption);
    const ordersList: IListedOrder[] = orders.data.map<IListedOrder>(value => {
      let totalPrice = 0;
      const totalCount = value.items.reduce<number>((previousValue, currentValue) => {
        totalPrice += currentValue.count * currentValue.product.price;
        return previousValue + currentValue.count;
      }, 0);

      return {
        id: value.id,
        createAt: this.transformDate(value.createAt),
        updateAt: this.transformDate(value.updateAt),
        totalCount,
        totalPrice,
        createdUsername: value.createdUser.username,
        itemsDigest: `${value.items[0].product.title}等${totalCount}件商品`
      }
    });
    return {
      page: orders.page,
      data: ordersList
    };
  }
}

export const orderListService = new OrderListService();
