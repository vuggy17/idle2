import { Body, Controller, Post, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';

import { JwtAuthGuard } from '../auth/jwt-auth-guard';
import { AuthUser } from '../common/decorators/user.decorator';
import { SocketService } from './socket.service';

@Controller('ws')
@UseGuards(JwtAuthGuard)
export class SocketController {
  constructor(private service: SocketService) {}

  @Post()
  async handlePusherUserLogin(
    @AuthUser() user: AuthUser,
    @Body('socket_id') socketId: string,
    @Res() res: Response,
  ) {
    try {
      console.log('🚀 ~ RealtimeController ~ user:', user);
      const authResponse = this.service.authenticateUser(socketId, user);
      res.status(200);
      res.send(authResponse);
    } catch (error) {
      console.log('🚀 ~ RealtimeController ~ error:', error);
      throw error;
    }
  }
}
