import { type FC, useMemo } from 'react';

import AfterSignInWithEmail from './panels/after-sign-in-email';
import { SignIn } from './sign-in';
import { SignInWithEmail } from './sign-in-with-email';

export type AuthProps = {
  state: 'signIn' | 'signInWithEmail' | 'afterSignInWithEmail';
  setAuthState: (state: AuthProps['state']) => void;
  setAuthEmail: (state: AuthProps['email']) => void;
  email: string;
};

export type AuthPanelProps = {
  email: string;
  setAuthState: AuthProps['setAuthState'];
  setAuthEmail: AuthProps['setAuthEmail'];
  onSignedIn?: () => void;
};

// ================Panel list==============================
const config: {
  [k in AuthProps['state']]: FC<AuthPanelProps>;
} = {
  signIn: SignIn,
  signInWithEmail: SignInWithEmail,
  afterSignInWithEmail: AfterSignInWithEmail,
};
// ====================================================

export function AuthPanel({
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
