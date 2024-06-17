import { List } from '@idle/component';
import { fetcher } from '@idle/http';
import {
  Avatar,
  Button,
  ConfigProvider,
  Flex,
  Input,
  Space,
  Tooltip,
  Typography,
} from 'antd';
import { useCallback } from 'react';

import { Check, XMark } from '../icons';
import { FriendPanelLayout } from '../panel-layout';
import { useFriendRequests } from '../use-friend';
import * as cls from './style.css';

function SearchFriendRequestInput({
  onSearch,
}: {
  onSearch: (val: string) => void;
}) {
  return (
    <Input
      placeholder="Search"
      onPressEnter={(e) => {
        onSearch((e.target as any).value);
      }}
      suffix={
        <Button
          onClick={(e) => onSearch((e.target as any).value)}
          type="text"
          onMouseUp={(e) => e.stopPropagation()}
          icon="🔍"
        />
      }
      variant="filled"
    />
  );
}

function FriendRequestTitle({
  title,
  username,
  shouldDisplayUsername,
}: {
  shouldDisplayUsername: boolean;
  username: string;
  title: string;
}) {
  return (
    <Space
      size="middle"
      align="baseline"
      style={{
        fontWeight: 'normal',
      }}
    >
      <Typography.Text strong style={{ fontSize: 16 }}>
        {title}
      </Typography.Text>
      {shouldDisplayUsername && <Typography.Text>{username}</Typography.Text>}
    </Space>
  );
}

function RequestButtons({
  showCancelButtonOnly,
  onAccept,
  onDecline,
  onCancel,
}: {
  showCancelButtonOnly: boolean;
  onAccept: () => void;
  onDecline: () => void;
  onCancel: () => void;
}) {
  return (
    <Space>
      {showCancelButtonOnly ? (
        <Tooltip title="Cancel">
          <Button
            shape="circle"
            icon={<XMark size={24} />}
            onClick={onCancel}
          />
        </Tooltip>
      ) : (
        <Space>
          <ConfigProvider
            theme={{
              token: {
                colorPrimary: '#218247',
              },
            }}
          >
            <Tooltip title="Accept">
              <Button
                shape="circle"
                icon={<Check size={24} />}
                onClick={onAccept}
              />
            </Tooltip>
          </ConfigProvider>

          <ConfigProvider
            theme={{
              token: {
                colorPrimary: '#ff4d4f',
              },
            }}
          >
            <Tooltip title="Decline">
              <Button
                danger
                shape="circle"
                icon={<XMark size={24} />}
                onClick={onDecline}
              />
            </Tooltip>
          </ConfigProvider>
        </Space>
      )}
    </Space>
  );
}

function FriendRequestList({
  onRequestAccept,
  onRequestDecline,
  onRequestCancel,
}: {
  onRequestAccept: (reqId: string) => void;
  onRequestDecline: (reqId: string) => void;
  onRequestCancel: (reqId: string) => void;
}) {
  const { data, isLoading } = useFriendRequests();

  return (
    <List
      hoverable
      loading={isLoading}
      className={cls.list}
      itemLayout="horizontal"
      dataSource={data}
      renderItem={(req, index) => (
        <List.Item
          extra={
            <RequestButtons
              showCancelButtonOnly={req.sentByMe}
              onCancel={() => onRequestCancel(req.id)}
              onAccept={() => onRequestAccept(req.id)}
              onDecline={() => onRequestDecline(req.id)}
            />
          }
        >
          <List.Item.Meta
            avatar={
              <Avatar
                src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${index}`}
              />
            }
            title={
              <FriendRequestTitle
                shouldDisplayUsername={req.sentByMe === false}
                title={req.subject.displayName}
                username={req.subject.username}
              />
            }
            description={`${req.sentByMe ? 'Outgoing' : 'Incoming'} Friend Request`}
          />
        </List.Item>
      )}
    />
  );
}

export default function PendingRequestPanel() {
  const {
    total: pendingRequestCount,
    accept,
    cancel,
    decline,
  } = useFriendRequests();

  const onRequestAccept = useCallback(
    async (reqId: string) => {
      await accept(reqId);
    },
    [accept],
  );
  const onRequestDecline = useCallback(
    async (reqId: string) => {
      await decline(reqId);
    },
    [decline],
  );
  const onRequestCancel = useCallback(
    async (reqId: string) => {
      await cancel(reqId);
    },
    [cancel],
  );

  return (
    <FriendPanelLayout>
      <Flex vertical gap={32}>
        <SearchFriendRequestInput onSearch={(val) => val} />
        <Space
          direction="vertical"
          style={{
            minHeight: 0,
            flexGrow: 0,
          }}
        >
          <Typography.Text strong>
            PENDING — {pendingRequestCount}
          </Typography.Text>

          <FriendRequestList
            onRequestCancel={onRequestCancel}
            onRequestAccept={onRequestAccept}
            onRequestDecline={onRequestDecline}
          />
        </Space>
      </Flex>
    </FriendPanelLayout>
  );
}
