import { Optional } from '@nestjs/common';
import { IsString } from 'class-validator';

export class UpdateUserInput {
  @Optional()
  @IsString()
  name?: string;

  @Optional()
  @IsString()
  avatarUrl?: string;
}
