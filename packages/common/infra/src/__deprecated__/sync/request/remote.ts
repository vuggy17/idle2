import type { RealtimeServer } from './server';

export class FriendRequestRemotePeer {
  constructor(private readonly server: RealtimeServer) {}

  async start(signal: AbortSignal) {
    await this.server.waitForConnectingServer(signal);
  }
}
