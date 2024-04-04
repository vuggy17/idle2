import { fetcher } from '@idle/http';
import { AxiosError } from 'axios';
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

  const logout = useCallback(async () => {
    await authGateway.logoutCurrentDevice();
    try {
      await fetcher.auth.clearCredentials();
    } catch (e) {
      // should not emit if guest user logging out
      if (e instanceof AxiosError && e.response?.data.statusCode !== 401) {
        throw e;
      }
    }
  }, []);
  return { anonymousSignIn, magicUrlSignIn, logout };
}

export async function loginByMagicEmail(userId: string, sessionSecret: string) {
  await authGateway.verifyMagicEmailSession(userId, sessionSecret);
  const token = await authGateway.requestJwt();
  const credential = await fetcher.auth.login(token.jwt);
  return credential;
}
