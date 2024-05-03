import { APICollection } from '../config/axios';

class FriendCollection extends APICollection {
  sendFriendRequest(username: string) {
    console.log('send friend request payload', username);
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ id: '12312', status: 'ok' });
      }, 2000);
    });
  }

  getPendingFriendRequests() {
    return new Promise<any[]>((resolve) => {
      setTimeout(() => {
        resolve([
          {
            id: '992a12223286b77e18923',
            sentByMe: false,
            subject: {
              id: '662a1222f1386b77e10d',
              createdAt: '2024-04-02T14:18:21.890Z',
              updatedAt: '2024-04-02T14:17:31.193Z',
              email: 'nutriboost17z@gmail.com',
              username: new Date('2024-04-02T14:18:21.890Z')
                .getTime()
                .toString(32),
              displayName: 'Khuong Duy 2',
            },
            createdAt: '2024-04-02T14:18:21.890Z',
          },
        ]);
      }, 1500);
    });
  }
}

const friendApis = new FriendCollection('friend');
export default friendApis;
