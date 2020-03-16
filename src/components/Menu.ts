export interface IMenuConfig {
  path: string;
  label: string;
  external?: boolean;
  privileged: boolean; // Only for display.
}

export const menus: IMenuConfig[] = [
  {
    path: "/",
    label: "首页",
    privileged: false
  },
  {
    label: "购物车",
    path: "/cart",
    privileged: false
  },
  {
    label: "我的订单",
    path: "/orders",
    privileged: false
  }
];
