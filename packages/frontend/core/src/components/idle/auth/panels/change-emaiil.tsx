import {
  AuthPanelContent,
  AuthPanelHeader,
} from '@idle/component/auth-components';
import { App, Button, Form, Input, Space, Typography } from 'antd';
import { AppwriteException } from 'appwrite';
import { type PropsWithChildren, useState } from 'react';

import logo from '../../../../assets/logo.png';
import { useAuth } from '../use-auth';
import type { AuthPanelProps } from './components/panel';
import * as cls from './style.css';

interface SubmitButtonProps {
  resetLinkSent: boolean;
  sending: boolean;
}
function SendVerificationLinkButton({
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
      {resetLinkSent ? 'Sent' : 'Send verification link'}
    </Button>
  );
}

export function ChangeEmail({ email }: AuthPanelProps) {
  const [form] = Form.useForm();
  const { notification } = App.useApp();
  const { sendEmailVerificationEmail, changeEmail } = useAuth();
  const [isVerifyEmailSent, setIsVerifyEmailSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChangeEmail = async (formValues: {
    email: string;
    password: string;
  }) => {
    if (email === formValues.email.trim()) {
      form.setFields([
        {
          name: 'email',
          errors: [`You can't use current email`],
        },
      ]);
      return;
    }

    setLoading(true);
    try {
      await changeEmail(formValues.email, formValues.password);
      await sendEmailVerificationEmail();
      setIsVerifyEmailSent(true);
    } catch (error) {
      if (
        error instanceof AppwriteException &&
        error.type === 'user_invalid_credentials'
      ) {
        form.setFields([
          {
            name: 'password',
            errors: ['Incorrect password'],
          },
        ]);
      } else {
        notification.error({
          message: 'Service unavailable',
          description:
            error instanceof Error
              ? error.message
              : 'We cannot send verify email at the moment, you will automatically get verified on the next login',
        });
      }
    }
    setLoading(false);
  };

  return (
    <AuthPanelContent>
      <Space direction="vertical" size="large" className={cls.signInForm}>
        <Space direction="vertical" size="large">
          <AuthPanelHeader logo={logo} title="Change your email" />
          <Typography.Text>
            Your current email is <strong>{email}</strong>.
            <br />
            Please enter a new email and we will send you a verification link.
          </Typography.Text>
        </Space>
        <Form
          onFinish={handleChangeEmail}
          form={form}
          autoComplete="off"
          layout="vertical"
          requiredMark={false}
          disabled={isVerifyEmailSent}
        >
          <Form.Item name="email" rules={[{ required: true }]}>
            <Input autoFocus placeholder="Enter new email" />
          </Form.Item>
          <Form.Item name="password" rules={[{ required: true }]}>
            <Input.Password placeholder="Enter your password" />
          </Form.Item>
          <SendVerificationLinkButton
            resetLinkSent={isVerifyEmailSent}
            sending={loading}
          />
        </Form>
      </Space>
    </AuthPanelContent>
  );
}
