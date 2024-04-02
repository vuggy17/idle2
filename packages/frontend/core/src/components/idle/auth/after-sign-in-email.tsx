import { Avatar, Button, Space, Typography } from 'antd';

import logo from '../../../assets/logo.png';
import type { AuthPanelProps } from './panel';
import { subTitle, title, wrapper } from './sign-in.css';

export default function AfterSignInWithEmail({
  email,
  setAuthState,
}: AuthPanelProps) {
  return (
    <div>
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
          <Typography.Text>
            An email with a magic link has been sent to
            <Typography.Link>{` ${email} `}</Typography.Link>. You can click the
            link to create an account automatically.
          </Typography.Text>

          <div
            style={{
              textAlign: 'center',
            }}
          >
            <Button type="text">
              <Typography.Text strong>Resend link</Typography.Text>
            </Button>
          </div>
          <Typography.Text type="secondary" style={{ fontSize: '13px' }}>
            If you haven&apos;t received the email, please check your spam
            folder.
          </Typography.Text>
        </Space>
      </div>
      <Button type="text" onClick={() => setAuthState('signInWithEmail')}>
        Back
      </Button>
    </div>
  );
}
