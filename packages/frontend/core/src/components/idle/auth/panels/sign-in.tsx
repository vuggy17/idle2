import { Button, Space } from 'antd';

import logo from '../../../../assets/logo.png';
import { useSession } from '../../../../hooks/use-session';
import { useAuth } from '../use-auth';
import { AuthPanelContent } from './components/content';
import { AuthPanelHeader } from './components/header';
import type { AuthPanelProps } from './components/panel';

export function SignIn({ onSignedIn }: AuthPanelProps) {
  const { anonymousSignIn } = useAuth();
  const { reload } = useSession();
  const onAnonymousSigningClick = async () => {
    await anonymousSignIn();
    await reload();
    onSignedIn?.();
  };

  return (
    <AuthPanelContent>
      <Space direction="vertical" size="large">
        <AuthPanelHeader logo={logo} title="Sign in" />
        <Button onClick={onAnonymousSigningClick}>Continue as guest</Button>
      </Space>
    </AuthPanelContent>
  );
}
