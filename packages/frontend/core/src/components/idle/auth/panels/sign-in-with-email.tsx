import {
  AuthPanelContent,
  AuthPanelHeader,
} from '@idle/component/auth-components';
import { Button, Form, Input, Space, Typography } from 'antd';
import { useState } from 'react';

import logo from '../../../../assets/logo.png';
import { useCurrentLoginStatus } from '../../../../hooks/use-current-login-status';
import useNavigateHelper from '../../../../hooks/use-navigate-helper';
import { useSession } from '../../../../hooks/use-session';
import { useAuth } from '../use-auth';
import type { AuthPanelProps } from './components/panel';
import * as cls from './style.css';

export function SignInWithEmail({
  onSignedIn,
  setAuthState,
  setAuthEmail,
}: AuthPanelProps) {
  const { anonymousSignIn, sendMagicUrl } = useAuth();
  const loginStatus = useCurrentLoginStatus();
  const { reload, user } = useSession();
  const { jumpToIndex } = useNavigateHelper();
  const [sendingEmail, setSendingEmail] = useState(false);

  const onAnonymousSigningClick = async () => {
    await anonymousSignIn();
    await reload();
    onSignedIn?.();
  };

  const onLoginWithEmail = async ({ email }: { email: string }) => {
    setAuthEmail(email);

    if (loginStatus === 'authenticated' && email === user?.email) {
      onSignedIn?.();
      jumpToIndex();
      return;
    }

    setSendingEmail(true);
    await sendMagicUrl(email);
    setSendingEmail(false);
    setAuthState('afterSignInWithEmail');
  };

  return (
    <>
      <AuthPanelContent>
        <Space direction="vertical" size="large" className={cls.signInForm}>
          <AuthPanelHeader logo={logo} title="Sign in" />
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
            <Space className={cls.signInFormBtnGroup}>
              <Button htmlType="submit" type="text">
                Create account
              </Button>
              <Button htmlType="submit" type="primary" loading={sendingEmail}>
                Continue
              </Button>
            </Space>
          </Form>
        </Space>
      </AuthPanelContent>
      <Typography.Link
        className={cls.createAccountGuest}
        onClick={onAnonymousSigningClick}
      >
        Try without create an account
      </Typography.Link>
    </>
  );
}
