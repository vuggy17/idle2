import { Avatar, Button, Space, Typography } from 'antd';

import logo from '../../../assets/logo.png';
import { useSession } from '../../../hooks/use-session';
import type { AuthPanelProps } from './panel';
import { subTitle, title, wrapper } from './sign-in.css';
import { useAuth } from './use-auth';

export function SignIn({ onSignedIn }: AuthPanelProps) {
  const { anonymousSignIn } = useAuth();
  const { reload } = useSession();
  const onAnonymousSigningClick = async () => {
    await anonymousSignIn();
    await reload();
    onSignedIn?.();
  };

  return (
    <div className={wrapper}>
      <Space direction="vertical" size="large">
        <div>
          <Space>
            <Avatar src={logo} size={28} />
            <Typography.Text className={subTitle} strong>
              Sign in
            </Typography.Text>
          </Space>
          <Typography.Text className={title} strong>
            Idle chat
          </Typography.Text>
        </div>
        <Button onClick={onAnonymousSigningClick}>Continue as guest</Button>
      </Space>
    </div>
  );
}
