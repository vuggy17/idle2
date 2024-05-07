import { fetcher } from '@idle/http';
import { useCallback } from 'react';
import useSWR from 'swr';

import { useCurrentUser } from '../../../hooks/use-session';

type DisplayFriendRequest = {
  id: string;
  sentByMe: boolean;
  subject: {
    id: string;
    createdAt: number;
    updatedAt: number;
    email: string;
    username: string;
    displayName: string;
  };
  createdAt: number;
};

export function useFriendRequests() {
  const currentUser = useCurrentUser();
  const { data, isLoading, mutate } = useSWR('friend-request-list', () =>
    fetcher.friend.getPendingFriendRequests(),
  );

  let requests: DisplayFriendRequest[] = [];
  if (data) {
    requests = data.map((req) => {
      const sentByMe = req.senderId === currentUser.id;
      return {
        id: req.id,
        sentByMe,
        subject: sentByMe ? req.sender : req.receiver,
        createdAt: req.createdAt,
      };
    });
  }

  return {
    total: requests.length,
    data: requests,
    isLoading,
    reload: useCallback(() => mutate(), [mutate]),
  };
}
