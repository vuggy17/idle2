import { type FC, useMemo } from 'react';

import AfterSignInWithEmail from '../after-sign-in-email';
import { ChangeEmail } from '../change-emaiil';
import { CreatePassword } from '../create-password';
import { ResetPassword } from '../reset-password';
import { SignIn } from '../sign-in';
import { SignInWithEmail } from '../sign-in-with-email';

export type AuthPanelProps = {
  email: string;
  setAuthState: AuthProps['setAuthState'];
  setAuthEmail: AuthProps['setAuthEmail'];
  onSignedIn?: () => void;
};
export type AuthProps = {
  state:
    | 'signIn'
    | 'signInWithEmail'
    | 'afterSignInWithEmail'
    | 'createPassword'
    | 'resetPassword'
    | 'changeEmail';
  setAuthState: (state: AuthProps['state']) => void;
  setAuthEmail: (state: AuthProps['email']) => void;
  email: string;
};

// ================Panel list==============================
const config: {
  [k in AuthProps['state']]: FC<AuthPanelProps>;
} = {
  signIn: SignIn,
  signInWithEmail: SignInWithEmail,
  afterSignInWithEmail: AfterSignInWithEmail,
  createPassword: CreatePassword,
  resetPassword: ResetPassword,
  changeEmail: ChangeEmail,
};
// ====================================================

export default function AuthPanel({
  state,
  ...props
}: AuthProps & Pick<AuthPanelProps, 'onSignedIn'>) {
  const CurrentPanel = useMemo(() => {
    return config[state];
  }, [state]);
  return (
    <CurrentPanel
      email={props.email}
      setAuthEmail={props.setAuthEmail}
      setAuthState={props.setAuthState}
      onSignedIn={props.onSignedIn}
    />
  );
}
