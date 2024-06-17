import { useContext } from 'react';

import { PusherContext } from './notification-provider';

export function useEvent() {
  const pusher = useContext(PusherContext);
  return pusher;
}
