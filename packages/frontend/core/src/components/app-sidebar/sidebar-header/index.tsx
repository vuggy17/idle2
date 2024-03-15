import { Avatar, Button, Flex, Space, Typography } from 'antd';

import { headerContainerStyle } from './index.css';

export function SidebarHeader() {
  return (
    <Flex
      align="center"
      justify="space-between"
      className={headerContainerStyle}
    >
      <Space>
        <Avatar
          shape="circle"
          size={46}
          src="https://source.unsplash.com/random"
        />
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
