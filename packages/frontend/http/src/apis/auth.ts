import { APICollection } from '../config';

class AuthCollection extends APICollection {
  /**
   * Handshake with server to set jwt token and userid to cookie
   * @param token: jwt
   * @param userId
   */
  authenticate(token: string) {
    return this.client.post(this.getUrl('handshake'), {
      token,
    });
  }
}

const authApis = new AuthCollection('auth');
export default authApis;
