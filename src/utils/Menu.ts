export interface IMenuConfig {
  path: string;
  label: string;
  external?: boolean;
  privileged: boolean; // Only for display.
  anonymousOnly?: boolean;
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
  },
  {
    label: "登陆",
    path: "/login",
    privileged: false,
    anonymousOnly: true
  },
  {
    label: '管理后台',
    path: '/admin',
    privileged: true,
    anonymousOnly: false
  }
];
