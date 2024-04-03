import { fetcher } from '@idle/http';
import { type UserDTO } from '@idle/model';
import { Account } from 'appwrite';
import useSWR from 'swr';

import { AppWriteClient } from '../providers/appwrite-client';

export type AuthSession = {
  status: 'authenticated' | 'unauthenticated' | 'loading';
  user: UserDTO | null;
};

export type AuthSessionWithReload = AuthSession & {
  reload: () => Promise<void>;
};

const anonymousUser: UserDTO = {
  id: '0000',
  name: 'Guest',
  email: '',
  avatar: '',
};

const isCurrentUserAGuest = async () => {
  try {
    // check if they are verified their email or phone or not, if not, they are a guest
    // TODO: update implementation
    const accountSdk = new Account(AppWriteClient);
    await accountSdk.getSession('current');
    return true;
  } catch (error) {
    return false;
  }
};

const fetchMe = async () => {
  const { user, success } = await fetcher.user.getMe();

  if (success) {
    return user;
  }

  const isGuest = await isCurrentUserAGuest();
  if (isGuest) {
    return anonymousUser;
  }
  return null;
};

export function useSession(): AuthSessionWithReload {
  const { data, isLoading, mutate } = useSWR('session', fetchMe, {
    errorRetryCount: 3,
    errorRetryInterval: 500,
    shouldRetryOnError: true,
    suspense: false,
  });

  return {
    user: data ?? null,
    // eslint-disable-next-line no-nested-ternary
    status: isLoading ? 'loading' : data ? 'authenticated' : 'unauthenticated',
    reload: async () => {
      await mutate();
    },
  };
}
