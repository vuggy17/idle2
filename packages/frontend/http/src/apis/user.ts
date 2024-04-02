import { type UserDTO } from '@idle/model';

import { APICollection } from '../config/api-collection';

class UserCollection extends APICollection {
  async getMe(): Promise<{
    success: boolean;
    user: UserDTO | null;
  }> {
    try {
      const response = await this.client.get(this.getUrl('me'));
      return {
        user: response.data,
        success: true,
      };
    } catch {
      return {
        user: null,
        success: false,
      };
    }
  }
}

const userApis = new UserCollection('user');

export default userApis;
