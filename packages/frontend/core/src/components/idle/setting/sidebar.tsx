import {
  Avatar,
  Flex,
  Layout,
  Menu,
  type MenuProps,
  Space,
  Typography,
} from 'antd';

import { useCurrentUser } from '../../../hooks/use-session';
import { UserCircle } from './icons';
import { sidebarHeader, sidebarHeaderTitle } from './style.css';
import type { ActiveTab } from './types';

type MenuItem = Required<MenuProps>['items'][number];
function getSettingMenu(
  label: React.ReactNode,
  key?: ActiveTab,
  icon?: React.ReactNode,
): MenuItem {
  return {
    key,
    icon,
    label,
  } as MenuItem;
}

const tabs: MenuItem[] = [
  getSettingMenu('My account', 'my-account', <UserCircle />),
];

export default function SettingSidebar({
  activeTab,
}: {
  activeTab: ActiveTab;
}) {
  const user = useCurrentUser();

  return (
    <Layout.Sider theme="light">
      <Flex vertical gap={16}>
        <Layout.Header className={sidebarHeader}>
          <Space direction="vertical">
            <Typography.Text
              className={sidebarHeaderTitle}
              strong
              // className="text-[#807f7a] text-xs tracking-wide"
            >
              Settings
            </Typography.Text>

            <Flex gap={8} align="center">
              <Avatar
                src={user.avatarUrl}
                size="small"
                style={{ flexShrink: 0 }}
              />
              <div
                style={{
                  minWidth: 0,
                }}
              >
                <Typography.Text
                  strong
                  style={{
                    display: 'block',
                    lineHeight: '20px',
                    fontSize: 12,
                  }}
                >
                  {user.displayName}
                </Typography.Text>
                <Typography.Text
                  ellipsis
                  type="secondary"
                  style={{
                    fontSize: 12,
                    lineHeight: '12px',
                    display: 'block',
                  }}
                >
                  {user.username}
                </Typography.Text>
              </div>
            </Flex>
          </Space>
        </Layout.Header>
        <Menu items={tabs} selectedKeys={[activeTab]} />
      </Flex>
    </Layout.Sider>
  );
}
