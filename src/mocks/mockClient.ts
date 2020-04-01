import MockAdapter from "axios-mock-adapter";
import axios from "axios";
import {bookDb, initCartsDb, userDb} from "./mockDb";
import {IUser} from "../types/IUser";

let currentUser: IUser | null = null;

const mockClient = axios.create({
  withCredentials: true
});

const mock = new MockAdapter(mockClient, {delayResponse: 1000});

mock.onGet(/\/books\/\d+/).reply(config => {
  const reg = new RegExp(/\/books\/(\d+)/);
  if (config.url) {
    const match = config.url.match(reg);
    if (match) {
      const id = parseInt(match[1]);
      return [200, bookDb.get(id)]
    }
  }
  return [200]
});

mock.onGet('/books').reply(config1 => {
  let result = [];
  for (let value of bookDb.values()) {
    result.push(value);
  }
  return [200, result];
});

mock.onGet(/\/carts\/\d+/).reply(config => {
  const {cartDb} = initCartsDb();
  if (!currentUser) {
    return [403]; // mock unauthorized access.
  }
  const reg = new RegExp(/\/carts\/(\d+)/);
  if (config.url) {
    let match = config.url.match(reg);
    if (match) {
      const id = parseInt(match[1]);
      if (id !== currentUser.id && !currentUser.admin) {
        return [403] // mock malicious access.
      }
      return [200, cartDb.get(id)];
    }
  }
  return [200];
});

mock.onPost('/login').reply(config => {
  let data = JSON.parse(config.data);
  for (let user of userDb.values()) {
    if (data) {
      if (user.username === data.username) {
        currentUser = user;
        return [200, {user, csrfToken: "justTestToken"}]
      }
    }
  }
  return [403]
});

mock.onGet('/logout').reply(config => {
  if (!currentUser) {
    return [403]
  }
  currentUser = null;
  return [200]
});

export {mockClient};
