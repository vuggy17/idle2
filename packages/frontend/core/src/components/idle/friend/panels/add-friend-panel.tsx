import { Button, Flex, Input, Typography } from 'antd';

export default function AddFriendPanel() {
  return (
    <div
      style={{
        paddingInline: 16,
      }}
    >
      <Typography.Title level={5}>ADD FRIEND</Typography.Title>
      <Flex vertical gap={8}>
        <Typography.Text>You can add a friend with their Tag</Typography.Text>
        <Flex gap={8}>
          <Input size="large" autoFocus placeholder="Enter a Username#0000" />
          <Button size="large" type="primary">
            Send Friend Request
          </Button>
        </Flex>
      </Flex>
    </div>
  );
}
