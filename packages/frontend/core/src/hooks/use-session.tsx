import { fetcher } from '@idle/http';
import { type UserDTO } from '@idle/model';
import { Account } from 'appwrite';
import useSWR from 'swr';

import { AppWriteClient } from '../providers/appwrite-client';

export type AuthSession = {
  status: 'authenticated' | 'unauthenticated' | 'loading';
  user: unknown | null;
};

export type AuthSessionWithReload = AuthSession & {
  reload: () => Promise<void>;
};

const anonymousUser: UserDTO = {
  id: '0000',
  name: 'Guest',
  avatar: '',
};

const isCurrentUserAGuest = async () => {
  try {
    const accountSdk = new Account(AppWriteClient);
    await accountSdk.get();
    return true;
  } catch (error) {
    return false;
  }
};

const fetchMe = async () => {
  const { user, success } = await fetcher.user.getMe(isCurrentUserAGuest);
  if (success) {
    return user || anonymousUser;
  }
  return null;
};

export function useSession(): AuthSessionWithReload {
  const { data, isLoading, mutate } = useSWR('session', fetchMe);

  return {
    user: data,
    // eslint-disable-next-line no-nested-ternary
    status: isLoading ? 'loading' : data ? 'authenticated' : 'unauthenticated',
    reload: async () => {
      await mutate();
    },
  };
}
