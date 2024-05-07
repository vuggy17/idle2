import {
  Button,
  type ButtonProps,
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
import { FriendPanelLayout } from './panel-layout';
import AddFriendPanel from './panels/add-friend-panel';
import PendingRequestPanel from './panels/pending-request';
import { contentInnerWrapper } from './style.css';

const items: TabsProps['items'] = [
  {
    label: 'Online',
    key: '1',
    children: <FriendPanelLayout>Online friends</FriendPanelLayout>,
  },
  {
    label: 'All',
    key: '2',
    children: <FriendPanelLayout>All friends</FriendPanelLayout>,
  },
  {
    label: 'Pending',
    key: '3',
    children: <PendingRequestPanel />,
  },
  {
    label: 'Blocked',
    key: '4',
    children: <FriendPanelLayout>Blocked users</FriendPanelLayout>,
  },
];

function AddFriendButton(props: ButtonProps) {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#218247',
        },
        components: {
          Button: {
            primaryShadow: 'none',
          },
        },
      }}
    >
      <Button type="primary" {...props}>
        Add friend
      </Button>
    </ConfigProvider>
  );
}

function FriendModalInner() {
  const [activeTab, setActiveTab] = useState('5');

  const isAddFriendActive = activeTab === '5';

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
                <AddFriendButton
                  onClick={useCallback(() => setActiveTab('5'), [])}
                >
                  Add friend
                </AddFriendButton>
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
