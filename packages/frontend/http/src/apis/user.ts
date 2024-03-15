import { APICollection } from '../config';

class UserCollection extends APICollection {
  constructor() {
    super('user');
  }

  // eslint-disable-next-line class-methods-use-this
  getMe(): Promise<{ user: string | null }> {
    // return this.client.get('me');
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ user: null });
      }, 1000);
    });
  }
}

const userApis = new UserCollection();

export default userApis;
