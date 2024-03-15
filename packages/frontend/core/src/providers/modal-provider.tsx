import { useAtom } from 'jotai';
import { lazy, Suspense, useCallback } from 'react';

import { authAtom } from '../atoms';

const Auth = lazy(() =>
  import('../components/idle/auth').then((module) => ({
    default: module.AuthModal,
  })),
);

function AuthModal() {
  const [{ openModal, state }, setAuthAtom] = useAtom(authAtom);

  return (
    <Auth
      open={openModal}
      state={state}
      setOpen={useCallback(
        (open) => {
          setAuthAtom((prev) => ({ ...prev, openModal: open }));
        },
        [setAuthAtom],
      )}
      setAuthState={useCallback(
        (authState) => {
          setAuthAtom((prev) => ({ ...prev, authState }));
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
    </Suspense>
  );
}
