import authApis from './apis/auth';
import userApis from './apis/user';

export const fetcher = {
  user: userApis,
  auth: authApis,
};
