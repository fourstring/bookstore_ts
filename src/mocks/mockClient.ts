import MockAdapter from "axios-mock-adapter";
import axios from "axios";
import {bookDb} from "./mockDb";

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

export {mockClient};
