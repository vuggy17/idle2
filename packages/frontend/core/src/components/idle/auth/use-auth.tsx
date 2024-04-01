import { fetcher } from '@idle/http';
import { Account, type Models } from 'appwrite';
import { useCallback } from 'react';

import { AppWriteClient } from '../../../providers/appwrite-client';

class AuthGateway {
  constructor(private readonly accountGateway: Account) {}

  foo = 'this do nothing';

  async createAnonymousSession() {
    this.accountGateway.createAnonymousSession();
  }

  async getCurrentLoggedInUser() {
    return this.accountGateway.get();
  }

  async requestJwt() {
    return this.accountGateway.createJWT();
  }
}

const authGateway = new AuthGateway(new Account(AppWriteClient));

async function createAnonymousSession() {
  return authGateway.createAnonymousSession();
}

export function useAuth() {
  const anonymousSignIn = useCallback(async () => {
    // try {
    //   await authGateway.getCurrentLoggedInUser();
    // } catch (error) {
    //   await authGateway.createAnonymousSession();
    // }
    // const token = await authGateway.requestJwt();
    const token = {
      jwt: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOiI2NjBhZDhkMjQ0MWEzNDgwN2U3YSIsInNlc3Npb25JZCI6IjY2MGFkOGQyNTM4MDA3ZWY3Mzk4IiwiZXhwIjoxNzExOTg4MTMxfQ.DFqz75_J6IMoBRuIpxA7eX7rvMOXf-CQPI0Xoqg3HHQ',
    };
    await fetcher.auth.authenticate(token.jwt);
  }, []);

  return { anonymousSignIn };
}
