import { EmailVerified } from '@idle/component/auth-components';
import { fetcher } from '@idle/http';
import { useCallback } from 'react';
import { type LoaderFunction, redirect, useParams } from 'react-router-dom';
import { z } from 'zod';

import { verifyMagicEmailSession } from '../components/idle/auth/use-auth';
import { useCurrentLoginStatus } from '../hooks/use-current-login-status';
import useNavigateHelper from '../hooks/use-navigate-helper';

const authTypeSchema = z.enum(['signIn', 'verify-email']);

function AuthPage() {
  const { authType } = useParams();
  const { jumpToIndex } = useNavigateHelper();

  const openApp = useCallback(() => jumpToIndex(), [jumpToIndex]);

  switch (authType) {
    case 'verify-email':
      return (
        <EmailVerified
          openApp={openApp}
          createAccount={() => fetcher.auth.createAccount()}
        />
      );

    default:
  }

  return null;
}

export const loader: LoaderFunction = async (args) => {
  if (!args.params.authType) {
    return redirect('/404');
  }

  if (!authTypeSchema.safeParse(args.params.authType).success) {
    return redirect('/404');
  }

  if (args.params.authType === 'verify-email') {
    try {
      const { searchParams } = new URL(args.request.url);
      const userId = searchParams.get('userId') ?? '';
      const secret = searchParams.get('secret') ?? '';
      await verifyMagicEmailSession(userId, secret);
    } catch (error) {
      redirect('/expired');
    }
  }

  return null;
};

export function Component() {
  const loginStatus = useCurrentLoginStatus();
  const { jumpToExpired } = useNavigateHelper();

  if (loginStatus === 'unauthenticated') {
    jumpToExpired();
  }

  if (loginStatus === 'authenticated') {
    return <AuthPage />;
  }

  return null;
}
