import authApis from './apis/auth';
import uploadApis from './apis/upload';
import userApis from './apis/user';

export const fetcher = {
  user: userApis,
  auth: authApis,
  upload: uploadApis,
};
