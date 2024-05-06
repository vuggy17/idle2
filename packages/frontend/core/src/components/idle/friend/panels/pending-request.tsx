import { List } from '@idle/component';
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
import { useFriendRequests } from '../useFriends';
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

export function RequestButtons({
  showAcceptButton,
  onAccept,
  onDecline,
}: {
  showAcceptButton: boolean;
  onAccept: () => void;
  onDecline: () => void;
}) {
  return (
    <Space>
      {showAcceptButton && (
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
      )}
      <Tooltip title="Decline">
        <Button shape="circle" icon={<XMark size={24} />} onClick={onDecline} />
      </Tooltip>
    </Space>
  );
}

function FriendRequestList({
  onRequestAccept,
  onRequestDecline,
}: {
  onRequestAccept: (reqId: string) => void;
  onRequestDecline: (reqId: string) => void;
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
              showAcceptButton={req.sentByMe === false}
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
  const { reload, total: pendingRequestCount } = useFriendRequests();

  const onRequestAccept = useCallback(
    async (reqId: string) => {
      // send api
      await reload();
    },
    [reload],
  );
  const onRequestDecline = useCallback(
    async (reqId: string) => {
      // send api
      await reload();
    },
    [reload],
  );

  return (
    <FriendPanelLayout>
      <Flex vertical gap={32}>
        <SearchFriendRequestInput onSearch={(val) => val} />
        <Space direction="vertical">
          <Typography.Text strong>
            PENDING — {pendingRequestCount}
          </Typography.Text>

          <FriendRequestList
            onRequestAccept={onRequestAccept}
            onRequestDecline={onRequestDecline}
          />
        </Space>
      </Flex>
    </FriendPanelLayout>
  );
}