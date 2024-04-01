import { type UserDTO } from '@idle/model';

import { APICollection } from '../config';

class UserCollection extends APICollection {
  /**
   * Get me will return success only user is authenticated (guest/normal user)
   * False otherwise (user not found in auth server)
   * @param checkUserGuestCallback check is user is a guest
   * @returns
   */
  async getMe(checkUserGuestCallback: () => Promise<boolean>): Promise<{
    success: boolean;
    user: UserDTO | null;
  }> {
    try {
      const response = await this.client.get(this.getUrl('me'));
      return {
        user: response.data,
        success: response.status - 200 < 7, // 200 ~ 206
      };
    } catch (error) {
      const isGuest = await checkUserGuestCallback();
      if (isGuest) {
        return {
          user: null,
          success: true,
        };
      }
      return {
        user: null,
        success: false,
      };
    }
  }
}

const userApis = new UserCollection('user');

export default userApis;
