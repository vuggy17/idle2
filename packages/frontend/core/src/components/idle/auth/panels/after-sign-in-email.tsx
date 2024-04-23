import { Button, Space, Statistic, Typography } from 'antd';
import { useCallback, useState } from 'react';

import logo from '../../../../assets/logo.png';
import { useAuth } from '../use-auth';
import { AuthPanelContent } from './components/content';
import { AuthPanelHeader } from './components/header';
import { type AuthPanelProps } from './components/panel';

const RESEND_EMAIL_COUNTDOWN = 60;

function Countdown({
  timeLeft,
  onFinish,
}: {
  onFinish: () => void;
  timeLeft: number;
}) {
  return (
    <Statistic.Countdown
      format="mm:ss"
      value={Date.now() + timeLeft * 1000}
      onFinish={onFinish}
    />
  );
}

export default function AfterSignInWithEmail({
  email,
  setAuthState,
}: AuthPanelProps) {
  const [countTimeout, setCountTimeout] = useState(false);
  const { magicUrlSignIn } = useAuth();

  const onCountdownFinish = () => {
    setCountTimeout(true);
  };

  const onResendClick = useCallback(async () => {
    setCountTimeout(false);
    magicUrlSignIn(email);
  }, [email, magicUrlSignIn]);

  return (
    <>
      <AuthPanelContent>
        <Space direction="vertical" size="large">
          <AuthPanelHeader logo={logo} title="Sign into account" />
          <Typography.Text>
            An email with a magic link has been sent to
            <Typography.Link
              href={`mailto:${email}`}
              target="_blank"
            >{` ${email} `}</Typography.Link>
            . You can click the link to create an account automatically.
          </Typography.Text>

          <div
            style={{
              textAlign: 'center',
            }}
          >
            {countTimeout ? (
              <Button type="text">
                <Typography.Text strong onClick={onResendClick}>
                  Resend link
                </Typography.Text>
              </Button>
            ) : (
              <Countdown
                timeLeft={RESEND_EMAIL_COUNTDOWN}
                onFinish={onCountdownFinish}
              />
            )}
          </div>
          <Typography.Text
            type="secondary"
            style={{
              fontSize: '13px',
            }}
          >
            If you haven&apos;t received the email, please check your spam
            folder.
          </Typography.Text>
        </Space>
      </AuthPanelContent>
      <Button type="text" onClick={() => setAuthState('signInWithEmail')}>
        Back
      </Button>
    </>
  );
}
