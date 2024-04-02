import { Button } from 'antd';
import { useAtom } from 'jotai';

import { authAtom } from '../atoms';
import { useSession } from '../hooks/use-session';
import { WorkspaceLayout } from '../layouts/workspace-layout';

export function Component() {
  const session = useSession();
  const [auth, setAuth] = useAtom(authAtom);

  return (
    <WorkspaceLayout>
      <Button onClick={session.reload} />
      <Button
        onClick={() =>
          setAuth((prev) => ({
            ...prev,
            state: 'signInWithEmail',
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
