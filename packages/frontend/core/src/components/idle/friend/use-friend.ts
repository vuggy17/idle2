import { fetcher } from '@idle/http';
import { FriendRequestService } from '@idle/infra';
import { useLiveData } from '@idle/infra/livedata';
import { useInjection } from 'inversify-react';
import { useCallback } from 'react';

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
  const service = useInjection(FriendRequestService);
  const data = useLiveData(service.list.requests$);
  const isLoading = useLiveData(service.revalidating$);

  const requests: DisplayFriendRequest[] = data.map((req) => {
    const sentByMe = req.senderId === currentUser.id;
    return {
      id: req.id,
      sentByMe,
      subject: sentByMe ? req.receiver : req.sender,
      createdAt: req.createdAt,
    };
  });

  return {
    total: requests.length,
    data: requests,
    isLoading,
    decline: useCallback(async (requestId: string) => {
      await fetcher.friend.modifyRequest(requestId, 'decline');
    }, []),
    accept: useCallback(
      async (requestId: string) => {
        await service.cancelRequest(requestId);
      },
      [service],
    ),
    cancel: useCallback(
      async (requestId: string) => {
        await service.cancelRequest(requestId);
      },
      [service],
    ),
  };
}
