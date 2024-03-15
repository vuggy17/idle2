import { type FC, useMemo } from 'react';

import { SignIn } from './sign-in';

export type AuthProps = {
  state: 'signIn';
  setAuthState: (state: AuthProps['state']) => void;
};

export type AuthPanelProps = {
  setAuthState: AuthProps['setAuthState'];
  onSignedIn?: () => void;
};

// ================Panel list==============================
const config: {
  [k in AuthProps['state']]: FC<AuthPanelProps>;
} = {
  signIn: SignIn,
};
// ====================================================

export function AuthPanel({
  state,
  ...props
}: AuthProps & Pick<AuthPanelProps, 'onSignedIn'>) {
  const CurrentPanel = useMemo(() => {
    return config[state];
  }, [state]);

  // return null;
  return (
    <CurrentPanel
      setAuthState={props.setAuthState}
      onSignedIn={props.onSignedIn}
    />
  );
}
