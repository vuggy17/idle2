import { fetcher } from '@idle/http';
import { Alert, Button, Flex, Form, Input, Space, Typography } from 'antd';
import { useState } from 'react';

import { FriendPanelLayout } from '../panel-layout';

export default function AddFriendPanel() {
  const [isSuccess, setIsSuccess] = useState(false);
  const [prevNameTag, setPrevNameTag] = useState('');
  const [isSending, setIsSending] = useState(false);

  const sendFriendRequest = async (value: any) => {
    const { uname } = value;
    setIsSending(true);
    await fetcher.friend.sendFriendRequest(uname);
    setPrevNameTag(uname);
    setIsSending(false);
    setIsSuccess(true);
  };

  return (
    <FriendPanelLayout>
      <Typography.Title level={5}>ADD FRIEND</Typography.Title>

      <Flex vertical gap={8}>
        <Typography.Text>
          You can add a friend with their username.
        </Typography.Text>
        <Form
          validateTrigger={['onBlur', 'onChange']}
          onFinish={sendFriendRequest}
          autoComplete="off"
        >
          <Space.Compact style={{ width: '100%' }}>
            <Form.Item
              style={{
                width: '100%',
              }}
              validateFirst
              name="uname"
              rules={[{ required: true, message: 'Please fill' }]}
            >
              <Input
                variant="filled"
                autoFocus
                placeholder="Enter your friend uname"
                suffix={
                  <Button
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

        {isSuccess && prevNameTag.length > 0 && (
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
      </Flex>
    </FriendPanelLayout>
  );
}
