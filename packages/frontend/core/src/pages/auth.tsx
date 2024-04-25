import { EmailVerified, ResetPassword } from '@idle/component/auth-components';
import { Suspense, useCallback } from 'react';
import {
  Await,
  defer,
  type LoaderFunction,
  redirect,
  useLoaderData,
  useParams,
} from 'react-router-dom';
import { z } from 'zod';

import logo from '../assets/logo.png';
import { loginByMagicEmail } from '../components/idle/auth/auth-helper';
import { useAuth } from '../components/idle/auth/use-auth';
import useNavigateHelper from '../hooks/use-navigate-helper';

const authTypeSchema = z.enum(['verify-email', 'password-reset']);
type AuthParams = {
  authType: z.infer<typeof authTypeSchema>;
};

function AuthPage() {
  const { authType } = useParams<AuthParams>();
  const { jumpToIndex } = useNavigateHelper();
  const { resetPassword } = useAuth();
  const data = useLoaderData();
  const openApp = useCallback(() => jumpToIndex(), [jumpToIndex]);

  const onResetPassword = useCallback(
    async (pass: string, passAgain: string) => {
      const { searchParams } = new URL(window.location.href);
      const userId = searchParams.get('userId') ?? '';
      const secret = searchParams.get('secret') ?? '';
      await resetPassword(userId, secret, pass, passAgain);
      openApp();
    },
    [openApp, resetPassword],
  );

  switch (authType) {
    case 'verify-email':
      return (
        <Suspense fallback={<EmailVerified.Loader />}>
          <Await
            resolve={(data as any).user}
            errorElement={<EmailVerified.Fallback openApp={openApp} />}
          >
            {() => <EmailVerified openApp={openApp} />}
          </Await>
        </Suspense>
      );

    case 'password-reset':
      return (
        <ResetPassword
          logo={logo}
          onCancel={openApp}
          onResetClick={onResetPassword}
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
    const { searchParams } = new URL(args.request.url);
    const userId = searchParams.get('userId') ?? '';
    const secret = searchParams.get('secret') ?? '';
    return defer({ user: loginByMagicEmail(userId, secret) });
  }

  return null;
};

export function Component() {
  return <AuthPage />;
}
