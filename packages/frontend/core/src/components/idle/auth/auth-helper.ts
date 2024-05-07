import { fetcher } from '@idle/http';

import { authGateway } from './auth-gateway';

export async function loginByMagicEmail(userId: string, sessionSecret: string) {
  let session = null;

  try {
    session = await authGateway.getCurrentSession();
  } catch (error) {
    session = null;
  }

  // if they already have an auth session, skip verify it
  if (!session || session.userId !== userId) {
    await authGateway.verifyMagicEmailSession(userId, sessionSecret);
  }

  const token = await authGateway.requestJwt();
  const credential = await fetcher.auth.login(token.jwt, userId);
  return credential;
}

export async function verifyAndUpdateEmailAddress(
  userId: string,
  sessionSecret: string,
) {
  await authGateway.verifyEmail(userId, sessionSecret);
  const user = await authGateway.getCurrentUser();
  const response = await fetcher.user.update({ email: user.email });
  return response.data;
}
