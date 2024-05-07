import {
  Col,
  ConfigProvider,
  Form,
  type FormRule,
  Input,
  Modal,
  Row,
  Space,
  Typography,
} from 'antd';
import { useCallback, useEffect, useState } from 'react';

import { AuthPanelContent } from './auth-panel-content';
import { AuthPanelHeader } from './auth-panel-header';

const validatePasswordRules: FormRule[] = [
  { required: true, message: 'Please enter password' },
  { min: 8, max: 32, message: 'Password must be between 8-32 characters' },
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

type ResetPasswordProps = {
  logo: string;
  onCancel: () => void;
  onResetClick: (pass: string) => Promise<void>;
};

export function ResetPassword({
  onCancel,
  onResetClick,
  logo,
}: ResetPasswordProps) {
  const [form] = Form.useForm();
  const [submittable, setSubmittable] = useState<boolean>(false);
  const [submitting, setSubmitting] = useState(false);
  const values = Form.useWatch([], form);

  const onResetPasswordClick = useCallback(async () => {
    setSubmitting(true);
    const { password } = form.getFieldsValue();
    await onResetClick(password);
    setSubmitting(false);
  }, [form, onResetClick]);

  useEffect(() => {
    form
      .validateFields({ validateOnly: true })
      .then(() => setSubmittable(true))
      .catch(() => setSubmittable(false));
  }, [form, values]);

  return (
    <div
      style={{
        background: '#f0f4f9',
        height: '100%',
      }}
    >
      <ConfigProvider
        theme={{
          token: {
            motion: false,
          },
        }}
      >
        <Modal
          open
          centered
          width={1000}
          mask={false}
          closable={false}
          onCancel={onCancel}
          maskClosable={false}
          onOk={onResetPasswordClick}
          okText="Submit"
          cancelButtonProps={{
            type: 'text',
          }}
          okButtonProps={{
            disabled: !submittable,
            loading: submitting,
          }}
          getContainer={() => document.getElementById('root')}
        >
          <AuthPanelContent>
            <Row wrap={false}>
              <Col span={11}>
                <Space direction="vertical" size="large">
                  <AuthPanelHeader logo={logo} title="Reset your password" />
                  <Typography.Text>
                    Please set a password of 8-32 characters with both letters
                    and numbers to use as your new password
                  </Typography.Text>
                </Space>
              </Col>
              <Col span={11} push={2}>
                <Form
                  style={{
                    paddingTop: 24,
                  }}
                  form={form}
                  size="large"
                  name="dependencies"
                  autoComplete="off"
                  layout="vertical"
                  requiredMark={false}
                >
                  <Form.Item
                    name="password"
                    hasFeedback
                    validateFirst
                    rules={validatePasswordRules}
                  >
                    <Input.Password autoFocus placeholder="New password" />
                  </Form.Item>

                  <Form.Item
                    hasFeedback
                    name="passwordRepeat"
                    dependencies={['password']}
                    validateFirst
                    rules={validatePasswordRepeatRules}
                  >
                    <Input.Password placeholder="Confirm password" />
                  </Form.Item>
                </Form>
              </Col>
            </Row>
          </AuthPanelContent>
        </Modal>
      </ConfigProvider>
    </div>
  );
}
