import { fetcher } from '@idle/http';
import { useCallback } from 'react';

import { authGateway } from './auth-gateway';

export function useAuth() {
  const anonymousSignIn = useCallback(async () => {
    try {
      await authGateway.getCurrentSession();
    } catch (error) {
      await authGateway.createAnonymousSession();
    }
    const token = await authGateway.requestJwt();
    await fetcher.auth.authenticate(token.jwt);
  }, []);

  const magicUrlSignIn = useCallback(async (email: string) => {
    await authGateway.sendMagicUrl(email);
  }, []);

  return { anonymousSignIn, magicUrlSignIn };
}

export async function verifyMagicEmailSession(
  userId: string,
  sessionSecret: string,
) {
  await authGateway.verifyMagicEmailSession(userId, sessionSecret);
  const token = await authGateway.requestJwt();
  return fetcher.auth.authenticate(token.jwt);
}
