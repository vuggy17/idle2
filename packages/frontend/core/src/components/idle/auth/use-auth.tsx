import { fetcher } from '@idle/http';
import { Account } from 'appwrite';
import { useCallback } from 'react';

import { AppWriteClient } from '../../../providers/appwrite-client';

class AuthGateway {
  constructor(private readonly accountGateway: Account) {}

  foo = 'this do nothing';

  async createAnonymousSession() {
    return this.accountGateway.createAnonymousSession();
  }

  async requestJwt() {
    return this.accountGateway.createJWT();
  }
}

export const authGateway = new AuthGateway(new Account(AppWriteClient));

async function createAnonymousSession() {
  return authGateway.createAnonymousSession();
}

export function useAuth() {
  const anonymousSignIn = useCallback(async () => {
    // const session = await createAnonymousSession();
    // const token = await authGateway.requestJwt();

    const token = {
      jwt: 'fake-token',
    };
    const session = {
      userId: 'user_0',
    };
    await fetcher.auth.handshake(token.jwt, session.userId);
  }, []);

  return { anonymousSignIn };
}
