import { createParamDecorator, ExecutionContext } from '@nestjs/common';

import { User } from '../../users/models/user.model';

export const AuthUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) =>
    ctx.switchToHttp().getRequest().user,
);

// eslint-disable-next-line @typescript-eslint/no-redeclare
export type AuthUser = User;
