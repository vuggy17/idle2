import { INFRA } from '@idle/infra';
import { Button } from 'antd';
import { useSetAtom } from 'jotai';

import { authAtom } from '../components/idle/auth/auth-atom';
import { useSession } from '../hooks/use-session';
import { WorkspaceLayout } from '../layouts/workspace-layout';

console.log('🚀 ~ INFRA:', INFRA);

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
