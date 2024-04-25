import { type UserDTO } from '@idle/model';

import { APICollection } from '../config/axios';

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

  update(updates: Partial<{ name: string; avatarUrl: string; email: string }>) {
    return this.client.post<UserDTO>(this.getUrl('update'), {
      name: updates.name,
      avatarUrl: updates.avatarUrl,
      email: updates.email,
    });
  }
}

const userApis = new UserCollection('user');

export default userApis;
