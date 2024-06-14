const TOKENS = {
  FriendRequestDataSource: Symbol.for('FriendRequestDataSource'),
  FriendRequestStore: Symbol.for('FriendRequestStore'),
  Container: Symbol.for('Container'),
  LifecycleService: Symbol.for('LifecycleService'),
  EventBus: Symbol.for('EventBus'),
  SocketService: Symbol.for('SocketService'),
};

const NAMES = {
  FriendRequestDataSource: Symbol.for('FriendRequestDataSource'),
};

export const DI = {
  TOKENS,
  NAMES,
};
