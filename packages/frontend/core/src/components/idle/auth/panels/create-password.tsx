import {
  AuthPanelContent,
  AuthPanelHeader,
} from '@idle/component/auth-components';
import type { FormInstance, FormRule } from 'antd';
import { App, Button, Form, Input, Space, Typography } from 'antd';
import { type PropsWithChildren, useEffect, useState } from 'react';

import logo from '../../../../assets/logo.png';
import { useAuthPreference } from '../../../../hooks/use-session';
import { useAuth } from '../use-auth';
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
      type="primary"
      htmlType="submit"
      disabled={!submittable}
      loading={loading}
    >
      {children}
    </Button>
  );
}

const validatePasswordRules: FormRule[] = [
  { required: true, message: 'Please enter password' },
  { min: 8, max: 32 },
  {
    validator(_, value) {
      const passwordNeedAtLeast1CharacterAndNumberRegex =
        /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/gm;

      if (passwordNeedAtLeast1CharacterAndNumberRegex.test(value)) {
        return Promise.resolve();
      }
      return Promise.reject(
        new Error('Should be combination of numbers & alphabets'),
      );
    },
  },
];

const validatePasswordRepeatRules: FormRule[] = [
  ({ getFieldValue }) => ({
    validator(_, value) {
      if (!value || getFieldValue('password') === value) {
        return Promise.resolve();
      }
      return Promise.reject(
        new Error('The new password that you entered do not match!'),
      );
    },
  }),
];

export function CreatePassword({ email, onSignedIn }: AuthPanelProps) {
  const [form] = Form.useForm();
  const { message } = App.useApp();

  const { reload } = useAuthPreference();
  const { createPassword } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleCreatePassword = async ({ password }: { password: string }) => {
    setLoading(true);
    await createPassword(password);
    await reload();
    onSignedIn();
    message.success('Password created');
  };

  return (
    <AuthPanelContent>
      <Space direction="vertical" size="large" className={cls.signInForm}>
        <Space direction="vertical" size="large">
          <AuthPanelHeader logo={logo} title="Set your password" />
          <Typography.Text>
            Please set a password of 8-32 characters with both letters and
            numbers to continue signing up with
            <Typography.Link
              href={`mailto:${email}`}
              target="_blank"
            >{` ${email} `}</Typography.Link>
          </Typography.Text>
        </Space>
        <Form
          disabled={loading}
          onFinish={handleCreatePassword}
          form={form}
          name="dependencies"
          autoComplete="off"
          layout="vertical"
          requiredMark={false}
        >
          <Form.Item
            label="Password"
            name="password"
            hasFeedback
            validateFirst
            rules={validatePasswordRules}
          >
            <Input.Password autoFocus />
          </Form.Item>

          <Form.Item
            hasFeedback
            label="Confirm Password"
            name="passwordRepeat"
            dependencies={['password']}
            validateFirst
            rules={validatePasswordRepeatRules}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item>
            <Space>
              <SubmitButton form={form} loading={loading}>
                Submit
              </SubmitButton>
              <Button htmlType="reset">Reset</Button>
            </Space>
          </Form.Item>
        </Form>
      </Space>
    </AuthPanelContent>
  );
}
