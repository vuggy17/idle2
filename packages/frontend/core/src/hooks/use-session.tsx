import { fetcher } from '@idle/http';
import useSWR from 'swr';

export type AuthSession = {
  status: 'authenticated' | 'unauthenticated' | 'loading';
  user: unknown | null;
};

export type AuthSessionWithReload = AuthSession & {
  reload: () => Promise<void>;
};

export function useSession(): AuthSessionWithReload {
  const { data, isLoading, mutate } = useSWR('session', fetcher.user.getMe);

  return {
    user: data?.user,
    // eslint-disable-next-line no-nested-ternary
    status: isLoading
      ? 'loading'
      : data?.user
        ? 'authenticated'
        : 'unauthenticated',
    reload: async () => mutate().then((v) => console.log(v)),
  };
}
