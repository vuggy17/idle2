import { Avatar, Flex, List, Typography } from 'antd';

import { roomTitleStyle, wrapper } from './room.css';

type RoomProps = {
  name: string;
  id: string;
};

export function Room({ name, id }: RoomProps) {
  return (
    <List.Item className={wrapper}>
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
