import { Account, ID } from 'appwrite';

import { AppWriteClient } from '../../../providers/appwrite-client';

class AuthGateway {
  constructor(private readonly accountGateway: Account) {}

  createAnonymousSession() {
    return this.accountGateway.createAnonymousSession();
  }

  getCurrentSession() {
    return this.accountGateway.getSession('current');
  }

  requestJwt() {
    return this.accountGateway.createJWT();
  }

  sendMagicUrl(email: string) {
    const PLATFORM_VERIFY_URL = `${window.location.origin}/auth/magic-login`;

    return this.accountGateway.createMagicURLToken(
      ID.unique(),
      email,
      PLATFORM_VERIFY_URL,
    );
  }

  createPassword(password: string) {
    return this.accountGateway.updatePassword(password);
  }

  logoutCurrentDevice() {
    return this.accountGateway.deleteSession('current');
  }

  /**
   * @INTERNAL Use loginByMagicEmail from auth-helper instead
   */
  verifyMagicEmailSession(userId: string, sessionSecret: string) {
    return this.accountGateway.createSession(userId, sessionSecret);
  }

  sendResetPasswordEmail(email: string) {
    return this.accountGateway.createRecovery(
      email,
      `${window.location.origin}/auth/password-reset`,
    );
  }

  resetPassword(userId: string, secret: string, pass: string) {
    return this.accountGateway.updateRecovery(userId, secret, pass);
  }

  changeEmail(email: string, password: string) {
    return this.accountGateway.updateEmail(email, password);
  }

  sendVerificationEmail() {
    const PLATFORM_VERIFY_URL = `${window.location.origin}/auth/verify-email`;
    return this.accountGateway.createVerification(PLATFORM_VERIFY_URL);
  }

  verifyEmail(userId: string, sessionSecret: string) {
    return this.accountGateway.updateVerification(userId, sessionSecret);
  }

  /** Get current logged in user */
  getCurrentUser() {
    return this.accountGateway.get();
  }
}
export const authGateway = new AuthGateway(new Account(AppWriteClient));
