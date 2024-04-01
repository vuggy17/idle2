import { IsNotEmpty, IsString } from 'class-validator';

export class HandshakeInput {
  @IsNotEmpty()
  @IsString()
  token: string;
}
