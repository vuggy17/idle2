import { fetcher } from '@idle/http';
import { Alert, Button, Flex, Form, Input, Space, Typography } from 'antd';
import { AxiosError } from 'axios';
import { useState } from 'react';

import { FriendPanelLayout } from '../panel-layout';

export default function AddFriendPanel() {
  const [form] = Form.useForm<{ uname: string }>();
  const [isSendError, setIsSendError] = useState(false);
  const [prevNameTag, setPrevNameTag] = useState('');
  const [isSending, setIsSending] = useState(false);

  const sendFriendRequest = async (value: any) => {
    const { uname } = value;
    setPrevNameTag(uname);
    setIsSending(true);

    try {
      await fetcher.friend.sendFriendRequest(uname);
      setIsSendError(false);
    } catch (error) {
      if (error instanceof AxiosError) {
        setIsSendError(true);
      }
    }
    setIsSending(false);
  };

  const username = Form.useWatch('uname', form);

  return (
    <FriendPanelLayout>
      <Typography.Title level={5}>ADD FRIEND</Typography.Title>

      <Flex vertical gap={8}>
        <Typography.Text>
          You can add a friend with their username.
        </Typography.Text>
        <Form
          initialValues={{
            uname: '',
          }}
          form={form}
          validateTrigger={['onBlur', 'onChange']}
          onFinish={sendFriendRequest}
          autoComplete="off"
        >
          <Space.Compact style={{ width: '100%' }}>
            <Form.Item
              style={{
                width: '100%',
              }}
              name="uname"
            >
              <Input
                variant="filled"
                autoFocus
                placeholder="Enter your friend uname"
                suffix={
                  <Button
                    disabled={username?.length === 0}
                    type="primary"
                    htmlType="submit"
                    loading={isSending}
                    onMouseUp={(e) => e.stopPropagation()}
                  >
                    Send Friend Request
                  </Button>
                }
              />
            </Form.Item>
          </Space.Compact>
        </Form>

        {!isSending && (
          <div>
            {!isSendError && prevNameTag.length > 0 && (
              <Alert
                message={
                  <Typography.Text>
                    Success! Your friend request to{' '}
                    <Typography.Text strong> {prevNameTag}</Typography.Text> was
                    sent.
                  </Typography.Text>
                }
                type="success"
                showIcon
              />
            )}
            {isSendError && (
              <Alert
                message={
                  <Typography.Text>
                    That didn&apos;t work. Double check that the username is
                    correct.
                  </Typography.Text>
                }
                type="error"
                showIcon
              />
            )}
          </div>
        )}
      </Flex>
    </FriendPanelLayout>
  );
}
