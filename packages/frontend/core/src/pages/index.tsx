import { Button } from 'antd';
import { useSetAtom } from 'jotai';

import { authAtom } from '../components/idle/auth/auth-atom';
import { useAuth } from '../components/idle/auth/use-auth';
import { useSession } from '../hooks/use-session';
import { WorkspaceLayout } from '../layouts/workspace-layout';

export function Component() {
  const session = useSession();
  const setAuth = useSetAtom(authAtom);
  const { logout } = useAuth();

  return (
    <WorkspaceLayout>
      <Button onClick={session.reload} />
      <Button onClick={logout}> Logout </Button>
      <Button
        onClick={() =>
          setAuth((prev) => ({
            ...prev,
            state: 'afterSignInWithEmail',
            openModal: true,
          }))
        }
      >
        open auth modal
      </Button>
      <pre>{JSON.stringify(session, null, 4)}</pre>
    </WorkspaceLayout>
  );
}

Component.displayName = 'IndexPage';
