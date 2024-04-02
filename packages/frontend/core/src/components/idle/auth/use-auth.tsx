import { fetcher } from '@idle/http';
import { Account } from 'appwrite';
import { useCallback } from 'react';

import { AppWriteClient } from '../../../providers/appwrite-client';

class AuthGateway {
  constructor(private readonly accountGateway: Account) {}

  foo = 'this do nothing';

  async createAnonymousSession() {
    this.accountGateway.createAnonymousSession();
  }

  async getCurrentSession() {
    return this.accountGateway.getSession('current');
  }

  async requestJwt() {
    return this.accountGateway.createJWT();
  }
}

const authGateway = new AuthGateway(new Account(AppWriteClient));

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

  return { anonymousSignIn };
}
