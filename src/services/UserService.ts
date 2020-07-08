import {BaseService} from "./BaseService";
import {IListedUser} from "../types/IUser";
import {IRequestFilterOptions} from "./ServiceInterfaces";
import {IPagedData} from "../types/IHAL";

export class UserService extends BaseService<IListedUser> {
  endpoint = '/data/admin_users'
  resourceName = 'users'


  transformResource(resource: IListedUser): IListedUser {
    return resource;
  }

  async getAll(filterOption?: IRequestFilterOptions): Promise<IPagedData<IListedUser>> {
    const original = await super.getAll(filterOption);
    return {
      page: original.page,
      data: original.data.map(value => {
        const {username, email, admin, status, id} = value;
        return {
          username,
          email,
          status,
          id,
          admin: admin ? '是' : '否',
          createAt: this.transformDate(value.createAt),
          updateAt: this.transformDate(value.updateAt)
        }
      })
    };
  }
}

export const userService = new UserService();
