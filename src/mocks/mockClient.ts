import MockAdapter from "axios-mock-adapter";
import axios from "axios";
import {bookDb, initCartsDb, userDb} from "./mockDb";
import {IUser} from "../types/IUser";

let currentUser: IUser | null = null;

const mockClient = axios.create({
  withCredentials: true
});

const mock = new MockAdapter(mockClient, {delayResponse: 1000});

mock.onGet(/\/data\/books\/\d+/).reply(config => {
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

mock.onGet('/data/books').reply(config1 => {
  let result = [];
  for (let value of bookDb.values()) {
    result.push(value);
  }
  return [200, {
    _embedded: {
      books: result
    },
    page: {
      size: 20,
      totalElements: result.length,
      totalPages: Math.ceil(result.length / 20),
      number: 0
    }
  }];
});

mock.onGet(/\/data\/carts\/\d+/).reply(config => {
  const {cartDb} = initCartsDb();
  if (!currentUser) {
    return [403]; // mock unauthorized access.
  }
  const reg = new RegExp(/\/data\/carts\/(\d+)/);
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

mock.onPost('/auth/login').reply(config => {
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

mock.onGet('/auth/logout').reply(config => {
  if (!currentUser) {
    return [403]
  }
  currentUser = null;
  return [200]
});

export {mockClient};
