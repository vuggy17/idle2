import { useContext } from 'react';

import { PusherContext } from './event-provider';

export function useEvent() {
  const pusher = useContext(PusherContext);
  return pusher;
}
