import { Button, Space, Typography } from 'antd';

export function EmailVerified({ openApp }: { openApp: () => void }) {
  return (
    <Space
      direction="vertical"
      size="large"
      align="center"
      style={{
        width: '100%',
        marginTop: 200,
      }}
    >
      <Typography.Title level={3}>You are verified 🎉</Typography.Title>
      <Typography.Text>
        Your account have been created successfully. You can continue to the
        application
      </Typography.Text>
      <Button type="primary" onClick={openApp}>
        Continue
      </Button>
    </Space>
  );
}
