import {
  Avatar,
  Button,
  Dropdown,
  Flex,
  Space,
  Tooltip,
  Typography,
} from 'antd';

import { headerContainerStyle } from './index.css';

export function SidebarHeader() {
  return (
    <Flex
      align="center"
      justify="space-between"
      className={headerContainerStyle}
    >
      <Space>
        <Tooltip title="Open account settings" placement="bottomLeft">
          <Avatar
            style={{
              cursor: 'pointer',
            }}
            shape="circle"
            size={46}
            src="https://source.unsplash.com/random"
          />
        </Tooltip>
        <Typography.Title
          level={4}
          style={{
            margin: 0,
          }}
        >
          Chat
        </Typography.Title>
      </Space>
      <Flex gap={16} align="center">
        <Button shape="circle" size="small" />
        <Button shape="circle" size="small" />
        <Button shape="circle" size="small" />
      </Flex>
    </Flex>
  );
}
