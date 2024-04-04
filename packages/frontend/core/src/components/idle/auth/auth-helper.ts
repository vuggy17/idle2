import { fetcher } from '@idle/http';

import { authGateway } from './auth-gateway';

export async function loginByMagicEmail(userId: string, sessionSecret: string) {
  await authGateway.verifyMagicEmailSession(userId, sessionSecret);
  const token = await authGateway.requestJwt();
  const credential = await fetcher.auth.login(token.jwt);
  return credential;
}
