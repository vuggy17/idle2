import { Avatar, Button, Flex, Space, Tooltip, Typography } from 'antd';
import { useSetAtom } from 'jotai';

import { settingAtom } from '../../../atoms/setting';
import { useCurrentUser } from '../../../hooks/use-session';
import { headerContainerStyle } from './index.css';

export function SidebarHeader() {
  const setOpenSettingModal = useSetAtom(settingAtom);
  const user = useCurrentUser();

  return (
    <Flex
      align="center"
      justify="space-between"
      className={headerContainerStyle}
    >
      <Space>
        <Tooltip
          title="Open account settings"
          mouseEnterDelay={0.5}
          placement="bottomLeft"
        >
          <Avatar
            onClick={() =>
              setOpenSettingModal((store) => ({ ...store, open: true }))
            }
            style={{
              cursor: 'pointer',
            }}
            shape="circle"
            size={46}
            src={user.avatarUrl}
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
