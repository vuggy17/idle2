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
  }, []);

  const magicUrlSignIn = useCallback(async (email: string) => {
    await authGateway.sendMagicUrl(email);
  }, []);

  return { anonymousSignIn, magicUrlSignIn };
}

export async function loginByMagicEmail(userId: string, sessionSecret: string) {
  await authGateway.verifyMagicEmailSession(userId, sessionSecret);
  const token = await authGateway.requestJwt();
  const credential = await fetcher.auth.login(token.jwt);
  // console.log('🚀 ~ loginByMagicEmail ~ credential:', credential);
  return credential;
}
