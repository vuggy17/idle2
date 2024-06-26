import type { FriendRequestDTO } from '@idle/model';

import { APICollection } from '../config/axios';

class FriendCollection extends APICollection {
  async sendFriendRequest(username: string) {
    const res = await this.client.post(this.getUrl('request'), {
      toUsername: username,
    });
    return res.data;
  }

  async getPendingFriendRequests() {
    try {
      const res = await this.client.get<FriendRequestDTO[]>(
        this.getUrl('request'),
      );
      return res.data;
    } catch (error) {
      return [];
    }
  }

  async modifyRequest(
    requestId: string,
    action: 'decline' | 'accept' | 'cancel',
  ) {
    await this.client.post<FriendRequestDTO>(
      `${this.getUrl('request')}/modify`,
      {
        id: requestId,
        action,
      },
    );

    return requestId;
  }
}

const friendApis = new FriendCollection('friend');
export default friendApis;
