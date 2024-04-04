import { Button, Space, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';

import { backBtn, container, gif, title, wrapper } from './404.css';

export function Component() {
  const navigate = useNavigate();
  return (
    <div className={wrapper}>
      <Space direction="vertical" className={container}>
        <Typography.Title level={1} className={title}>
          404
        </Typography.Title>
        <div className={gif} />

        <Typography.Title level={3}>
          Look like you&apos;re lost
        </Typography.Title>

        <Typography.Text>
          The page you are looking for not avaible!
        </Typography.Text>

        <Button
          className={backBtn}
          type="primary"
          onClick={() => navigate('/')}
        >
          Open the app
        </Button>
      </Space>
    </div>
  );
}
