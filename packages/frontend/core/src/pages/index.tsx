import { Button } from 'antd';
import { useInjection } from 'inversify-react';
import { useSetAtom } from 'jotai';

import { authAtom } from '../components/idle/auth/auth-atom';
import { useSession } from '../hooks/use-session';
import { WorkspaceLayout } from '../layouts/workspace-layout';
import { SocketService } from '../modules/socket/socket';

export function Component() {
  const session = useSession();
  const setAuthAtom = useSetAtom(authAtom);

  return (
    <WorkspaceLayout>
      <>
        <Button
          onClick={() =>
            setAuthAtom((store) => ({
              ...store,
              state: 'signInWithEmail',
              openModal: true,
            }))
          }
        >
          Open login modal
        </Button>
        <pre>{JSON.stringify(session, null, 4)}</pre>
      </>
    </WorkspaceLayout>
  );
}

Component.displayName = 'IndexPage';
