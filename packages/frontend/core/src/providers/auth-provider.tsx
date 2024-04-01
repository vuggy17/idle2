import { type PropsWithChildren, useEffect, useRef } from 'react';

import { useSession } from '../hooks/use-session';

export function AuthSessionProvider({ children }: PropsWithChildren) {
  const prevSession = useRef<ReturnType<typeof useSession>>();
  console.log('🚀 ~ AuthSessionProvider ~ prevSession:', prevSession);

  const session = useSession();
  console.log('🚀 ~ AuthSessionProvider ~ session:', session);
  useEffect(() => {
    if (prevSession.current !== session && session.status !== 'loading') {
      // unauthenticated -> authenticated
      if (
        prevSession.current?.status === 'unauthenticated' &&
        session.status === 'authenticated'
      ) {
        alert('Successfully logged in');
      }
      prevSession.current = session;
    }
  }, [session, prevSession]);

  return children;
}
