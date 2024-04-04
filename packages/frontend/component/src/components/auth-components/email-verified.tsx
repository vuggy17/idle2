import { Button, Space, Spin, Typography } from 'antd';

function EmailVerifiedLoading() {
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
      <Typography.Title level={3}>
        Please wait while we verifying your account 🤖
      </Typography.Title>
      <Spin />
    </Space>
  );
}

function EmailVerifiedError({ openApp }: { openApp: () => void }) {
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
      <Typography.Title level={3}>
        There was a problem verifying your account 😬
      </Typography.Title>
      <Typography.Text>
        We can&apos;t verify your account at this moment, try again later
      </Typography.Text>
      <Button type="primary" onClick={openApp}>
        Back to app
      </Button>
    </Space>
  );
}
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

EmailVerified.Loader = EmailVerifiedLoading;
EmailVerified.Fallback = EmailVerifiedError;
