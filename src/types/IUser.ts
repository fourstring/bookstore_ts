import {IEntity} from "./IEntity";
import {ICart} from "./ICart";

export type UserStatus = 'active' | 'disabled';


export interface IUser extends IEntity {
  username: string;
  email: string;
  status: UserStatus;
  admin: boolean;
  cart?: ICart;
}
