import { Form, Input, Space } from 'antd';

import logo from '../../../../assets/logo.png';
import { AuthPanelContent } from './components/content';
import { AuthPanelHeader } from './components/header';
import type { AuthPanelProps } from './components/panel';
import * as cls from './style.css';

export function CreatePassword(props: AuthPanelProps) {
  const [form] = Form.useForm();
  return (
    <AuthPanelContent>
      <Space direction="vertical" size="large" className={cls.signInForm}>
        <AuthPanelHeader logo={logo} title="Create password" />
        <Form
          form={form}
          name="dependencies"
          autoComplete="off"
          layout="vertical"
        >
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>

          {/* Field */}
          <Form.Item
            label="Confirm Password"
            name="confirm"
            dependencies={['password']}
            rules={[
              {
                required: true,
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error(
                      'The new password that you entered do not match!',
                    ),
                  );
                },
              }),
            ]}
          >
            <Input />
          </Form.Item>

          {/* Render Props */}
          {/* <Form.Item noStyle dependencies={['password2']}>
          {() => (
            <Typography>
              <p>
                Only Update when <code>password2</code> updated:
              </p>
              <pre>{JSON.stringify(form.getFieldsValue(), null, 2)}</pre>
            </Typography>
          )}
        </Form.Item> */}
        </Form>
      </Space>
    </AuthPanelContent>
  );
}
