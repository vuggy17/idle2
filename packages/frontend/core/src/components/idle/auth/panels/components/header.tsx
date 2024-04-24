import { Avatar, Space, Typography } from 'antd';

import * as cls from './panel.css';

export function AuthPanelHeader({
  title,
  logo,
}: {
  title: string;
  logo: string;
}) {
  return (
    <div>
      <Space>
        <Avatar src={logo} size={28} />
        <Typography.Text className={cls.panelSub} strong>
          Idle
        </Typography.Text>
      </Space>
      <Typography.Text className={cls.panelHeader} strong>
        {title}
      </Typography.Text>
    </div>
  );
}
