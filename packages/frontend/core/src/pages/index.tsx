import { useSession } from '../hooks/use-session';
import { WorkspaceLayout } from '../layouts/workspace-layout';

export function Component() {
  const session = useSession();

  return (
    <WorkspaceLayout>
      <pre>{JSON.stringify(session, null, 4)}</pre>
    </WorkspaceLayout>
  );
}

Component.displayName = 'IndexPage';
