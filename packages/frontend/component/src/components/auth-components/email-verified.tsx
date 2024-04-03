import { Button, Space, Spin, Typography } from 'antd';
import { useEffect, useState } from 'react';

export function EmailVerified({
  openApp,
  createAccount,
}: {
  openApp: () => void;
  createAccount: () => Promise<unknown>;
}) {
  const [accountCreated, setAccountCreated] = useState(false);

  useEffect(() => {
    if (!accountCreated) {
      createAccount()
        .then(() => {
          setAccountCreated(true);
        })
        .catch(() => {
          setAccountCreated(false);
        });
    }
  }, []);

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
      {!accountCreated ? (
        <>
          <Typography.Title level={3}>
            Please wait while we verifying your account 🤖
          </Typography.Title>
          <Spin />
        </>
      ) : (
        <>
          <Typography.Title level={3}>You are verified 🎉</Typography.Title>
          <Typography.Text>
            Your account have been created successfully. You can continue to the
            application
          </Typography.Text>
          <Button type="primary" onClick={openApp}>
            Continue
          </Button>
        </>
      )}
    </Space>
  );
}
