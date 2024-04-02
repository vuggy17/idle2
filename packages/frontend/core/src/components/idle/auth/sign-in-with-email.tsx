import { Avatar, Button, Form, Input, Space, Typography } from 'antd';

import logo from '../../../assets/logo.png';
import { useSession } from '../../../hooks/use-session';
import type { AuthPanelProps } from './panel';
import {
  formButtonGroup,
  formWrapper,
  subTitle,
  title,
  wrapper,
} from './sign-in.css';
import { createAccountGuest } from './sign-in-with-email.css';
import { useAuth } from './use-auth';

export function SignInWithEmail({
  onSignedIn,
  setAuthState,
  setAuthEmail,
}: AuthPanelProps) {
  const { anonymousSignIn, magicUrlSignIn } = useAuth();
  const { reload } = useSession();

  const onAnonymousSigningClick = async () => {
    await anonymousSignIn();
    await reload();
    onSignedIn?.();
  };

  const onLoginWithEmail = async ({ email }: { email: string }) => {
    setAuthEmail(email);
    await magicUrlSignIn(email);
    setAuthState('afterSignInWithEmail');
  };

  return (
    <div>
      <div className={wrapper}>
        <Space direction="vertical" size="large" className={formWrapper}>
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
          <Form
            onFinish={onLoginWithEmail}
            initialValues={{ email: 'nutriboost17z@gmail.com' }}
          >
            <Form.Item<{ email: string }>
              name="email"
              rules={[
                {
                  type: 'email',
                  message: 'Please provide an valid email address',
                },
                {
                  required: true,
                  message: 'Please provide an valid email address',
                },
              ]}
            >
              <Input
                autoFocus
                onChange={(e) => setAuthEmail(e.target.value)}
                placeholder="Enter your email address"
              />
            </Form.Item>
            <Space className={formButtonGroup}>
              <Button htmlType="submit" type="text">
                Create account
              </Button>
              <Button htmlType="submit" type="primary">
                Continue
              </Button>
            </Space>
          </Form>
        </Space>
      </div>
      <Typography.Link
        className={createAccountGuest}
        onClick={onAnonymousSigningClick}
      >
        Try without create an account
      </Typography.Link>
    </div>
  );
}