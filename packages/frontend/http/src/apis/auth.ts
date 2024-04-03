import { APICollection } from '../config/axios';

class AuthCollection extends APICollection {
  /**
   * Handshake with server to set jwt token and userid to cookie
   * @param token: jwt
   * @param userId
   */
  authenticate(token: string) {
    return this.client.post(this.getUrl('authenticate'), {
      token,
    });
  }

  createAccount() {
    return this.client.post(this.getUrl('initialize'));
  }
}

const authApis = new AuthCollection('auth');
export default authApis;
