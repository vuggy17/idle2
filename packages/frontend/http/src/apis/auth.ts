import { APICollection } from '../config/axios';

class AuthCollection extends APICollection {
  /**
   * Create account from appwrite token,
   *
   * If account was not exist, create new one
   *
   * Also initialize access_token and refresh_token
   * @param token: appwrite jwt
   */
  login(appwriteToken: string) {
    return this.client.post(this.getUrl('authenticate'), {
      token: appwriteToken,
    });
  }
}

const authApis = new AuthCollection('auth');
export default authApis;
