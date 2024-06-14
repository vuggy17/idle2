import { ApplicationStarted, EventObserver, OnEvent } from '@idle/infra';
import { injectable } from 'inversify';
import { Manager, Socket } from 'socket.io-client';

function getSocketBaseUrl(): string {
  const { protocol, hostname, port } = window.location;
  return `${protocol}//${hostname}${port ? `:${port}` : ''}`;
}

@OnEvent(ApplicationStarted, (e) => e.reconnect)
@injectable()
export class SocketService extends EventObserver {
  ioManager = new Manager(`${getSocketBaseUrl()}/`, {
    autoConnect: false,
    secure: window.location.protocol === 'https:',
  });

  sockets: Set<Socket> = new Set();

  newSocket(): Socket {
    const socket = this.ioManager.socket('/');
    this.sockets.add(socket);

    return socket;
  }

  reconnect(): void {
    console.log('first');
    for (const socket of this.sockets) {
      socket.disconnect();
    }
    for (const socket of this.sockets) {
      socket.connect();
    }
  }
}
