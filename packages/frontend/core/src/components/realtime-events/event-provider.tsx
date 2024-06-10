import Pusher from 'pusher-js';
import { createContext, type PropsWithChildren, useEffect } from 'react';

import { useCurrentLoginStatus } from '../../hooks/use-current-login-status';

const pusher = new Pusher(runtimeConfig.pusher.appKey, {
  cluster: runtimeConfig.pusher.cluster,
  userAuthentication: {
    endpoint: runtimeConfig.pusher.authorizeEndpoint,
    transport: 'ajax',
  },
});
export const PusherContext = createContext(pusher);

export function NotificationProvider({ children }: PropsWithChildren) {
  const loginStatus = useCurrentLoginStatus();

  useEffect(() => {
    if (loginStatus === 'authenticated') {
      pusher.signin();
      pusher.user.bind('new-friend-request', (arg) => {
        alert(JSON.stringify(arg));
      });
    }
  }, [loginStatus]);

  return (
    <PusherContext.Provider value={pusher}>{children}</PusherContext.Provider>
  );
}
