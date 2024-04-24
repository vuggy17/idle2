import type { FormInstance, FormRule } from 'antd';
import { App, Button, Form, Input, Space, Typography } from 'antd';
import { type PropsWithChildren, useEffect, useState } from 'react';

import logo from '../../../../assets/logo.png';
import { useAuthPreference } from '../../../../hooks/use-session';
import { useAuth } from '../use-auth';
import { AuthPanelContent } from './components/content';
import { AuthPanelHeader } from './components/header';
import type { AuthPanelProps } from './components/panel';
import * as cls from './style.css';

interface SubmitButtonProps {
  form: FormInstance;
  loading: boolean;
}
function SubmitButton({
  form,
  loading,
  children,
}: PropsWithChildren<SubmitButtonProps>) {
  const [submittable, setSubmittable] = useState<boolean>(false);

  // Watch all values
  const values = Form.useWatch([], form);

  useEffect(() => {
    form
      .validateFields({ validateOnly: true })
      .then(() => setSubmittable(true))
      .catch(() => setSubmittable(false));
  }, [form, values]);

  return (
    <Button
      block
      type="primary"
      htmlType="submit"
      disabled={!submittable}
      loading={loading}
    >
      {children}
    </Button>
  );
}

export function ResetPassword({ email, onSignedIn }: AuthPanelProps) {
  const [form] = Form.useForm();
  const { message } = App.useApp();

  const { reload } = useAuthPreference();
  const { createPassword } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleCreatePassword = async () => {
    // setLoading(true);
    // await createPassword(password);
    // await reload();
    // onSignedIn();
    // message.success('Password created');
  };

  return (
    <div>
      <AuthPanelContent>
        <Space direction="vertical" size="large" className={cls.signInForm}>
          <Space direction="vertical" size="large">
            <AuthPanelHeader logo={logo} title="Reset your password" />
            <Typography.Text>
              You will receive an email with a link to reset your password.
              Please check your inbox.
            </Typography.Text>
          </Space>
          <Form
            initialValues={{
              email,
            }}
            disabled
            onFinish={handleCreatePassword}
            form={form}
            autoComplete="off"
            layout="vertical"
            requiredMark={false}
          >
            <Form.Item label="Email" name="email">
              <Input autoFocus />
            </Form.Item>
            <Form.Item>
              <Button block type="primary" htmlType="submit">
                Send
              </Button>
            </Form.Item>
          </Form>
        </Space>
      </AuthPanelContent>
      <Button type="text" onClick={() => setAuthState('signInWithEmail')}>
        Back
      </Button>
    </div>
  );
}
