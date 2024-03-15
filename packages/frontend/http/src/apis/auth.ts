import { APICollection } from '../config';

class AuthCollection extends APICollection {
  constructor() {
    super('auth');
  }

  /**
   * Handshake with server to set jwt token and userid to cookie
   * @param token: jwt
   * @param userId
   */
  handshake(token: string, userId: string) {
    return this.client.post(this.createUrl('handshake'), {
      token,
      userId,
    });
  }
}

const authApis = new AuthCollection();
export default authApis;
