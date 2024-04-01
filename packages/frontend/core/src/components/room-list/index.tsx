import { List } from 'antd';

import { Room } from './room';

const rooms = Array.from({ length: 6 }, (_, index) => ({
  id: `${index}`,
  name: `${index}`,
}));

export function RoomList() {
  return (
    <List
      split={false}
      dataSource={rooms}
      renderItem={(room) => (
        <Room key={room.id} id={room.id} name={room.name} />
      )}
    />
  );
}
