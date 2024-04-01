import { Button } from 'antd';

import { useSession } from '../hooks/use-session';
import { WorkspaceLayout } from '../layouts/workspace-layout';

export function Component() {
  const { reload } = useSession();

  return (
    <WorkspaceLayout>
      <Button onClick={reload} />
      routers, hub,...
    </WorkspaceLayout>
  );
}

Component.displayName = 'IndexPage';
