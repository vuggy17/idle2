import type { UnixDateTime } from './common';

export type FriendRequestDTO = {
  id: string;
  createdAt: UnixDateTime;
  receiverId: string;
  senderId: string;
  sender: {
    id: string;
    username: string;
    email: string;
    displayName: string;
    password: string | null;
    createdAt: UnixDateTime;
    updatedAt: UnixDateTime;
  };
  receiver: {
    id: string;
    username: string;
    email: string;
    displayName: string;
    password: string | null;
    createdAt: UnixDateTime;
    updatedAt: UnixDateTime;
  };
  status: number;
};
