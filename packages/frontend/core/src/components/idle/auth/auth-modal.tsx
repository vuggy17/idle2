import { AuthModal as AuthModalBase } from '@idle/component/auth-components';
import { type AuthModalProps as AuthModalBaseProps } from '@idle/component/auth-components';
import { useCallback } from 'react';

import AuthPanel, { type AuthProps } from './panels/components/panel';

type AuthModalProps = AuthProps & {
  setOpen: (open: boolean) => void;
};

export function AuthModal(props: AuthModalBaseProps & AuthModalProps) {
  const { state, setAuthState, open, setOpen, email, setAuthEmail } = props;
  const onSignedIn = useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  return (
    <AuthModalBase open={open} setOpen={setOpen}>
      <AuthPanel
        email={email}
        setAuthEmail={setAuthEmail}
        setAuthState={setAuthState}
        state={state}
        onSignedIn={onSignedIn}
      />
    </AuthModalBase>
  );
}
