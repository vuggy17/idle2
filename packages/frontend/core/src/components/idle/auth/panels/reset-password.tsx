import {
  AuthPanelContent,
  AuthPanelHeader,
} from '@idle/component/auth-components';
import { App, Button, Form, Input, Space, Typography } from 'antd';
import { type PropsWithChildren, useState } from 'react';

import logo from '../../../../assets/logo.png';
import { useAuth } from '../use-auth';
import type { AuthPanelProps } from './components/panel';
import * as cls from './style.css';

interface SubmitButtonProps {
  resetLinkSent: boolean;
  sending: boolean;
}
function SendResetLinkButton({
  resetLinkSent,
  sending,
}: PropsWithChildren<SubmitButtonProps>) {
  return (
    <Button
      block
      type="primary"
      htmlType="submit"
      size="large"
      loading={sending}
    >
      {resetLinkSent ? 'Sent' : 'Send reset link'}
    </Button>
  );
}

export function ResetPassword({ email, onSignedIn }: AuthPanelProps) {
  const [form] = Form.useForm();
  const { notification } = App.useApp();
  const { sendResetPasswordEmail } = useAuth();
  const [isResetLinkSent, setIsResetLinkSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleCreatePassword = async () => {
    setLoading(true);
    try {
      await sendResetPasswordEmail(email);
      setIsResetLinkSent(true);
    } catch (error) {
      notification.error({
        message: 'Service unavailable at the moment',
        description:
          error instanceof Error
            ? error.message
            : 'We cannot send reset link at the moment, please try again after couple of minutes',
      });
    }
    setLoading(false);
  };

  return (
    <>
      <Form
        initialValues={{
          email,
        }}
        onFinish={handleCreatePassword}
        form={form}
        autoComplete="off"
        layout="vertical"
        requiredMark={false}
        disabled={isResetLinkSent}
      >
        <AuthPanelContent>
          <Space direction="vertical" size="large" className={cls.signInForm}>
            <Space direction="vertical" size="large">
              <AuthPanelHeader logo={logo} title="Reset your password" />
              <Typography.Text>
                You will receive an email with a link to reset your password.
                Please check your inbox.
              </Typography.Text>
            </Space>

            <Form.Item label="Email" name="email">
              <Input autoFocus disabled />
            </Form.Item>
          </Space>
        </AuthPanelContent>
        <Form.Item>
          <SendResetLinkButton
            resetLinkSent={isResetLinkSent}
            sending={loading}
          />
        </Form.Item>
      </Form>
      <Button type="text" onClick={() => onSignedIn()}>
        Back
      </Button>
    </>
  );
}
