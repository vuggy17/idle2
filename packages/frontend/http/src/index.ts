import authApis from './apis/auth';
import friendApis from './apis/friend';
import uploadApis from './apis/upload';
import userApis from './apis/user';

export const fetcher = {
  user: userApis,
  auth: authApis,
  upload: uploadApis,
  friend: friendApis,
};
