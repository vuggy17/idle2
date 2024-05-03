import { Avatar, ConfigProvider, Flex, List, Typography } from 'antd';
import { useContext } from 'react';

import { roomTitleStyle, wrapper } from './room.css';

type RoomProps = {
  name: string;
  id: string;
};

export function Room({ name, id }: RoomProps) {
  const { getPrefixCls } = useContext(ConfigProvider.ConfigContext);

  const parentPrefix = getPrefixCls('list');
  const activeItemPrefix = `${parentPrefix}-item--selected`;

  const isActive = id === '2';
  return (
    <List.Item className={`${wrapper} ${isActive ? activeItemPrefix : ''}`}>
      <Flex gap={16}>
        <Avatar size={46} src="https://source.unsplash.com/random" />
        <div>
          <Typography.Text className={roomTitleStyle} strong>
            Room {name}
          </Typography.Text>
          <Typography.Text type="secondary">
            Room {name} {id}
          </Typography.Text>
        </div>
      </Flex>
    </List.Item>
  );
}
