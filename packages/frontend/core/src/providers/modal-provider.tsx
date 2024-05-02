import { useAtom } from 'jotai';
import { lazy, Suspense, useCallback } from 'react';

import { authAtom } from '../components/idle/auth/auth-atom';
import { SettingModal } from '../components/idle/setting';

const Auth = lazy(() =>
  import('../components/idle/auth/auth-modal').then((module) => ({
    default: module.AuthModal,
  })),
);

const FriendModal = lazy(() =>
  import('../components/idle/friend').then((module) => ({
    default: module.FriendModal,
  })),
);

function AuthModal() {
  const [auth, setAuthAtom] = useAtom(authAtom);

  return (
    <Auth
      open={auth.openModal}
      state={auth.state}
      email={auth.email || ''}
      setAuthEmail={useCallback(
        (email: string) => {
          setAuthAtom((prev) => ({ ...prev, email }));
        },
        [setAuthAtom],
      )}
      setOpen={useCallback(
        (open) => {
          setAuthAtom((prev) => ({ ...prev, openModal: open }));
        },
        [setAuthAtom],
      )}
      setAuthState={useCallback(
        (authState) => {
          setAuthAtom((prev) => ({ ...prev, state: authState }));
        },
        [setAuthAtom],
      )}
    />
  );
}

export function AllWorkspaceModals() {
  return (
    <Suspense>
      <AuthModal />
      <SettingModal />
      <FriendModal />
    </Suspense>
  );
}
