import {IEntity} from "./IEntity";

export type UserStatus = 'active' | 'disabled';


export interface IUser extends IEntity {
  username: string;
  email: string;
  status: UserStatus;
  admin: boolean;
}
