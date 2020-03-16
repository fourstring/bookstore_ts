import {IUser} from "../types/IUser";
import {IBook} from "../types/IBook";
import {ICart} from "../types/ICart";

function fillDb<T extends any>(db: Map<number, T>, key: string = "id") {
  return (value: T) => db.set(value[key] as number, value);
}

let users: IUser[] = [
  {id: 1, username: 'test1', email: 'test@test.com', status: "active", admin: false},
  {id: 2, username: 'test2', email: 'test@test2.com', status: "active", admin: false},
  {id: 3, username: 'test3', email: 'test@test3.com', status: "disabled", admin: false},
  {id: 4, username: 'admin', email: 'admin@test.com', status: "active", admin: true}
];

let userDb = new Map<number, IUser>();
users.forEach(fillDb<IUser>(userDb));

let books: IBook[] = [
  {id: 1, title: "深入理解计算机系统", author: "Randal E.Bryant", isbn: "9787111544937", cover_pic: "", price: 99, stock: 50},
  {
    id: 2,
    title: "设计模式：可复用面向对象软件的基础",
    author: "Erich Gamma",
    isbn: "9787111618331",
    cover_pic: "",
    price: 65.1,
    stock: 20
  },
  {id: 3, title: "流畅的Python", author: "Luciano Ramalho", isbn: "9787115454157", cover_pic: "", price: 69.5, stock: 10}
];

let bookDb = new Map<number, IBook>();
books.forEach(fillDb<IBook>(bookDb));

export function initCartsDb() {
  // Use function to simulate relation fields.
  let carts: ICart[] = [
    {
      id: 1,
      owner: userDb.get(1) as IUser,
      items: [
        {
          id: 1,
          cart: 1,
          product: bookDb.get(1) as IBook,
          count: 1
        },
        {
          id: 2,
          cart: 1,
          product: bookDb.get(2) as IBook,
          count: 2
        }
      ]
    }
  ];
  let cartDb = new Map<number, ICart>();
  carts.forEach(fillDb<ICart>(cartDb, "owner"));
  return {carts, cartDb};
}

export {
  userDb,
  bookDb
}
