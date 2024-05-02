import {
  Button,
  ConfigProvider,
  Divider,
  Layout,
  Modal,
  Space,
  Tabs,
  type TabsProps,
  Typography,
} from 'antd';
import { Content } from 'antd/es/layout/layout';
import { useAtom } from 'jotai';
import { useCallback, useState } from 'react';

import { friendAtom } from '../../../atoms/ui';
import { Group } from './icons';
import AddFriendPanel from './panels/add-friend-panel';
import { contentInnerWrapper } from './style.css';

const items: TabsProps['items'] = [
  {
    label: 'Online',
    key: '1',
    children: 'online friends',
  },
  {
    label: 'All',
    key: '2',
    children: 'All friends',
  },
  {
    label: 'Pending',
    key: '3',
    children: 'Pending friend requests',
  },
  {
    label: 'Blocked',
    key: '4',
    children: 'Blocked users',
  },
];

function FriendModalInner() {
  const [activeTab, setActiveTab] = useState('1');

  const isAddFriendActive = Number(activeTab) > 4;

  return (
    <ConfigProvider
      theme={{
        components: {
          Layout: { bodyBg: 'transparent' },
        },
      }}
    >
      <Layout className={contentInnerWrapper}>
        <Content>
          <Tabs
            activeKey={activeTab}
            onChange={setActiveTab}
            tabBarExtraContent={{
              left: (
                <Space
                  style={{
                    paddingBlock: 12,
                  }}
                >
                  <Group />
                  <Typography.Text strong>Friends</Typography.Text>
                  <Divider type="vertical" />
                </Space>
              ),
              right: (
                <ConfigProvider
                  theme={{
                    token: {
                      colorPrimary: '#218247',
                    },
                  }}
                >
                  <Button
                    type="primary"
                    onClick={useCallback(() => setActiveTab('5'), [])}
                  >
                    Add friend
                  </Button>
                </ConfigProvider>
              ),
            }}
            items={items}
          />
          {isAddFriendActive ? <AddFriendPanel /> : null}
        </Content>
      </Layout>
    </ConfigProvider>
  );
}

export function FriendModal() {
  const [friendStore, setFriendStore] = useAtom(friendAtom);
  return (
    <ConfigProvider
      theme={{
        components: {
          Modal: {
            // colorBgElevated: '#f5f5f5',
            paddingContentHorizontalLG: 0,
          },
          Layout: {
            lightSiderBg: 'transparent',
            headerHeight: 'auto' as any,
            headerBg: 'transparent',
            headerPadding: '0px 0px',
            paddingContentHorizontalLG: '0 20px' as any,
          },
          Menu: {
            itemBg: 'transparent',
            itemHeight: 32,
          },
        },
      }}
    >
      <Modal
        closeIcon={false}
        getContainer={document.getElementById('root')!}
        open={friendStore.open}
        width={560}
        centered
        footer={null}
        onCancel={useCallback(
          () => setFriendStore((prev) => ({ ...prev, open: false })),
          [setFriendStore],
        )}
      >
        <FriendModalInner />
      </Modal>
    </ConfigProvider>
  );
}
