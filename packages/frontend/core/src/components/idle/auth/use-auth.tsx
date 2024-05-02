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

  const sendMagicUrl = useCallback(async (email: string) => {
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

  const resetPassword = useCallback(
    (userId: string, secret: string, pass: string) =>
      authGateway.resetPassword(userId, secret, pass),
    [],
  );

  const changeEmail = useCallback(
    (email: string, pass: string) => authGateway.changeEmail(email, pass),
    [],
  );

  const sendEmailVerificationEmail = useCallback(
    () => authGateway.sendVerificationEmail(),
    [],
  );

  return {
    logout,
    changeEmail,
    resetPassword,
    createPassword,
    sendMagicUrl,
    anonymousSignIn,
    sendResetPasswordEmail,
    sendEmailVerificationEmail,
  };
}
