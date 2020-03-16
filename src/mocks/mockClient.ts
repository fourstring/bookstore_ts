import MockAdapter from "axios-mock-adapter";
import axios from "axios";
import {bookDb} from "./mockDb";

const mockClient = axios.create({
  withCredentials: true
});

const mock = new MockAdapter(mockClient, {delayResponse: 1000});

mock.onGet('/books').reply(config1 => {
  let result = [];
  for (let value of bookDb.values()) {
    result.push(value);
  }
  return [200, result];
});

export {mockClient};
