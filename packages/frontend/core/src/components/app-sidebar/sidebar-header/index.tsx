import { Avatar, Button, Flex, Space, Tooltip, Typography } from 'antd';
import { useSetAtom } from 'jotai';
import { useCallback } from 'react';

import { friendAtom, settingAtom } from '../../../atoms/ui';
import { useCurrentUser } from '../../../hooks/use-session';
import { Setting } from './icon';
import { headerContainerStyle } from './index.css';

export function SidebarHeader() {
  const setOpenSettingModal = useSetAtom(settingAtom);
  const setOpenFriendModal = useSetAtom(friendAtom);
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
            onClick={useCallback(
              () => setOpenFriendModal((store) => ({ ...store, open: true })),
              [setOpenFriendModal],
            )}
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
        {/* <Button shape="circle" size="small" />
        <Button shape="circle" size="small" /> */}
        <Button
          icon={<Setting />}
          shape="circle"
          size="small"
          onClick={useCallback(
            () => setOpenSettingModal((store) => ({ ...store, open: true })),
            [setOpenSettingModal],
          )}
        />
      </Flex>
    </Flex>
  );
}
