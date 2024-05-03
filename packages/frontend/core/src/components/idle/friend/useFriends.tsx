import { fetcher } from '@idle/http';
import { useCallback } from 'react';
import useSWR from 'swr';

export function useFriendRequests() {
  const { data, isLoading, mutate, isValidating } = useSWR(
    'friend-request-list',
    fetcher.friend.getPendingFriendRequests,
  );

  return {
    total: data ? data.length : 0,
    data,
    isLoading,
    reload: useCallback(() => mutate(), [mutate]),
  };
}
