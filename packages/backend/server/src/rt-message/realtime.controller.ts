import { Body, Controller, Post, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';

import { JwtAuthGuard } from '../auth/jwt-auth-guard';
import { AuthUser } from '../common/decorators/user.decorator';
import { RealtimeMessageService } from './realtime-message.service';

@Controller('ws')
@UseGuards(JwtAuthGuard)
export class RealtimeController {
  constructor(private service: RealtimeMessageService) {}

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
