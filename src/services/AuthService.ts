import {AxiosInstance} from "axios";
import config from "../config";
import {mockClient} from "../mocks/mockClient";
import {client} from "../utils/network";
import {IAuthCredential, IAuthRespData, IAuthResult, IAuthStatus} from "../types/IAuth";

export class AuthService {
  client: AxiosInstance;

  constructor() {
    if (config.globalMock) {
      this.client = mockClient;
    } else {
      this.client = client;
    }
  }

  async login(cred: IAuthCredential): Promise<IAuthResult> {
    try {
      let result = await this.client.post<IAuthRespData>('/auth/login', cred);
      if (result.status >= 200 && result.status <= 299) {
        localStorage.setItem('csrf_token', result.data.csrfToken); // Set csrfToken localStorage for further requests.
        return {status: IAuthStatus.SUCCESS, user: result.data.user}
      }
      return {status: IAuthStatus.REJECTED, user: null}
    } catch (e) {
      return {status: IAuthStatus.REJECTED, user: null}
    }
  }

  async logout() {
    await this.client.get('/logout');
    localStorage.removeItem('csrf_token'); // Clear csrfToken stored.
  }

  async ping(): Promise<IAuthResult> {
    try {
      let result = await this.client.get<IAuthRespData>('/auth/ping');
      if (result.status >= 200 && result.status <= 299) {
        localStorage.setItem('csrf_token', result.data.csrfToken); // Set csrfToken localStorage for further requests.
        return {status: IAuthStatus.SUCCESS, user: result.data.user}
      }
      return {status: IAuthStatus.REJECTED, user: null}
    } catch (e) {
      return {status: IAuthStatus.REJECTED, user: null}
    }
  }
}

export const authService = new AuthService();
