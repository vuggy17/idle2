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

  const createPassword = useCallback(
    (password: string) => authGateway.createPassword(password),
    [],
  );

  const sendResetPasswordEmail = useCallback(
    (email: string) => authGateway.sendResetPasswordEmail(email),
    [],
  );

  // const resetPassword = useCallback(
  //   (userId: string, secret: string, pass: string, passAgain: string) =>
  //     new Promise<string>((resolve) => {
  //       setTimeout(() => {
  //         resolve('v');
  //       }, 2000);
  //     }),
  //   [],
  // );
  const resetPassword = useCallback(
    (userId: string, secret: string, pass: string, passAgain: string) =>
      authGateway.resetPassword(userId, secret, pass, passAgain),
    [],
  );
  return {
    logout,
    resetPassword,
    createPassword,
    magicUrlSignIn,
    anonymousSignIn,
    sendResetPasswordEmail,
  };
}
